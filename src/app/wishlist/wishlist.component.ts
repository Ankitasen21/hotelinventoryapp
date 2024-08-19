import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  room_id: string | null = '';
  wishlist: any[] = [];

  constructor(
    private router: Router, 
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.room_id = (this.route.snapshot.paramMap.get('number'));
      this.loadWishlist();
  }

  loadWishlist(): void{
    this.authService.getWishlist().subscribe(
      (data) => {
        this.wishlist = data;
      },
      (err) => {
        console.error('Error loading wishlist',err);
      }
    )
  }

  
}
