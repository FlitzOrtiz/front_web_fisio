import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FbuttonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

}
