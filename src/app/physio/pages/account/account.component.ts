import { Component } from '@angular/core';
import { ConfigurationMenuComponent } from "../../component/configuration-menu/configuration-menu.component";
import { FbuttonComponent } from "../../../common/component/fbutton/fbutton.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  imports: [ConfigurationMenuComponent, FbuttonComponent]
})
export class AccountComponent {}
