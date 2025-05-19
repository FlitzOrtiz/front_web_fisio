import { Component, Output, EventEmitter } from '@angular/core';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'app-dashboard-modal',
  imports: [FbuttonComponent],
  templateUrl: './dashboard-modal.component.html',
  styleUrl: './dashboard-modal.component.scss',
})
export class DashboardModalComponent {
  @Output() optionSelected = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();
}
