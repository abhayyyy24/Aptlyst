import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListingsSectionComponent } from './my-listings-section.component';

describe('MyListingsSectionComponent', () => {
  let component: MyListingsSectionComponent;
  let fixture: ComponentFixture<MyListingsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyListingsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyListingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
