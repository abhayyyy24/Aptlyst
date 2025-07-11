import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pricingcard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pricingcard.component.html',
  styleUrl: './pricingcard.component.css'
})
export class PricingcardComponent {
  @Input() title="";
  @Input() subtitle="";
  @Input() price="";
  @Input() features: string[] = [];
  @Input() isPopular = false;
  @Input() buttonText = "Get Started";
  @Input() icon='';
}
