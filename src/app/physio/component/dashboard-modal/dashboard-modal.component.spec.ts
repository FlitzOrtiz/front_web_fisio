import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardModalComponent } from './dashboard-modal.component';

describe('DashboardModalComponent', () => {
  let component: DashboardModalComponent;
  let fixture: ComponentFixture<DashboardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
