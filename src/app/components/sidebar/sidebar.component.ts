import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  selectedType: string = '';
  maxPrice: number = 1000;

  @Output() filterChange = new EventEmitter<{ type: string; price: number }>();

  emitFilter() {
    this.filterChange.emit({ type: this.selectedType, price: this.maxPrice });
  }

  resetFilters() {
    this.selectedType = '';
    this.maxPrice = 1000;
    this.emitFilter();
  }
}
