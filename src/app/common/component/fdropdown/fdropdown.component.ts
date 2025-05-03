import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"

@Component({
  selector: 'fdropdown',
  imports: [CommonModule, FormsModule],
  templateUrl: './fdropdown.component.html',
  styleUrl: './fdropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FdropdownComponent),
      multi: true,
    },
  ],
})
export class FdropdownComponent {
  // Propiedades de datos
  @Input() options: any[] = []
  @Input() labelField = "label"
  @Input() valueField = "value"
  @Input() placeholder = "Selecciona una opción"

  // Propiedades de UI
  @Input() label = ""
  @Input() errorMessage = ""
  @Input() suggestionMessage = ""
  @Input() showError = false
  @Input() showSuggestion = false
  @Input() disabled = false
  @Input() required = false
  @Input() name = ""
  @Input() id = "dropdown-id"
  @Input() errorIcon = "⚠️"
  @Input() suggestionIcon = "💡"

  // Clases CSS personalizables
  @Input() containerClass = ""
  @Input() labelClass = ""
  @Input() selectClass = "f-dropdown w-full p-2 border rounded"
  @Input() errorClass = ""
  @Input() suggestionClass = ""

  // Eventos
  @Output() valueChange = new EventEmitter<any>()
  @Output() blur = new EventEmitter<void>()
  @Output() focus = new EventEmitter<void>()

  // Control de valor
  private _value: any = null

  @Input()
  get value(): any {
    return this._value
  }
  set value(val: any) {
    this._value = val
    this.onChange(val)
    this.valueChange.emit(val)
  }

  // Funciones de callback para el ControlValueAccessor
  private onChange: (value: any) => void = () => { }
  private onTouched: () => void = () => { }

  // Implementación de ControlValueAccessor
  writeValue(value: any): void {
    if (value !== this._value) {
      this._value = value
      // No emitimos eventos aquí para evitar ciclos
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  // Manejadores de eventos
  onValueChange(val: any): void {
    this.value = val
    this.onChange(val)
    this.valueChange.emit(val)
  }

  onBlur(): void {
    this.onTouched()
    this.blur.emit()
  }

  onFocus(): void {
    this.focus.emit()
  }
}
