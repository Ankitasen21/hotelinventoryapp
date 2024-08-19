import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  user: any;
  users: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (res) => {
        this.authService.handleLogin(res);
      },
      (err) => {
        alert(err.error.message);
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
