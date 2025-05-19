import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Routine,
  RoutineDifficulty,
  RoutineSession,
} from '../../../domain/routine';
import { FbuttonComponent } from '../../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'app-routines-modal',
  imports: [CommonModule, FormsModule, FbuttonComponent],
  templateUrl: './routines-modal.component.html',
  styleUrl: './routines-modal.component.scss',
})
export class RoutinesModalComponent {
  @Input() show: boolean = false;
  routines: Routine[] = [
    {
      id: 1,
      name: 'Rutina de Ejemplo 1',
      description: 'Descripción de la rutina 1',
      isfavorite: false,
      category: 'General',
      difficulty: RoutineDifficulty.Easy,
      estimatedDuration: 30,
      targetArea: 1,
      numWeeks: 2,
      daysWeek: ['LUN', 'MAR', 'JUE'],
    },
    {
      id: 2,
      name: 'Rutina de Ejemplo 2',
      description: 'Descripción de la rutina 2',
      isfavorite: true,
      category: 'Rehabilitación',
      difficulty: RoutineDifficulty.Medium,
      estimatedDuration: 45,
      targetArea: 2,
      numWeeks: 4,
      daysWeek: ['LUN', 'MIÉ', 'VIE'],
    },
    {
      id: 3,
      name: 'Rutina de Ejemplo 3',
      description: 'Descripción de la rutina 3',
      isfavorite: false,
      category: 'Deportivo',
      difficulty: RoutineDifficulty.Hard,
      estimatedDuration: 60,
      targetArea: 3,
      numWeeks: 6,
      daysWeek: ['MAR', 'JUE', 'SÁB'],
    },
  ];

  @Output() close = new EventEmitter<void>();
  @Output() selectRoutine = new EventEmitter<RoutineSession>();

  // Filtros
  searchTerm: string = '';
  filterFavorites: boolean = false;
  sessionStart: Date;

  constructor() {
    this.sessionStart = new Date();
  }

  get filteredRoutines(): Routine[] {
    let filtered = [...this.routines];

    if (this.filterFavorites) {
      filtered = filtered.filter((routine) => routine.isfavorite);
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (routine) =>
          routine.name.toLowerCase().includes(term) ||
          routine.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  closeModal(): void {
    this.close.emit();
  }

  handleSelectRoutine(routineId: number): void {
    const selectedRoutine = this.routines.find(
      (routine) => routine.id === routineId
    );
    console.log('sessionStart', this.sessionStart);
    if (!selectedRoutine || !this.sessionStart) {
      return;
    }

    const routineSession: RoutineSession = {
      id: 0,
      routineId: selectedRoutine.id,
      routine: selectedRoutine,
      isActive: true,
      routinedetails: {
        id: 0,
        metrics: {
          sessionDate: this.sessionStart,
          duration: selectedRoutine.estimatedDuration,
          exercisesMetrics: [],
          patientComments: '',
        },
        photos: [],
      },
    };

    this.selectRoutine.emit(routineSession);
  }
}
