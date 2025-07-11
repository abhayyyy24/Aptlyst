import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-auth-screen',
    standalone: true,
    imports: [FormsModule, NgIf],
    providers: [AuthService],
    templateUrl: './auth-screen.component.html',
    styleUrls: ['./auth-screen.component.css']
})
export class AuthScreenComponent {
    isLogin = true;
    errorMessage = '';
    isLoading = false;

    loginForm = {
        email: '',
        password: ''
    };

    signupForm = {
        name: '',
        phone: '',
        email: '',
        password: ''
    };

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    toggleForm() {
        this.isLogin = !this.isLogin;
        this.errorMessage = '';
        this.isLoading = false;
    }

    onLogin() {
        try {
            this.errorMessage = '';
            this.isLoading = true;
            
            if (!this.loginForm.email || !this.loginForm.password) {
                this.errorMessage = 'Please fill in all fields';
                this.isLoading = false;
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.loginForm.email)) {
                this.errorMessage = 'Please enter a valid email address';
                this.isLoading = false;
                return;
            }

            console.log('Starting login process for:', this.loginForm.email);
            
            this.authService.login(this.loginForm)
                .pipe(
                    finalize(() => {
                        console.log('Login process completed');
                        this.isLoading = false;
                    })
                )
                .subscribe({
                    next: (response) => {
                        console.log('Login response received:', response);
                        if (response?.user) {
                            console.log('Login successful, navigating to dashboard');
                            this.router.navigate(['/dscreen/dashboard']);
                        } else {
                            console.log('Login failed - no user in response');
                            this.errorMessage = 'Login failed. Please check your credentials and try again.';
                        }
                    },
                    error: (error) => {
                        console.error('Login error details:', error);
                        if (error.message?.includes('Failed to fetch') || error.message?.includes('Network')) {
                            this.errorMessage = 'Network error. Please check your internet connection and try again.';
                        } else {
                            this.errorMessage = error.message || 'Login failed. Please try again.';
                        }
                    }
                });
        } catch (error) {
            console.error('Unexpected error during login:', error);
            this.errorMessage = 'An unexpected error occurred. Please try again.';
            this.isLoading = false;
        }
    }

    onSignup() {
        try {
            this.errorMessage = '';
            this.isLoading = true;
            
            if (!this.signupForm.name || !this.signupForm.phone || 
                !this.signupForm.email || !this.signupForm.password) {
                this.errorMessage = 'Please fill in all fields';
                this.isLoading = false;
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.signupForm.email)) {
                this.errorMessage = 'Please enter a valid email address';
                this.isLoading = false;
                return;
            }

            if (this.signupForm.password.length < 6) {
                this.errorMessage = 'Password must be at least 6 characters long';
                this.isLoading = false;
                return;
            }

            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!phoneRegex.test(this.signupForm.phone)) {
                this.errorMessage = 'Please enter a valid phone number';
                this.isLoading = false;
                return;
            }

            console.log('Starting signup process for:', this.signupForm.email);

            this.authService.signup(this.signupForm)
                .pipe(
                    finalize(() => {
                        console.log('Signup process completed');
                        this.isLoading = false;
                    })
                )
                .subscribe({
                    next: (response) => {
                        console.log('Signup response received:', response);
                        if (response?.user) {
                            console.log('Signup successful, proceeding to login');
                            this.loginForm.email = this.signupForm.email;
                            this.loginForm.password = this.signupForm.password;
                            this.onLogin();
                        } else {
                            console.log('Signup failed - no user in response');
                            this.errorMessage = 'Signup failed. Please try again.';
                        }
                    },
                    error: (error) => {
                        console.error('Signup error details:', error);
                        if (error.message?.includes('Failed to fetch') || error.message?.includes('Network')) {
                            this.errorMessage = 'Network error. Please check your internet connection and try again.';
                        } else {
                            this.errorMessage = error.message || 'Signup failed. Please try again.';
                        }
                    }
                });
        } catch (error) {
            console.error('Unexpected error during signup:', error);
            this.errorMessage = 'An unexpected error occurred. Please try again.';
            this.isLoading = false;
        }
    }
}
