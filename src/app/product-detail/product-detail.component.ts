import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../data/products';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  relatedImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  // ngOnInit(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   const found = PRODUCTS.find(p => p.id === id);

  //   if (found) {
  //     this.product = found;

  //     // Simulate additional images
  //     this.relatedImages = [
  //       found.image,
  //       found.image.replace('.jpeg', '-2.jpeg'),
  //       found.image.replace('.jpeg', '-3.jpeg'),
  //       found.image.replace('.webp', '-2.webp'),
  //       found.image.replace('.webp', '-3.webp')
  //     ];
  //   }
  // }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
  }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = PRODUCTS.find(p => p.id === id);

    if (found) {
      this.product = found;

      const isJpeg = found.image.endsWith('.jpeg');
      const isWebp = found.image.endsWith('.webp');

      if (isJpeg) {
        this.relatedImages = [
          found.image,
          found.image.replace('.webp', '-2.webp'),
          found.image.replace('.webp', '-3.webp')

        ];
      } else if (isWebp) {
        this.relatedImages = [
          found.image,

          found.image.replace('.jpeg', '-2.jpeg'),
          found.image.replace('.jpeg', '-3.jpeg')
        ];
      } else {
        this.relatedImages = [found.image]; // fallback
      }
    }
  }

}
