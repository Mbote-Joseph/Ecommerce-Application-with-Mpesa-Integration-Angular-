import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  constructor() { }

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: Product): void {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      const newItem: CartItem = { ...product, quantity: 1 };
      this.cart.push(newItem);
    }
  }

  removeItem(index: number): void {
    this.cart.splice(index, 1);
  }

  clearCart(): void {
    this.cart = [];
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }


}
