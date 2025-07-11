import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingScreenComponent } from './pricing-screen.component';

describe('PricingScreenComponent', () => {
  let component: PricingScreenComponent;
  let fixture: ComponentFixture<PricingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
