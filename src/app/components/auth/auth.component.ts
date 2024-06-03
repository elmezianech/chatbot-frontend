import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {
  signUpForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      console.log('Signup Form Data:', this.signUpForm.value);
      this.authService.signUp(this.signUpForm.value).subscribe(
        response => {
          console.log('Sign Up Successful:', response);
          // Handle successful signup logic here
        },
        error => {
          console.error('Sign Up Failed:', error);
          // Handle signup error logic here
        }
      );
    } else {
      this.markFormGroupTouched(this.signUpForm);
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login Form Data:', this.loginForm.value);
      this.authService.signIn(this.loginForm.value).subscribe(
        response => {
          console.log('Login Successful:', response);
          // Handle successful login logic here
        },
        error => {
          console.error('Login Failed:', error);
          // Handle login error logic here
        }
      );
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
