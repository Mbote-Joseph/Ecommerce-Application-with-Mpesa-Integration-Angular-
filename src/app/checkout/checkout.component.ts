import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';
import { PaymentService } from '../services/payment.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cart: CartItem[] = [];
  phone: string = '';
  isProcessing: boolean = false;
  message: string = '';

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService
  ) {
    this.cart = this.cartService.getCart();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  payWithMpesa(): void {
    this.message = '';
    if (!this.phone.startsWith('2547') || this.phone.length !== 12) {
      alert('Enter a valid Safaricom phone number (format: 2547XXXXXXX)');
      return;
    }

    const totalAmount = this.getTotal();
    if (totalAmount <= 0) {
      alert('Cart is empty.');
      return;
    }

    this.isProcessing = true;

    this.paymentService.stkPush(this.phone, totalAmount).subscribe({
      next: (response) => {
        console.log('STK Push Response:', response);
        this.message = '✅ STK Push sent! Check your phone.';
        this.downloadReceipt();
        this.cartService.clearCart();
        this.cart = [];
      },
      error: (err) => {
        console.error('STK Push Error:', err);
        this.message = '❌ Payment failed: ' + (err.error?.message || 'Unknown error');
      }
    });
  }

  downloadReceipt(): void {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Receipt - Food Order', 14, 22);
    doc.setFontSize(12);
    doc.text(`Phone: ${this.phone}`, 14, 30);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 37);

    const data = this.cart.map((item, i) => [
      i + 1,
      item.name,
      item.quantity,
      item.price,
      item.price * item.quantity
    ]);

    autoTable(doc, {
      startY: 45,
      head: [['#', 'Product', 'Qty', 'Price', 'Total']],
      body: data,
    });

    const finalY = (doc as any).lastAutoTable?.finalY || 70;
    doc.text(`Grand Total: Ksh ${this.getTotal()}`, 14, finalY + 10);
    doc.save('receipt.pdf');
  }
  }
