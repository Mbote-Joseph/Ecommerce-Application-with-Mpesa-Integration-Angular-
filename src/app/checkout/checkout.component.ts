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
    this.isProcessing = true;

    // 🔁 Normalize phone to 2547XXXXXXXX format
    let normalizedPhone = this.phone.trim();

    if (normalizedPhone.startsWith('0') && normalizedPhone.length === 10) {
      normalizedPhone = '254' + normalizedPhone.substring(1);
    }

    // 🚫 Invalid format check
    if (!normalizedPhone.startsWith('2547') || normalizedPhone.length !== 12) {
      alert('Enter a valid Safaricom phone number like 0792622515');
      this.isProcessing = false;
      return;
    }

    const amount = this.getTotal();

    this.paymentService.stkPush(normalizedPhone, amount).subscribe({
      next: (res) => {
        const checkoutRequestID = res.data.CheckoutRequestID;
        this.message = '📲 STK Push sent. Please complete payment on your phone.';
        this.pollPaymentStatus(checkoutRequestID);
      },
      error: () => {
        this.isProcessing = false;
        this.message = '❌ Failed to initiate STK Push.';
      }
    });
  }

  pollPaymentStatus(checkoutRequestID: string): void {
    let attempts = 0;
    const maxAttempts = 24; // 2 minutes
    const interval = setInterval(() => {
      this.paymentService.checkPaymentStatus(checkoutRequestID).subscribe({
        next: (status) => {
          if (status.resultCode === 0) {
            clearInterval(interval);
            this.isProcessing = false;
            this.message = '✅ Payment successful! Generating receipt...';
            setTimeout(() => this.generateReceipt(), 1000);
          } else if (status.resultCode !== undefined && status.resultCode !== null) {
            clearInterval(interval);
            this.isProcessing = false;
            this.message = '❌ Payment failed or was cancelled.';
          }
        },
        error: () => {
          // Waiting silently for response
        }
      });

      if (++attempts >= maxAttempts) {
        clearInterval(interval);
        this.isProcessing = false;
        this.message = '⚠️ Transaction timed out. It should not take more than 2 minutes.';
      }
    }, 5000); // 5 seconds interval
  }

  generateReceipt(): void {
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

    this.cartService.clearCart();
    this.cart = [];
  }
}
