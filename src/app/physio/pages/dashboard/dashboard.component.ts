import { Component } from '@angular/core';
import { CardsComponent } from '../../component/cards/cards.component';
import { UserHeaderComponent } from '../../../common/component/user-header/user-header.component';

@Component({
  selector: 'app-dashboard',
  imports: [CardsComponent, UserHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
