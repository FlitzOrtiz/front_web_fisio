import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './patient/component/test/test.component';

import { LandingComponent } from './landing/pages/landing/landing.component';
import { FdropdownComponent } from './common/component/fdropdown/fdropdown.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingComponent, FdropdownComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front_web_fisio';

  // Para uso con ngModel
  selectedArea: string | null = null
  areaInvalida = false

  areasObjetivo = [
    { id: "espalda", nombre: "Espalda" },
    { id: "brazos", nombre: "Brazos" },
    { id: "piernas", nombre: "Piernas" },
    { id: "abdomen", nombre: "Abdomen" },
    { id: "pecho", nombre: "Pecho" },
  ]

  // Para uso con Reactive Forms
  form: FormGroup

  intensidades = [
    { codigo: "baja", descripcion: "Baja" },
    { codigo: "media", descripcion: "Media" },
    { codigo: "alta", descripcion: "Alta" },
    { codigo: "extrema", descripcion: "Extrema" },
  ]

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      intensidad: [null, Validators.required],
    })
  }

  onAreaChange(value: any) {
    console.log("Área seleccionada:", value)
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName)
    return !!control && control.invalid && (control.dirty || control.touched)
  }
}

