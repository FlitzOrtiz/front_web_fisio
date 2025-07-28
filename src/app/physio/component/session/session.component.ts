import { Component, Input } from '@angular/core';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'session',
  standalone: true,
  // imports: [FbuttonComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss',
})
export class SessionComponent {
  @Input() pfp: string = 'assets/user-ico.png';
  @Input() name: string = 'user name';
  @Input() routine: string = 'user routine';
  @Input() routine_id: number = 0;
  @Input() url: string = '/exercise';
}
