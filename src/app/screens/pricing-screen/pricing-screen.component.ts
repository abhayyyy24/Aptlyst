import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { PricingcardComponent } from "../../components/pricingcard/pricingcard.component";
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-pricing-screen',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PricingcardComponent, FooterComponent],
  templateUrl: './pricing-screen.component.html',
  styleUrl: './pricing-screen.component.css'
})
export class PricingScreenComponent {
  pricingplans=[
    {
      title:'Basic',
      subtitle:'for solo individuals',
      price:'200',
      features:[
        '200 listings',
        '1 group',
        'Basic Customer Support',
        'Standard Analytics',
        'Email Support'
      ],
      isPopular:false,
      buttonText:'Get Started',
      icon:'1'
    },
    {
      title:'Standard',
      subtitle:'for growing businesses',
      price:'500',
      features:[
        '500 listings',
        '3 groups',
        'Priority Customer Support',
        'Advanced Analytics',
        'Email & Chat Support',
      ],
      isPopular:true,
      buttonText:'Get Started',
      icon:'2'
    },
    {
      title:'Expert',
      subtitle:'for large enterprises',
      price:'1000',
      features:[
        'Unlimited listings',
        'Unlimited groups',
        '24/7 Premium Support',
        'Enterprise Analytics',
        'Priority Email, Chat & Phone Support',
        'Dedicated Account Manager',
      ],
      isPopular:false,
      buttonText:'Get Started',
      icon:'3'
    }
  ]
}
