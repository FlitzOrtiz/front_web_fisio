import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsComponent } from './graphics.component';

describe('GraphicsComponent', () => {
  let component: GraphicsComponent;
  let fixture: ComponentFixture<GraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
