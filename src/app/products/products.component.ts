import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { SidebarComponent } from "../components/sidebar/sidebar.component";

@Component({
  selector: 'app-products',
  imports: [CommonModule, SidebarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: Product[] = [
    {
      id: 1,
      name: 'Prime Hydration - Cherry Freeze',
      type: 'Drink',
      price: 250,
      image: 'assets/prime.jpeg'
    },
    {
      id: 2,
      name: 'Red Bull Energy Drink',
      type: 'Drink',
      price: 200,
      image: 'assets/redbull.jpeg'
    },
    {
      id: 3,
      name: 'Schweppes Tonic Water',
      type: 'Drink',
      price: 100,
      image: 'assets/schweppes.jpeg'
    },
    {
      id: 4,
      name: 'Sprite',
      type: 'Drink',
      price: 80,
      image: 'assets/sprite.jpeg'
    },
    {
      id: 5,
      name: 'Celsius Sunset Vibe',
      type: 'Drink',
      price: 220,
      image: 'assets/sunsetVibe.jpeg'
    },
    {
      id: 6,
      name: 'Gin & Tonic Can',
      type: 'Drink',
      price: 270,
      image: 'assets/tonic.jpeg'
    },
    {
      id: 7,
      name: 'Whiskey Cola Can',
      type: 'Drink',
      price: 300,
      image: 'assets/whiskeyCan.jpeg'
    },
    {
      id: 8,
      name: 'The Singleton 12 Year Old Whisky',
      type: 'Drink',
      price: 5400,
      image: 'assets/singleton.jpeg'
    },
    {
      id: 9,
      name: 'Bavaria Smalt Apple',
      type: 'Drink',
      price: 170,
      image: 'assets/bavariaSmalt.jpeg'
    },
    {
      id: 10,
      name: 'Coca-Cola',
      type: 'Drink',
      price: 80,
      image: 'assets/cocacola.jpeg'
    },
    {
      id: 11,
      name: '58 Gin',
      type: 'Drink',
      price: 4000,
      image: 'assets/gin58.jpeg'
    },
    {
      id: 12,
      name: 'Celsius Peach Vibe',
      type: 'Drink',
      price: 220,
      image: 'assets/peachVibe.jpeg'
    },
    {
      id: 13,
      name: 'Poppi Orange Soda',
      type: 'Drink',
      price: 200,
      image: 'assets/poppi.jpeg'
    }
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
  }
  productTypes: string[] = [];
  filteredProducts: Product[] = [];



ngOnInit() {
  this.filteredProducts = this.products;
  this.productTypes = [...new Set(this.products.map(p => p.type))];
}

applyFilter(filter: { type: string; price: number; name?: string }) {
  this.filteredProducts = this.products.filter(p => {
    const typeMatch = !filter.type || p.type === filter.type;
    const priceMatch = p.price <= filter.price;
    const nameMatch = !filter.name || p.name.toLowerCase().includes(filter.name.toLowerCase());

    return typeMatch && priceMatch && nameMatch;
  });
}


}
