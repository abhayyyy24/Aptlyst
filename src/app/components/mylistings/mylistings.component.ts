import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListingFormComponent } from "../listing-form/listing-form.component";
import { ReactiveFormsModule } from '@angular/forms';
import { MyListingsSectionComponent } from "../my-listings-section/my-listings-section.component";

@Component({
  selector: 'app-mylistings',
  standalone: true,
  imports: [RouterOutlet, ListingFormComponent, ReactiveFormsModule, MyListingsSectionComponent],
  templateUrl: './mylistings.component.html',
  styleUrl: './mylistings.component.css'
})
export class MylistingsComponent {
  @ViewChild('listingsSection') listingsSection!: MyListingsSectionComponent;

  onListingCreated(){
    this.listingsSection.reloadListings();
  }
}
