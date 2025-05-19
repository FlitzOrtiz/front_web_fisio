import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  input,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EnumSex, MedicalRecord } from '../../../domain/medical-record';
import {
  ExerciseMetrics,
  Routine,
  RoutineDifficulty,
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
export class PatientRecordComponent implements OnInit {
  // Enums
  Sex = EnumSex;

  otherZone: string = '';
  otherLesionType: string = '';

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
    affectedZone: ['Codo', 'Hombro', 'Muñeca'],
    lesionTypes: ['Tendinitis', 'Tendinopatía', 'Tendinosis'],
    symptomStartDate: new Date(),
    painLevel: 1,
    medicalDiagnosis: '',
    sessionRoutine: [
      {
        id: 1,
        routineId: 101,
        isActive: true,
        routine: {
          id: 101,
          name: 'Rutina de rehabilitación de codo',
          description: 'Ejercicios para mejorar la movilidad del codo.',
          daysWeek: ['LUN', 'MIE', 'VIE'],
          numWeeks: 4,
          exercises: [
            {
              id: 1,
              name: 'Flexión de codo',
              videoUrl: '',
              sets: 3,
              repetitions: 10,
              withAssistant: false,
              description: '',
              keymoments: [],
            },
            {
              id: 2,
              name: 'Extensión de codo',
              videoUrl: '',
              sets: 3,
              repetitions: 10,
              withAssistant: false,
              description: '',
              keymoments: [],
            },
            {
              id: 3,
              name: 'Rotación de muñeca',
              videoUrl: '',
              sets: 3,
              repetitions: 10,
              withAssistant: false,
              description: '',
              keymoments: [],
            },
          ],
          category: 'rehabilitation',
          difficulty: RoutineDifficulty.Medium,
          estimatedDuration: 30,
          targetArea: 30,
          isfavorite: false,
        },
        routinedetails: {
          id: 201,
          metrics: {
            sessionDate: new Date('2024-05-01'),
            duration: 45,
            exercisesMetrics: [
              {
                exerciseId: 1,
                excercise: {
                  id: 1,
                  name: 'Flexión de codo',
                  videoUrl: '',
                  sets: 3,
                  repetitions: 10,
                  withAssistant: false,
                  description: '',
                  keymoments: [],
                },
                valueEvaluated: 5,
              },
              {
                exerciseId: 2,
                excercise: {
                  id: 2,
                  name: 'Extensión de codo',
                  videoUrl: '',
                  sets: 3,
                  repetitions: 10,
                  withAssistant: false,
                  description: '',
                  keymoments: [],
                },
                valueEvaluated: 4,
              },
              {
                exerciseId: 3,
                excercise: {
                  id: 3,
                  name: 'Rotación de muñeca',
                  videoUrl: '',
                  sets: 3,
                  repetitions: 10,
                  withAssistant: false,
                  description: '',
                  keymoments: [],
                },
                valueEvaluated: 6,
              },
            ],
            patientComments: 'Me sentí bien durante la sesión.',
          },
          photos: [],
        },
      },
      {
        id: 2,
        routineId: 102,
        isActive: false,
        routine: {
          id: 102,
          name: 'Rutina de rehabilitación de rodilla',
          description: 'Ejercicios para mejorar la movilidad de la rodilla.',
          daysWeek: ['LUN', 'MIE', 'VIE'],
          numWeeks: 4,
          exercises: [
            {
              id: 4,
              name: 'Flexión de rodilla',
              videoUrl: '',
              sets: 3,
              repetitions: 10,
              withAssistant: false,
              description: '',
              keymoments: [],
            },
            {
              id: 5,
              name: 'Extensión de rodilla',
              videoUrl: '',
              sets: 3,
              repetitions: 10,
              withAssistant: false,
              description: '',
              keymoments: [],
            },
          ],
          category: 'rehabilitation',
          difficulty: RoutineDifficulty.Medium,
          estimatedDuration: 30,
          targetArea: 30,
          isfavorite: false,
        },
        routinedetails: {
          id: 202,
          metrics: {
            sessionDate: new Date('2024-05-08'),
            duration: 30,
            exercisesMetrics: [
              {
                exerciseId: 4,
                excercise: {
                  id: 4,
                  name: 'Flexión de rodilla',
                  videoUrl: '',
                  sets: 3,
                  repetitions: 10,
                  withAssistant: false,
                  description: '',
                  keymoments: [],
                },
                valueEvaluated: 7,
              },
              {
                exerciseId: 5,
                excercise: {
                  id: 5,
                  name: 'Extensión de rodilla',
                  videoUrl: '',
                  sets: 3,
                  repetitions: 10,
                  withAssistant: false,
                  description: '',
                  keymoments: [],
                },
                valueEvaluated: 8,
              },
            ],
            patientComments: 'Ligero dolor al final.',
          },
          photos: [],
        },
      },
    ],
    status: 'En tratamiento',
    lastUpdate: new Date(),
  };

  affectedZones: string[] = [
    'Codo',
    'Hombro',
    'Muñeca',
    'Rodilla',
    'Tobillo',
    'Cadera',
    'Columna',
  ];

  lesionTypes: string[] = [
    'Tendinitis',
    'Tendinopatía',
    'Tendinosis',
    'Desgarro',
    'Esguince',
    'Fractura',
  ];

  @ViewChild('zoneMenu') zoneMenuRef!: ElementRef;
  @ViewChild('lesionMenu') lesionMenuRef!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (
      this.showingZoneSelector &&
      this.zoneMenuRef &&
      !this.zoneMenuRef.nativeElement.contains(event.target)
    ) {
      this.hideZoneSelector();
    }

    if (
      this.showingLesionSelector &&
      this.lesionMenuRef &&
      !this.lesionMenuRef.nativeElement.contains(event.target)
    ) {
      this.hideLesionTypeSelector();
    }
  }

  today: string = new Date().toISOString().split('T')[0];

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
    private router: Router, // private patientService: PatientService, // private routineService: RoutineService
    private cdr: ChangeDetectorRef
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

  hideZoneSelector(): void {
    // console.log('hideZoneSelector');
    this.showingZoneSelector = false;
  }

  hideLesionTypeSelector(): void {
    // console.log('hideLesionTypeSelector');
    this.showingLesionSelector = false;
  }

  showLesionTypeSelector(): void {
    this.showingLesionSelector = !this.showingLesionSelector;
  }

  addAffectedZone(zoneName: string, addList: boolean = false): void {
    if (addList) {
      if (!this.affectedZones.some((zone) => zone === zoneName)) {
        this.affectedZones.push(zoneName);
      }
    }
    if (!this.patient.affectedZone.some((zone) => zone === zoneName)) {
      this.patient.affectedZone.push(zoneName);
    }
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

  selectRoutine(routineSession: RoutineSession): void {
    this.patient.sessionRoutine.push(routineSession);
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

  editRoutineDetails(routineId: number): void {
    console.log('Edit routine details for routine ID:', routineId);
    this.router.navigate([`/routinecreator/${routineId}`]);
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
    this.router.navigate(['/medicalrecordmanage']);
  }

  cancel(): void {
    this.router.navigate(['/medicalrecordmanage']);
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

  addLesionType(
    event: Event,
    typeName: string,
    addList: boolean = false
  ): void {
    (event.target as HTMLInputElement).value = '';
    if (addList) {
      if (!this.lesionTypes.some((type) => type === typeName)) {
        this.lesionTypes.push(typeName);
      }
    }
    if (!this.patient.lesionTypes.some((type) => type === typeName)) {
      this.patient.lesionTypes.push(typeName);
    }
    this.showingLesionSelector = false;
  }

  removeAffectedLesion(typeName: string): void {
    this.patient.lesionTypes = this.patient.lesionTypes.filter(
      (type) => type !== typeName
    );
  }
}
