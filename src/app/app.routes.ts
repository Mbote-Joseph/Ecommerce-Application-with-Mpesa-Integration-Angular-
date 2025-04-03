import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },         // Homepage → Product list
  { path: 'cart', component: CartComponent },         // Cart page
  { path: 'checkout', component: CheckoutComponent }, // Checkout page
  { path: '**', redirectTo: '' }                      // Wildcard fallback
];
