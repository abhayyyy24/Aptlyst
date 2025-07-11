import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { FCardComponent } from "../../components/f-card/f-card.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home-screen',
  imports: [NavbarComponent, HeroComponent, FCardComponent, FooterComponent],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {

}
