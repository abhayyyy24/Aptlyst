import { Component } from '@angular/core';
import { LNavbarComponent } from "../../components/l-navbar/l-navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'd-screen',
  standalone: true,
  imports: [LNavbarComponent, RouterOutlet],
  templateUrl: './d-screen.component.html',
  styleUrl: './d-screen.component.css'
})
export class DScreenComponent {

}
