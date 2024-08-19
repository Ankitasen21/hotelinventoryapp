import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})


export class SearchComponent implements OnInit{

  searchValue: string = '';

  constructor () {}
  ngOnInit(): void {}

  @Output()
  searchValueChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchValueEntered(){
    this.searchValueChanged.emit(this.searchValue);
  }

}
