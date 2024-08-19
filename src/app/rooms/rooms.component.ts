import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { FilterComponent } from '../filter/filter.component';
import { Room } from './Room';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'], // Fix 'styleUrl' to 'styleUrls'
  imports: [CommonModule, FilterComponent, SearchComponent, RouterOutlet, RouterLink, RouterLinkActive],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  numberOfRooms: number = 0;
  selectedRoomOnFilterChange: string = 'All';
  radioButtonSelected: string = 'All';
  priceRangeSelected: number[] = [0, 500];
  searchValue: string = '';
  selectedRoom: Room | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchRooms();
  }

  fetchRooms(): void {
    this.authService.getRooms().subscribe(
      (data: Room[]) => {
        this.rooms = data;
        this.numberOfRooms = this.rooms.length;
        this.selectedRoom = this.rooms[0] || null;
        console.log(this.rooms);
      }, (error: any) => {
        console.error('Unable to fetch: ', error);
      }
    );
  }

  getAllRooms(): number {
    return this.rooms.length;
  }

  getSingleRooms(): number {
    return this.rooms.filter((room) => room.type === 'Single').length;
  }

  getDeluxeRooms(): number {
    return this.rooms.filter((room) => room.type === 'Deluxe').length;
  }

  getSuiteRooms(): number {
    return this.rooms.filter((room) => room.type === 'Suite').length;
  }

  getAvailableRooms(): number {
    return this.rooms.filter((room) => room.available).length;
  }

  onFilterRoomSelectionChanged(data: string): void {
    this.selectedRoomOnFilterChange = data;
    //console.log(this.selectedRoomOnFilterChange);
  }

  onRadioButtonSelectionChanged(data: string): void {
    this.radioButtonSelected = data;
  }

  onPriceRangeSelectionChanged(data: number[]): void {
    this.priceRangeSelected = data;
    console.log(this.priceRangeSelected);
  }

  onSearchValueChanged(data: string): void {
    this.searchValue = data;
    console.log(this.searchValue);
  }
}
