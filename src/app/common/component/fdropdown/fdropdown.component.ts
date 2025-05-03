import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fdropdown',
  imports: [CommonModule, FormsModule],
  templateUrl: './fdropdown.component.html',
  styleUrl: './fdropdown.component.scss',
})
export class FdropdownComponent {
  @Input() options: any[] = [];
  @Input() labelField: string = 'label';
  @Input() valueField: string = 'value';
  @Input() placeholder: string = 'Selecciona una opción';

  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  onValueChange(val: any) {
    this.value = val;
    this.valueChange.emit(val);
  }
}
