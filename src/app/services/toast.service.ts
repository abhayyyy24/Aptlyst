import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  severity: 'success' | 'error' | 'info' | 'warn';
  summary: string;
  detail: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messageSubject = new Subject<ToastMessage>();
  message$ = this.messageSubject.asObservable();

  showSuccess(summary: string, detail: string) {
    this.messageSubject.next({ severity: 'success', summary, detail });
  }

  showError(summary: string, detail: string) {
    this.messageSubject.next({ severity: 'error', summary, detail });
  }

  showInfo(summary: string, detail: string) {
    this.messageSubject.next({ severity: 'info', summary, detail });
  }

  showWarn(summary: string, detail: string) {
    this.messageSubject.next({ severity: 'warn', summary, detail });
  }
} 