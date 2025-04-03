import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },         // Homepage → Product list
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },         // Cart page
  { path: 'checkout', component: CheckoutComponent }, // Checkout page
  { path: '**', redirectTo: '' }                      // Wildcard fallback
];
