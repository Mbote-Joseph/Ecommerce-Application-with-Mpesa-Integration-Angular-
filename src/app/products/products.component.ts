import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { RouterLink } from '@angular/router';
import { PRODUCTS } from '../data/products';

@Component({
  selector: 'app-products',
  imports: [CommonModule, SidebarComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: Product[] = [

  ];

  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
  }
  productTypes: string[] = [];
  filteredProducts: Product[] = PRODUCTS;



  ngOnInit() {
    this.products = PRODUCTS;
    this.filteredProducts = PRODUCTS;
    this.productTypes = [...new Set(PRODUCTS.map(p => p.type))];
  }

applyFilter(filter: { type: string; price: number; name?: string }) {
  this.currentPage = 1;  // after applying new filters it should take the user to the first page
  this.filteredProducts = this.products.filter(p => {
    const typeMatch = !filter.type || p.type === filter.type;
    const priceMatch = p.price <= filter.price;
    const nameMatch = !filter.name || p.name.toLowerCase().includes(filter.name.toLowerCase());

    return typeMatch && priceMatch && nameMatch;
  });
}

currentPage = 1;
pageSize = 8;

get paginatedFilteredProducts() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
}

get totalPages(): number {
  return Math.ceil(this.filteredProducts.length / this.pageSize);
}

changePage(page: number): void {
  this.currentPage = page;
}


}
