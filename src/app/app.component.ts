import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { RoomComponent } from './room/room.component';
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    RoomsComponent,
    NavbarComponent,
    FooterComponent,
    RoomComponent,
    SearchComponent,
    FilterComponent,
    LoginComponent,
],
})
export class AppComponent {
  title = 'hotel inventory app';
}
