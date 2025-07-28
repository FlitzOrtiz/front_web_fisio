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
import { PatientService } from '../../../../patient/service/patient.service';
import { HttpClient } from '@angular/common/http';

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
    affectedZone: [], // <-- Inicializar vacío para que no aparezcan zonas por defecto
    lesionTypes: [], // <-- Inicializar vacío para que no aparezcan lesiones por defecto
    symptomStartDate: new Date(),
    painLevel: 1,
    medicalDiagnosis: '',
    sessionRoutine: [], // Ahora debe ser un array de RoutineSession con la nueva estructura
    status: 'En tratamiento',
    lastUpdate: new Date(),
  };

  chronicDiseaseCatalog: any[] = [];
  affectedZoneCatalog: any[] = [];
  lesionTypeCatalog: any[] = [];

  affectedZones: string[] = [];

  lesionTypes: string[] = [];

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
    private router: Router,
    private cdr: ChangeDetectorRef,
    private patientService: PatientService
  ) {}

  loadPatientProfile(id: number): void {
    this.patientService.getPatientProfile(id).subscribe((data) => {
      // Map backend fields to frontend model
      this.patient.namePatient = data.fullName;
      this.patient.identification = data.idNumber;
      this.patient.telephone = data.phone;
      this.patient.age = data.age;
      this.patient.sex = this.mapSexFromBackend(data.sex);
      this.patient.email = data.email;
      this.patient.previousInjuries = data.priorSurgeries;
      this.patient.chronicDiseases = (data.chronicDiseases || []).map(
        (d: any) => d.name
      );
      this.patient.affectedZone = (data.affectedZones || []).map(
        (z: any) => z.name
      );
      this.patient.lesionTypes = (data.lesionTypes || []).map(
        (l: any) => l.name
      );
      this.patient.symptomStartDate = data.painStartDate
        ? new Date(data.painStartDate)
        : new Date();
      this.symptomStartDateStr = data.painStartDate || '';
      this.patient.painLevel = data.painLevel;
      this.patient.medicalDiagnosis = data.medicalDiagnosis;
      // Rutinas: sesiones reales
      if (data.sessions && Array.isArray(data.sessions)) {
        this.patient.sessionRoutine = data.sessions.map((session: any) => ({
          routineSessionId: session.routineSessionId,
          accessCode: session.accessCode,
          startDatetime: session.startDatetime,
          endDatetime: session.endDatetime,
          isActive: session.isActive,
          routine: session.routine,
        }));
      } else {
        this.patient.sessionRoutine = [];
      }
    });
  }

  private mapSexFromBackend(sex: string): EnumSex {
    if (sex === 'M') return this.Sex.Masculino;
    if (sex === 'F') return this.Sex.Femenino;
    if (sex === 'O') return this.Sex.Otro;
    return this.Sex.NoEspecificado;
  }

  ngOnInit(): void {
    this.loadCatalogs();
    const recordId = this.route.snapshot.paramMap.get('id');
    if (recordId) {
      this.loadPatientProfile(Number(recordId));
    }
    this.formatDates();
  }

  private loadCatalogs(): void {
    this.patientService.getChronicDiseases().subscribe((data) => {
      this.chronicDiseaseCatalog = data;
    });
    this.patientService.getAffectedZones().subscribe((data) => {
      this.affectedZoneCatalog = data;
    });
    this.patientService.getLesionTypes().subscribe((data) => {
      this.lesionTypeCatalog = data;
    });
  }

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
    const routineId = this.patient.sessionRoutine[index].routineSessionId;
    this.patient.sessionRoutine = this.patient.sessionRoutine.filter(
      (session) => session.routineSessionId !== routineId
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
    // Actualizar fecha de inicio de síntomas desde el string
    if (this.symptomStartDateStr) {
      this.patient.symptomStartDate = new Date(this.symptomStartDateStr);
    }

    // Map sex to backend format
    let sex = 'O';
    if (this.patient.sex === this.Sex.Masculino) sex = 'M';
    else if (this.patient.sex === this.Sex.Femenino) sex = 'F';
    else if (this.patient.sex === this.Sex.Otro) sex = 'O';
    else sex = 'N';

    // Map chronic diseases
    const chronicDiseaseIds = (this.patient.chronicDiseases ?? []).map(
      (name) => {
        const found = this.chronicDiseaseCatalog.find((d) => d.name === name);
        return found ? found.id : { name };
      }
    );

    // Map affected zones
    const affectedZoneIds = (this.patient.affectedZone ?? []).map((name) => {
      const found = this.affectedZoneCatalog.find((z) => z.name === name);
      return found ? found.id : { name };
    });

    // Map lesion types
    const lesionTypeIds = (this.patient.lesionTypes ?? []).map((name) => {
      const found = this.lesionTypeCatalog.find((l) => l.name === name);
      return found ? found.id : { name };
    });

    // Rutina asignada (solo una, por compatibilidad con backend ejemplo)
    const routineId =
      this.patient.sessionRoutine.length > 0
        ? this.patient.sessionRoutine[0].routineSessionId
        : null;

    const payload: any = {
      fullName: this.patient.namePatient,
      idNumber: this.patient.identification,
      phone: this.patient.telephone,
      age: this.patient.age,
      sex: sex,
      email: this.patient.email,
      priorSurgeries: this.patient.previousInjuries,
      chronicDiseaseIds: chronicDiseaseIds,
      affectedZoneIds: affectedZoneIds,
      lesionTypeIds: lesionTypeIds,
      painStartDate: this.symptomStartDateStr,
      painLevel: this.patient.painLevel,
      medicalDiagnosis: this.patient.medicalDiagnosis,
      routineId: routineId,
    };

    this.patientService.createOrUpdatePatientProfile(payload).subscribe({
      next: (res) => {
        // Si el backend responde con sessionId y accessCode, agrégalo a sessionRoutine
        if (res.sessionId && res.accessCode) {
          this.patient.sessionRoutine.push({
            routineSessionId: res.sessionId,
            accessCode: res.accessCode,
            isActive: true,
            routine: {
              id: payload.routineId,
              name: '',
              category: '',
              description: '',
              difficulty: 0,
              estimatedDuration: 0,
              targetArea: 0,
              numWeeks: 0,
              daysWeek: [],
              isfavorite: false,
            },
          });
        }
        this.router.navigate(['/medicalrecordmanage']);
      },
      error: (err) => {
        console.error('Error saving patient data', err);
      },
    });
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
