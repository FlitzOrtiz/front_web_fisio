import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinesModalComponent } from './routines-modal.component';

describe('RoutinesModalComponent', () => {
  let component: RoutinesModalComponent;
  let fixture: ComponentFixture<RoutinesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutinesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutinesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
