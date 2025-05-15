import { Component } from '@angular/core';
import { ConfigurationMenuComponent } from "../../component/configuration-menu/configuration-menu.component";
import { FbuttonComponent } from "../../../common/component/fbutton/fbutton.component";
import { UserHeaderComponent } from '../../../common/component/user-header/user-header.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  imports: [ConfigurationMenuComponent, FbuttonComponent, UserHeaderComponent]
})
export class AccountComponent {}
