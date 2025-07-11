import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import laraLightBlue from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: laraLightBlue
      }
    }),
    {
      provide: 'CSP_CONFIG',
      useValue: {
        'default-src': ["'self'"],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://*.supabase.co",
          "https://*.supabase.in"
        ],
        'style-src': [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://*.supabase.co"
        ],
        'img-src': [
          "'self'",
          "data:",
          "https://*.supabase.co",
          "https://*.supabase.in"
        ],
        'connect-src': [
          "'self'",
          "https://*.supabase.co",
          "https://*.supabase.in",
          "wss://*.supabase.co"
        ],
        'font-src': [
          "'self'",
          "https://fonts.gstatic.com",
          "https://*.supabase.co"
        ],
        'object-src': ["'none'"],
        'media-src': ["'self'"],
        'frame-src': ["'self'"],
        'worker-src': ["'self'", "blob:"],
        'child-src': ["'self'", "blob:"]
      }
    }
  ]
};
