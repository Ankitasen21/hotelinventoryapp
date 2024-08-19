import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  users: any[] = [];
  user: any;
  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) {}
  
  ngOnInit(): void{
    this.loadUsers();
  }

  loadUsers(): void{
    this.authService.getUsers().subscribe(
      (data) => {
        this.users = data;
      }, (error) => {console.error('error fetching users', error);}
    );
  }

  deleteUser(id: number): void {
    this.authService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== id);
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }
  editUser(id: number, username: string, role: string, salary: number): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      height: '400px',
      width: '500px',
      data: { username, role, salary}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.editUser(id, result.username, result.role, result.salary).subscribe(
          () => {
            this.loadUsers(); // Reload users after edit
          },
          (error) => {
            console.error('Error updating user', error);
          }
        );
      }
    });
  }

  addUser(): void {
    this.router.navigate(['/register']);
  }

  changeStatus(userId: number, currentStatus: string): void {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
  
    // Find the user in the local array
    const user = this.users.find(u => u.id === userId);
    if (user) {
      // Update status locally
      user.Status = newStatus;
      this.authService.updateUserStatus(userId, newStatus).subscribe(
        () => {
            console.log(`User ${userId} status updated to ${newStatus}`);
            this.loadUsers();
        }, 
        (err) => {
          user.Status = currentStatus;
          console.error('Error updating status: ', err);
        }
      );
    } else {
      console.error('User not found');
    }
  }
  
}
