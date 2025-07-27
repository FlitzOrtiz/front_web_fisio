import { Component } from '@angular/core';
import { LandingMonthPlansComponent } from '../../component/landing-month-plans/landing-month-plans.component';
import { LandingYearPlansComponent } from '../../component/landing-year-plans/landing-year-plans.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-subscription-selector',
  standalone: true,
  templateUrl: './landing-subscription-selector.component.html',
  styleUrls: ['./landing-subscription-selector.component.scss'],
  imports: [
    LandingMonthPlansComponent,
    LandingYearPlansComponent,
    CommonModule
  ],
})
export class LandingSubscriptionSelectorComponent {
  selected: 'month' | 'year' = 'month';
}
