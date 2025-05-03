import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FbuttonComponent } from './common/component/fbutton/fbutton.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FbuttonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front_web_fisio';

  handleClick() {
    alert('Button clicked!');
  }
}
