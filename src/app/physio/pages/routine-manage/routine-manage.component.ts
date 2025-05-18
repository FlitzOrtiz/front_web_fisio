import { Component, ElementRef, ViewChild } from '@angular/core';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { CommonModule } from '@angular/common';
import { Routine, RoutineDifficulty } from '../../domain/routine';

@Component({
  selector: 'app-routine-manage',
  imports: [FbuttonComponent, CommonModule],
  templateUrl: './routine-manage.component.html',
  styleUrl: './routine-manage.component.scss',
})
export class RoutineManageComponent {
  public routineList: Routine[] = [
    {
      id: 1,
      name: 'Routine 1',
      category: 'rehabilitation',
      description: 'Description of Routine 1',
      dificulty: RoutineDifficulty.Easy,
      estimateduration: 30,
      objectivearea: 1,
      isfavorite: false,
    },
    {
      id: 2,
      name: 'Routine 2',
      category: 'strength training',
      description: 'Description of Routine 2',
      dificulty: RoutineDifficulty.Medium,
      estimateduration: 45,
      objectivearea: 2,
      isfavorite: true,
    },
    {
      id: 3,
      name: 'Routine 3',
      category: 'rehabilitation',
      description: 'Description of Routine 3',
      dificulty: RoutineDifficulty.Hard,
      estimateduration: 60,
      objectivearea: 3,
      isfavorite: false,
    },
    {
      id: 4,
      name: 'Routine 4',
      category: 'strength training',
      description: 'Description of Routine 4',
      dificulty: RoutineDifficulty.Easy,
      estimateduration: 30,
      objectivearea: 1,
      isfavorite: true,
    },
  ];

  public objectiveAreaList: string[] = [
    'Upper Body',
    'Lower Body',
    'Core',
    'Full Body',
  ];

  @ViewChild('filterpanel') filterPanel?: ElementRef;

  public showFilterMenu: boolean = false;

  public editRoutine(id: number): void {
    console.log('Edit routine with ID:', id);
  }
  public deleteRoutine(id: number): void {
    console.log('Delete routine with ID:', id);
  }
  public createNewRoutine(): void {
    console.log('Create new routine');
  }
  public assignRoutine(id: number): void {
    console.log('Assign routine with ID:', id);
  }
  public toggleFavorite(id: number): void {
    const routine = this.routineList.find((r) => r.id === id);
    if (routine) {
      routine.isfavorite = !routine.isfavorite;
      console.log('Toggled favorite for routine with ID:', id);
    }
  }
  openFilter() {
    if (this.filterPanel) {
      this.filterPanel.nativeElement.style.display =
        this.filterPanel.nativeElement.style.display === 'flex'
          ? 'none'
          : 'flex';
    }
  }
}
