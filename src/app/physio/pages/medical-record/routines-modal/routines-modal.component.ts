import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routine } from '../../../domain/routine';
import { FbuttonComponent } from '../../../../common/component/fbutton/fbutton.component';

@Component({
  selector: 'app-routines-modal',
  imports: [CommonModule, FormsModule, FbuttonComponent],
  templateUrl: './routines-modal.component.html',
  styleUrl: './routines-modal.component.scss',
})
export class RoutinesModalComponent {
  @Input() show: boolean = false;
  @Input() routines: Routine[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() selectRoutine = new EventEmitter<number>();
  @Output() toggleFavorite = new EventEmitter<number>();

  // Filtros
  searchTerm: string = '';
  filterFavorites: boolean = false;

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
    this.selectRoutine.emit(routineId);
  }

  handleToggleFavorite(routineId: number): void {
    this.toggleFavorite.emit(routineId);
  }
}
