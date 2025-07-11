import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, ToastModule],
  template: `
    <p-toast position="top-right"></p-toast>
  `,
  providers: [MessageService]
})
export class ToastComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  constructor(
    private messageService: MessageService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.subscription = this.toastService.message$.subscribe(message => {
      this.messageService.add(message);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
} 