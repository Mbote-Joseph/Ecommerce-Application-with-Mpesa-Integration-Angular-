import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Product[] = [];

  getItems() {
    return this.cart;
  }

  addToCart(product: Product) {
    this.cart.push(product);
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
  }

  clearCart() {
    this.cart = [];
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  constructor() { }
}
