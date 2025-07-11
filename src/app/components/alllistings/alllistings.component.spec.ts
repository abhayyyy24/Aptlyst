import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlllistingsComponent } from './alllistings.component';

describe('AlllistingsComponent', () => {
  let component: AlllistingsComponent;
  let fixture: ComponentFixture<AlllistingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlllistingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlllistingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
