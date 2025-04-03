import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { PaymentService } from '../services/payment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Product[] = [];
  phone: string = '';

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService
  ) {
    this.cart = this.cartService.getItems();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cart = [];
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  pay() {
    if (!this.phone.startsWith('2547')) {
      alert("Please enter a valid phone number starting with 2547");
      return;
    }

    const amount = this.getTotal();
    this.paymentService.stkPush(this.phone, amount).subscribe({
      next: () => alert('STK Push sent! 📲'),
      error: (err) => alert('Payment failed: ' + err.error.message),
    });
  }
}
