import { Component } from '@angular/core';
import { FbuttonComponent } from '../fbutton/fbutton.component';

@Component({
  selector: 'app-user-header',
  imports: [FbuttonComponent],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent {}
