import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-guest-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './guest-registration.component.html',
  styleUrls: ['./guest-registration.component.css']
})
export class GuestRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  registrationError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern('^[0-9]{10,15}$')]], // Adjust pattern as needed
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  register(): void {
    if (this.registrationForm.valid) {
      const { firstName, lastName, email, phoneNumber, password } = this.registrationForm.value;

      this.authService.signup(firstName, lastName, email, phoneNumber, password).subscribe(
        (response) => {
          this.router.navigate([`/wishlist/${response.id}`]); 
        },
        (error) => {
          // Handle registration error
          this.registrationError = error.message;
        }
      );
    }
  }
}
