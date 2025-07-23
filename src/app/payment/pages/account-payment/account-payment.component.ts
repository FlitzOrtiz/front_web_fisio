import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserHeaderComponent } from "../../../common/component/user-header/user-header.component";
import { PaymentSuccessComponent } from "../../component/payment-success/payment-success.component";

@Component({
  selector: 'app-account-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, UserHeaderComponent, PaymentSuccessComponent],
  templateUrl: './account-payment.component.html',
  styleUrls: ['./account-payment.component.scss']
})
export class AccountPaymentComponent {
  step = 3;
  email = 'john.smith@ejemplo.com';
  selectedCard = 'MASTERCARD •••• 8951';
  receiveEmails = false;
  price = 0.00;
}
