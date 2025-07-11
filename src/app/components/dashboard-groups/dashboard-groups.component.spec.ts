import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGroupsComponent } from './dashboard-groups.component';

describe('DashboardGroupsComponent', () => {
  let component: DashboardGroupsComponent;
  let fixture: ComponentFixture<DashboardGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
