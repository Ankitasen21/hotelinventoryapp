import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './room/room.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { GuestRegistrationComponent } from './guest-registration/guest-registration.component';

export const routes: Routes = [
    { path: 'admin/dashboard', component: AdminDashboardComponent , canActivate: [AuthGuard]},
    { path: 'users/:username', component: EmployeeProfileComponent},
    { path: 'admin', redirectTo: '/login', pathMatch: 'full' },
    { path: 'manage-users', component: UserManagementComponent, canActivate: [AuthGuard]},
    { path: 'rooms', component: RoomsComponent },
    { path: 'rooms/:number', component: RoomComponent },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'wishlist/:guestId', component: WishlistComponent},
    { path: 'signup', component: GuestRegistrationComponent}
];
