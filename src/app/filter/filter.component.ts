import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  minPrice: number = 0;
  maxPrice: number = 500;
  selectedRoom: string = 'All';
  availableRoom: string = 'All';
  result: number = 0;

  @Input() available: number = 0;
  @Input() single: number = 0;
  @Input() deluxe: number = 0;
  @Input() suite: number = 0;
  @Input() all: number = 0;

 
  constructor() {
    this.result = this.all + this.single + this.deluxe + this.suite;
  }

  ngOnInit(): void {}
  
  @Output()
  filterOptionChanged: EventEmitter<string> = new EventEmitter<string>(); //custom event
  
  onFilterOptionChange() {
    this.filterOptionChanged.emit(this.selectedRoom);
    //console.log(this.selectedRoom);
  }

  @Output()
  radioButtonChanged: EventEmitter<string> = new EventEmitter<string>(); //custom event
  onRadioButtonChange(){
    this.radioButtonChanged.emit(this.availableRoom);
  }
  
  @Output()
  priceRangeChanged: EventEmitter<number[]> = new EventEmitter<number[]>(); //custom event
  onPriceRangeChange(){
    this.priceRangeChanged.emit([this.minPrice, this.maxPrice]);
  }
  
}
