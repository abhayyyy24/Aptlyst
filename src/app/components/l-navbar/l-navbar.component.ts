import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'l-navbar',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './l-navbar.component.html',
  styleUrl: './l-navbar.component.css'
})
export class LNavbarComponent {
  router = inject(Router);
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onLogoff() {
    // Clear the authentication token
    localStorage.removeItem('token');
    // Redirect to login page
    this.router.navigate(['/sign']);
  }
}
