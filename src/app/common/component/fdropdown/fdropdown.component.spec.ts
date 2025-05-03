import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdropdownComponent } from './fdropdown.component';

describe('FdropdownComponent', () => {
  let component: FdropdownComponent;
  let fixture: ComponentFixture<FdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FdropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
