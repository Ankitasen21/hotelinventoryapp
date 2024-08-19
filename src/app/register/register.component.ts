import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  salary: number = 1000;
  role: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) {}

  register(): void {
    if (this.password!==this.confirmPassword) {
      this.dialog.open(ErrorDialogComponent, {
        data: {message: 'Passwords do not match! Please try again.'}
      });
      return;
    }

    if(this.username==='' || this.password==='' || this.role==='' || this.salary===0) {
      this.dialog.open(ErrorDialogComponent, {
        data: { message: 'Please fill in all fields.' }
      });
      return;
    }

    this.authService.register(this.username, this.password, this.confirmPassword, this.role, this.salary).subscribe(
      (res) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(this.username, this.password);
        console.error(err);
      }
    );
  }
  togglePasswordVisibility(): void {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const togglePassword = document.getElementById('togglePassword') as HTMLElement;
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      togglePassword.classList.remove('bi-eye-fill');
      togglePassword.classList.add('bi-eye-slash-fill');
    } else {
      passwordField.type = 'password';
      togglePassword.classList.remove('bi-eye-slash-fill');
      togglePassword.classList.add('bi-eye-fill');
    }
  }
}
