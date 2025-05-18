import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginCodeComponent } from './login-code.component';

describe('LoginCodeComponent', () => {
  let component: LoginCodeComponent;
  let fixture: ComponentFixture<LoginCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginCodeComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar alerta si el código está vacío', () => {
    spyOn(window, 'alert');
    component.code = '';
    component.joinSession();
    expect(window.alert).toHaveBeenCalledWith('Por favor, introduzca un código válido.');
  });

  it('debería imprimir el código si es válido', () => {
    spyOn(console, 'log');
    component.code = '123456';
    component.joinSession();
    expect(console.log).toHaveBeenCalledWith('Unirse con código:', '123456');
  });
});
