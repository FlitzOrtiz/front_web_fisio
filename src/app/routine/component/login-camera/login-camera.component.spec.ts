import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCameraComponent } from './login-camera.component';

describe('LoginCameraComponent', () => {
  let component: LoginCameraComponent;
  let fixture: ComponentFixture<LoginCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCameraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
