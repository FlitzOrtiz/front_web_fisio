import { Component } from '@angular/core';
import { YearPayComponent } from "../../component/year-pay/year-pay.component";
import { MonthPayComponent } from "../../component/month-pay/month-pay.component";
import { CommonModule } from "@angular/common";
import { UserHeaderComponent } from "../../../common/component/user-header/user-header.component";

@Component({
  selector: 'app-pay',
  standalone: true,
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
  imports: [YearPayComponent, MonthPayComponent, CommonModule, UserHeaderComponent],
})
export class PayComponent {
  selected: 'month' | 'year' = 'month';
}
