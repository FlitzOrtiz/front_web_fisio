import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbuttonComponent } from './fbutton.component';

describe('FbuttonComponent', () => {
  let component: FbuttonComponent;
  let fixture: ComponentFixture<FbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
