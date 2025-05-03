import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './patient/component/test/test.component';

import { LandingComponent } from './landing/pages/landing/landing.component';
import { FdropdownComponent } from './common/component/fdropdown/fdropdown.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FdropdownComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'front_web_fisio';

  options = [
    { name: "Hello World", value: "hello" },
    { name: "Option 2", value: "option2" },
    { name: "Option 3", value: "option3" },
    { name: "Option 4", value: "option4" },
    { name: "Option 5", value: "option5" },
  ]

  selectedValue: any;

  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      dropdown: [this.options[0].value, Validators.required],
    })
  }

  onSelectChange(value: any) {
    console.log("Selected value:", value)
    this.selectedValue = value
  }

  ngOnInit() {
    this.selectedValue = this.options[0].value;
  }
}

