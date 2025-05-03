import { Component } from '@angular/core';
import { CardComponent } from '../../component/card/card.component';
import { UserHeaderComponent } from '../../../common/component/user-header/user-header.component';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, UserHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
