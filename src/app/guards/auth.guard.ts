import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Check if we're in the browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    if (!token) {
      router.navigate(['/sign']);
      return false;
    }
    return true;
  }

  // If we're on the server, allow the navigation
  // The actual auth check will happen on the client side
  return true;
}; 