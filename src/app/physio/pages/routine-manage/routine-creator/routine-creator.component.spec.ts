import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineCreatorComponent } from './routine-creator.component';

describe('RoutineCreatorComponent', () => {
  let component: RoutineCreatorComponent;
  let fixture: ComponentFixture<RoutineCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
