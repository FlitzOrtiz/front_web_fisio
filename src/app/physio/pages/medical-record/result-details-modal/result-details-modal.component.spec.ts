import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDetailsModalComponent } from './result-details-modal.component';

describe('ResultDetailsModalComponent', () => {
  let component: ResultDetailsModalComponent;
  let fixture: ComponentFixture<ResultDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
