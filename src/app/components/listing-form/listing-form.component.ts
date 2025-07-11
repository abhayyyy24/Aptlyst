import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListingService } from '../../services/listing.service';
import { ToastService } from '../../services/toast.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-listing-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})
export class ListingFormComponent implements OnInit {
  @Output() listingCreated = new EventEmitter<void>();
  listingForm: FormGroup;
  selectedImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private toastService: ToastService
  ) {
    this.listingForm = this.fb.group({
      type: ['', Validators.required],
      society_name: ['', Validators.required],
      locality: ['', Validators.required],
      floor: [''],
      rent: ['', [Validators.required, Validators.min(0)]],
      deposit: ['', [Validators.required, Validators.min(0)]],
      carpetArea: [''],
      availableFrom: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.listingForm.valid) {
      try {
        const formData = this.listingForm.value;
        await this.listingService.createListing({
          ...formData,
          imageUrl: this.selectedImage || ''
        });

        this.toastService.showSuccess('Success', 'Listing created successfully!');
        this.listingForm.reset();
        this.selectedImage = null;
        this.listingCreated.emit();

      } catch (error) {
        console.error('Error creating listing:', error);
        this.toastService.showError('Error', 'Failed to create listing. Please try again.');
      }
    }
  }
}
