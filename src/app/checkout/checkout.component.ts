import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cart: Product[] = [];
  phone: string = '';
  isProcessing: boolean = false;
  message: string = '';

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService
  ) {
    this.cart = this.cartService.getItems();
  }

  getTotal(): number {
    return this.cartService.getTotal();
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
      next: () => {
        this.isProcessing = false;
        this.message = '✅ STK Push sent! Check your phone.';
        this.cartService.clearCart();
        this.cart = [];
      },
      error: (err) => {
        this.isProcessing = false;
        this.message = '❌ Payment failed: ' + (err.error?.message || 'Unknown error');
      }
    });
  }
}
