import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-screen',
  imports: [NavbarComponent,RouterLink],
  templateUrl: './about-screen.component.html',
  styleUrl: './about-screen.component.css'
})
export class AboutScreenComponent {

}
