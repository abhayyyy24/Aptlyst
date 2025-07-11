import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'f-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './f-card.component.html',
  styleUrl: './f-card.component.css'
})
export class FCardComponent {
  @Input() title: string = 'List with Ease';
  @Input() description: string = 'Create and manage your property listings effortlessly. Our intuitive interface makes it simple to showcase your properties with detailed descriptions, high-quality images, and key features.';
  @Input() icon: string = 'bx-list-check';
  @Input() image: string = '';

  ngOnInit() {
    if (!this.image.startsWith('/')) {
      this.image = '/' + this.image;
    }
  }
}
