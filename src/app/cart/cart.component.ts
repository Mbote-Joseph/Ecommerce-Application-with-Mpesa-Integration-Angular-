import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

import { FormsModule } from '@angular/forms';
import { CartItem } from '../models/cart-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  phone: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  addToCart(item: CartItem) {
    this.cartService.addToCart(item);
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cart = this.cartService.getCart();
  }

  confirmRemove(index: number) {
    const confirmDelete = confirm(`Are you sure you want to remove ${this.cart[index].name} from the cart?`);
    if (confirmDelete) {
      this.removeItem(index);
    }
  }

  confirmClearCart() {
    const confirmClear = confirm('Are you sure you want to clear your entire cart?');
    if (confirmClear) {
      this.clearCart();
    }
  }

  clearCart() {
    this.cartService.clearCart();
    this.cart = [];
  }

  increaseQuantity(index: number) {
    this.cart[index].quantity++;
  }

  decreaseQuantity(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
    }
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  pay(): void {
    if (this.cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    this.router.navigate(['/checkout']);
  }


}
