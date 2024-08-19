import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../rooms/Room';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { AuthService } from '../auth.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  room: any = [];
  testimonials = [
    { message: 'Amazing room with a great view!', author: 'John Doe' },
    {
      message: 'The service was excellent, and the room was spotless.',
      author: 'Jane Smith',
    },
    {
      message: 'Highly recommend this room for a comfortable stay.',
      author: 'Robert Brown',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const roomId: number = Number(this.route.snapshot.paramMap.get('number'));
    this.loadRoom(roomId);
  }

  loadRoom(roomId: number): void {
    this.authService.getRooms().subscribe(
      (data) => {
        this.room = data.find(
          (room: { number: number }) => room.number === roomId
        );
        this.room?.facility;
      },
      (err) => console.error(err)
    );
  }

  bookRoom(): void {
    // Logic to book the room
    console.log('Booking the room:', this.room.name);
  }

  addToWishlist(): void {
    // Logic to add the room to wishlist
    if (!this.isGuestRegistered()) {
      this.router.navigate(['/signup']);
    } else {
      
        this.authService.addToWishlist(this.room.id).subscribe(
          (response) => {
            console.log('Room added to wishlist:', this.room.name);
            // Optionally display a success message or update the UI
          },
          (error) => {
            console.error('Error adding room to wishlist', error);
            // Optionally handle the error, e.g., show an error message
          }
        );
      
    }
  }

  goBack(): void {
    this.router.navigate(['/rooms']);
  }

  isGuestRegistered(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
