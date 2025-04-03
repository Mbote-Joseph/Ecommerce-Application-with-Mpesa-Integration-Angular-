import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() types: string[] = ['Drink', 'Meal' , 'Snack' , 'Dessert' , 'Coffee'];
  @Output() filterChange = new EventEmitter<{ type: string; price: number; name?: string }>();


  selectedType: string = '';
  maxPrice: number = 10000;
  searchName: string = '';

  emitFilter() {
    this.filterChange.emit({
      type: this.selectedType,
      price: this.maxPrice,
      name: this.searchName
    });
  }

  resetFilter() {
    this.selectedType = '';
    this.maxPrice = 10000;
    this.searchName = '';
    this.emitFilter();
  }
}
