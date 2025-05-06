import { Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'fbutton',
  imports: [CommonModule, RouterModule],
  templateUrl: './fbutton.component.html',
  styleUrl: './fbutton.component.scss',
})
export class FbuttonComponent {
  @Input() label: string = '';
  @Input() type: string = 'button'; // 'button', 'submit', 'reset'
  @Input() color: string = 'primary'; // 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'
  @Input() size: string = 'md'; // 'sm', 'md', 'lg'
  @Input() disabled: boolean = false; // true or false
  @Input() icon: string = ''; // FontAwesome icon name, e.g. 'fa-solid fa-check'
  @Input() iconPosition: string = 'left'; // 'left', 'right'
  @Input() loading: boolean = false; // true or false
  @Input() loadingText: string = ''; // Text to show when loading
  @Input() loadingIcon: string = 'fa-solid fa-spinner'; // FontAwesome icon name for loading state, e.g. 'fa-solid fa-spinner'
  @Input() loadingIconPosition: string = 'left'; // 'left', 'right'
  @Input() loadingSize: string = 'sm'; // 'sm', 'md', 'lg'
  @Input() loadingColor: string = 'primary'; // 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'
  @Input() loadingDisabled: boolean = false; // true or false

  @Input() onClick: () => void = () => {}; // Function to call on button click

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // Initialize any properties or perform any setup here
  }

  prueba(){
    console.log('prueba');
  }
}
