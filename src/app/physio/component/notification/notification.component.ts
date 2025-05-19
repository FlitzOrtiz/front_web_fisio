import { Component, Input } from '@angular/core';

@Component({
  selector: 'notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  @Input() sender: string = '';
  @Input() content: string = '';
}
