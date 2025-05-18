import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineManageComponent } from './routine-manage.component';

describe('RoutineManageComponent', () => {
  let component: RoutineManageComponent;
  let fixture: ComponentFixture<RoutineManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
