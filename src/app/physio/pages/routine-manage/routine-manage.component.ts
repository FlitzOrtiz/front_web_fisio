import { Component, ElementRef, ViewChild } from '@angular/core';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { CommonModule } from '@angular/common';
import { Routine, RoutineDifficulty } from '../../domain/routine';
import { UserHeaderComponent } from '../../../common/component/user-header/user-header.component';
import { RoutinesService } from '../../service/routines.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routine-manage',
  imports: [FbuttonComponent, CommonModule, UserHeaderComponent],
  templateUrl: './routine-manage.component.html',
  styleUrl: './routine-manage.component.scss',
})
export class RoutineManageComponent {
  @ViewChild('filterpanel') filterPanel?: ElementRef;

  public routineList: Routine[] = [];
  public objectiveAreaList: string[] = [
    'Upper Body',
    'Lower Body',
    'Core',
    'Full Body',
  ];

  constructor(
    private routineService: RoutinesService, // Inyectar el servicio de rutinas
    private router: Router // Inyectar el enrutador para la navegación
  ) {
    this.routineService.getAllRoutines().subscribe((routines) => {
      this.routineList = routines;
    });
  }

  public showFilterMenu: boolean = false;

  public editRoutine(id: number): void {
    this.router.navigate(['/routinemanage', id]);
  }

  public deleteRoutine(id: number): void {
    this.routineService.deleteRoutine(id).subscribe(() => {
      this.routineList = this.routineList.filter(
        (routine) => routine.id !== id
      );
      console.log('Deleted routine with ID:', id);
    });
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
