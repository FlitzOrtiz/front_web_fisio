import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginCameraComponent } from './login-camera.component';

describe('LoginCameraComponent', () => {
  let component: LoginCameraComponent;
  let fixture: ComponentFixture<LoginCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCameraComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar alerta si la cámara no se puede iniciar', async () => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(Promise.reject());
    spyOn(window, 'alert');

    await component.startCamera();

    expect(window.alert).toHaveBeenCalledWith(
      'Error: No se pudo acceder a la cámara. Por favor, permite el acceso para continuar.'
    );
  });
});

