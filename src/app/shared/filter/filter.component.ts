import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-filter',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<string>();

  categories = [
    {
      value: 'home',
      viewValue: 'Casa',
    },
    {
      value: 'work',
      viewValue: 'Trabalho',
    },
    {
      value: 'study',
      viewValue: 'Estudo',
    },
    {
      value: 'personal',
      viewValue: 'Pessoal',
    },
    {
      value: 'other',
      viewValue: 'Outros',
    },
  ];

  onFilterChange(category: string) {
    this.filterChange.emit(category);
  }
}
