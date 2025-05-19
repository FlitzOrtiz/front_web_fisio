import { Component, NgModule } from '@angular/core';
import { EnumSex, MedicalRecord } from '../../../domain/medical-record';
import {
  ExerciseMetrics,
  Routine,
  RoutineSession,
} from '../../../domain/routine';
import { ActivatedRoute, Router } from '@angular/router';
import { FbuttonComponent } from '../../../../common/component/fbutton/fbutton.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResultDetailsModalComponent } from '../result-details-modal/result-details-modal.component';
import { RoutinesModalComponent } from '../routines-modal/routines-modal.component';
import { ImageViewerModalComponent } from '../image-viewer-modal/image-viewer-modal.component';
import { UserHeaderComponent } from '../../../../common/component/user-header/user-header.component';

@Component({
  selector: 'app-patient-record',
  imports: [
    CommonModule,
    FormsModule,
    FbuttonComponent,
    ResultDetailsModalComponent,
    RoutinesModalComponent,
    UserHeaderComponent,
  ],
  templateUrl: './patient-record.component.html',
  styleUrl: './patient-record.component.scss',
})
export class PatientRecordComponent {
  // Enums
  Sex = EnumSex;

  // Patient data
  patient: MedicalRecord = {
    recordId: 'P-2023-001',
    namePatient: '',
    identification: '',
    age: 0,
    sex: this.Sex.NoEspecificado,
    telephone: '',
    email: '',
    hasPreviousInjuries: false,
    previousInjuries: '',
    chronicDiseases: [],
    affectedZone: [],
    lesionTypes: [],
    symptomStartDate: new Date(),
    painLevel: 0,
    medicalDiagnosis: '',
    sessionRoutine: [],
    status: 'En tratamiento',
    lastUpdate: new Date(),
  };

  // Date handling
  symptomStartDateStr: string = '';

  // Routines
  assignedRoutines: Routine[] = [];
  availableRoutines: Routine[] = [];

  // UI state
  showingZoneSelector: boolean = false;
  showingLesionSelector: boolean = false;
  showRoutinesModal: boolean = false;
  showResultsModal: boolean = false;
  showImageViewer: boolean = false;
  activeTab: 'metrics' | 'photos' = 'metrics';

  constructor(
    private route: ActivatedRoute,
    private router: Router // private patientService: PatientService, // private routineService: RoutineService
  ) {}

  ngOnInit(): void {
    const recordId = this.route.snapshot.paramMap.get('id');
    // if (recordId) {
    //   this.loadPatientData(recordId);
    // }

    // this.loadAvailableRoutines();
    this.formatDates();
  }

  // private loadPatientData(recordId: string): void {
  //   this.patientService.getPatientByRecordId(recordId).subscribe(
  //     (patient) => {
  //       this.patient = patient;
  //       this.loadAssignedRoutines();
  //       this.formatDates();
  //     },
  //     (error) => {
  //       console.error('Error loading patient data', error);
  //     }
  //   );
  // }

  // private loadAssignedRoutines(): void {
  //   if (this.patient.assignedRoutines && this.patient.assignedRoutines.length > 0) {
  //     this.routineService.getRoutinesByIds(this.patient.assignedRoutines).subscribe(
  //       (routines) => {
  //         this.assignedRoutines = routines;
  //       },
  //       (error) => {
  //         console.error('Error loading assigned routines', error);
  //       }
  //     );
  //   }
  // }

  // private loadAvailableRoutines(): void {
  //   this.routineService.getAllRoutines().subscribe(
  //     (routines) => {
  //       this.availableRoutines = routines;
  //     },
  //     (error) => {
  //       console.error('Error loading available routines', error);
  //     }
  //   );
  // }

  private formatDates(): void {
    if (this.patient.symptomStartDate) {
      const date = new Date(this.patient.symptomStartDate);
      this.symptomStartDateStr = date.toISOString().split('T')[0];
    }
  }

  // UI Actions
  showZoneSelector(): void {
    this.showingZoneSelector = !this.showingZoneSelector;
  }

  showLesionTypeSelector(): void {
    this.showingLesionSelector = !this.showingLesionSelector;
  }

  addAffectedZone(zoneName: string): void {
    this.patient.affectedZone.push(zoneName);
    this.showingZoneSelector = false;
  }

  removeAffectedZone(zoneName: string): void {
    this.patient.affectedZone = this.patient.affectedZone.filter(
      (zone) => zone !== zoneName
    );
  }

  removeLesionType(typeName: string): void {
    this.patient.lesionTypes = this.patient.lesionTypes.filter(
      (type) => type !== typeName
    );
  }

  // Routine management
  openRoutinesModal(): void {
    this.showRoutinesModal = true;
  }

  closeRoutinesModal(): void {
    this.showRoutinesModal = false;
  }

  selectRoutine(event: any): void {
    const routineId = event.target.value;
    const routine = this.availableRoutines.find((r) => r.id === routineId);

    if (!routine) {
      console.error('Routine not found');
      return;
    }
    // Verificar si la rutina ya está asignada
    const isAssigned = this.assignedRoutines.some((r) => r.id === routine.id);
    if (!isAssigned) {
      this.assignedRoutines.push(routine);
      const sessionRoutine: RoutineSession = {
        id: 0,
        routineId: 0,
        isActive: false,
        routinedetails: {
          id: 0,
          metrics: {
            sessionDate: new Date(),
            duration: 0,
            exercisesMetrics: [],
            patientComments: '',
          },
          photos: [],
        },
      };
      this.patient.sessionRoutine.push();
    }
    this.closeRoutinesModal();
  }

  // Añadir estas propiedades
  selectedRoutineId: number = 0;
  selectedRoutineName: string = '';

  // Actualizar el método openResultsModal
  openResultsModal(routineId: number): void {
    this.showResultsModal = true;
    this.activeTab = 'metrics';
    this.selectedRoutineId = routineId;

    // Buscar el nombre de la rutina
    const routine = this.assignedRoutines.find((r) => r.id === routineId);
    this.selectedRoutineName = routine ? routine.name : 'Rutina';

    // Cargar datos de resultados para la rutina específica
    console.log('Abrir modal de resultados para rutina:', routineId);
  }

  // Añadir método para guardar resultados
  saveResult(result: any): void {
    console.log('Guardar resultado:', result);
    // Implementar lógica para guardar el resultado
    this.closeResultsModal();
  }

  removeRoutine(index: number): void {
    const routineId = this.patient.sessionRoutine[index].id;
    this.patient.sessionRoutine = this.patient.sessionRoutine.filter(
      (session) => session.id !== routineId
    );
    this.assignedRoutines.splice(index, 1);
  }

  viewRoutineDetails(routineId: number): void {
    // Implementar navegación a detalles de rutina
  }

  closeResultsModal(): void {
    this.showResultsModal = false;
  }

  // Form actions
  // save(): void {
  //   // Actualizar fecha de inicio de síntomas desde el string
  //   if (this.symptomStartDateStr) {
  //     this.patient.symptomStartDate = new Date(this.symptomStartDateStr);
  //   }

  //   this.patientService.updatePatient(this.patient).subscribe(
  //     () => {
  //       this.router.navigate(['/patients']);
  //     },
  //     (error) => {
  //       console.error('Error saving patient data', error);
  //     }
  //   );
  // }

  save(): void {
    // Aquí se guardaría la información del paciente
    console.log('Patient data saved:', this.patient);
    // Navegar a la lista de pacientes o mostrar un mensaje de éxito
    this.router.navigate(['/patients']);
  }

  cancel(): void {
    this.router.navigate(['/patients']);
  }

  onChronicDiseaseChange(injury: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      (this.patient.chronicDiseases ??= []).push(injury);
    } else {
      this.patient.chronicDiseases = (
        this.patient.chronicDiseases ?? []
      ).filter((disease) => disease !== injury);
    }
  }

  addAffectedLesion(typeName: string): void {
    this.patient.lesionTypes.push(typeName);
    this.showingLesionSelector = false;
  }

  removeAffectedLesion(typeName: string): void {
    this.patient.lesionTypes = this.patient.lesionTypes.filter(
      (type) => type !== typeName
    );
  }
}
