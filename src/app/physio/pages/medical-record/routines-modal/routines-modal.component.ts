import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Routine,
  RoutineDifficulty,
  RoutineSession,
} from '../../../domain/routine';
import { FbuttonComponent } from '../../../../common/component/fbutton/fbutton.component';
import { RoutinesService } from '../../../service/routines.service';

@Component({
  selector: 'app-routines-modal',
  imports: [CommonModule, FormsModule, FbuttonComponent],
  templateUrl: './routines-modal.component.html',
  styleUrl: './routines-modal.component.scss',
})
export class RoutinesModalComponent implements OnInit {
  @Input() show: boolean = false;
  routines: Routine[] = [];
  routinesLoaded: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() selectRoutine = new EventEmitter<RoutineSession>();

  // Filtros
  searchTerm: string = '';
  filterFavorites: boolean = false;
  sessionStart: string;

  constructor(private routinesService: RoutinesService) {
    // Inicializa como string ISO de la fecha actual (para input type="date")
    this.sessionStart = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.routinesService.getAllRoutines().subscribe({
      next: (routines) => {
        // Asegura que siempre sea un array
        if (Array.isArray(routines)) {
          this.routines = routines ?? [];
        } else if (routines && Array.isArray(routines.routines)) {
          this.routines = routines.routines ?? [];
        } else {
          this.routines = [];
        }
        this.routinesLoaded = true;
      },
      error: (err) => {
        this.routines = [];
        this.routinesLoaded = true;
        console.error('Error loading routines', err);
      },
    });
  }

  get filteredRoutines(): Routine[] {
    if (!this.routinesLoaded) return [];
    // Si routines no es array, retorna vacío
    if (!Array.isArray(this.routines)) return [];
    let filtered = [...this.routines];
    if (this.filterFavorites) {
      filtered = filtered.filter((routine) => routine.isfavorite);
    }
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (routine) =>
          routine.name?.toLowerCase().includes(term) ||
          routine.description?.toLowerCase().includes(term)
      );
    }
    return filtered;
  }

  closeModal(): void {
    this.close.emit();
  }

  handleSelectRoutine(routineId: number): void {
    if (!Array.isArray(this.routines)) {
      this.routines = this.routines ? [this.routines] : [];
    }
    const selectedRoutine = this.routines.find(
      (routine) => routine.id === routineId
    );
    if (!selectedRoutine || !this.sessionStart) {
      return;
    }

    // sessionStart es string (YYYY-MM-DD), conviértelo a Date ISO completo
    let sessionDate: string;
    if (typeof this.sessionStart === 'string') {
      const date = new Date(this.sessionStart);
      sessionDate = isNaN(date.getTime())
        ? new Date().toISOString()
        : date.toISOString();
    } else {
      sessionDate = new Date().toISOString();
    }

    const routineSession: RoutineSession = {
      routineSessionId: 0, // Se actualizará cuando el back cree la sesión real
      accessCode: '', // Se actualizará cuando el back cree la sesión real
      isActive: true,
      routine: selectedRoutine,
      startDatetime: sessionDate,
    };

    this.selectRoutine.emit(routineSession);
  }
}
