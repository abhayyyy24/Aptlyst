import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DScreenComponent } from './d-screen.component';

describe('DScreenComponent', () => {
  let component: DScreenComponent;
  let fixture: ComponentFixture<DScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
