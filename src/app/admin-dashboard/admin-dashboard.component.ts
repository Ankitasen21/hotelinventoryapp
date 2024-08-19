import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Rooms } from '../rooms/Rooms';
import { RevenueChartComponent } from '../revenue-chart/revenue-chart.component';
import { BookingChartComponent } from '../booking-chart/booking-chart.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, BookingChartComponent, RevenueChartComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent {
  title: string = "Admin Dashboard";
  users: any[] = [];

  statistics = [
    { label: 'Total Bookings', value: 120 },
    { label: 'Available Rooms', value: Rooms.length },
    { label: 'Revenue', value: '₹65.5L' },
  ];

  constructor(private authService: AuthService, private router: Router){}
  
}
