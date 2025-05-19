import { Component, ElementRef, ViewChild } from '@angular/core';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { CommonModule } from '@angular/common';
import { MedicalRecord, EnumSex } from '../../domain/medical-record';
import { UserHeaderComponent } from '../../../common/component/user-header/user-header.component';

interface PatientRecord {
  id: number;
  namePatient: string;
  recordId: string;
  diagnosis: string;
  status: string;
  assignedRoutines: number;
  lastUpdate: Date;
  isFavorite: boolean;
}

@Component({
  selector: 'app-medical-record',
  imports: [FbuttonComponent, CommonModule, UserHeaderComponent],
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.scss',
})
export class MedicalRecordComponent {
  public patientRecords: PatientRecord[] = [
    {
      id: 1,
      namePatient: 'Walter White',
      recordId: '#P-2023-001',
      diagnosis: 'Rehabilitación post-quirúrgica de rodilla',
      status: 'En tratamiento',
      assignedRoutines: 3,
      lastUpdate: new Date('2023-04-12'),
      isFavorite: true,
    },
    {
      id: 2,
      namePatient: 'Walter White',
      recordId: '#P-2023-001',
      diagnosis: 'Rehabilitación post-quirúrgica de rodilla',
      status: 'En tratamiento',
      assignedRoutines: 3,
      lastUpdate: new Date('2023-04-12'),
      isFavorite: true,
    },
    {
      id: 3,
      namePatient: 'Walter White',
      recordId: '#P-2023-001',
      diagnosis: 'Rehabilitación post-quirúrgica de rodilla',
      status: 'En tratamiento',
      assignedRoutines: 3,
      lastUpdate: new Date('2023-04-12'),
      isFavorite: true,
    },
    {
      id: 4,
      namePatient: 'Walter White',
      recordId: '#P-2023-001',
      diagnosis: 'Rehabilitación post-quirúrgica de rodilla',
      status: 'En espera',
      assignedRoutines: 3,
      lastUpdate: new Date('2023-04-12'),
      isFavorite: false,
    },
  ];

  @ViewChild('filterpanel') filterPanel?: ElementRef;

  public showFilterMenu: boolean = false;

  public editRecord(id: number): void {
    console.log('Edit record with ID:', id);
  }

  public deleteRecord(id: number): void {
    console.log('Delete record with ID:', id);
  }

  public createNewRecord(): void {
    console.log('Create new record');
  }

  public shareRecord(id: number): void {
    console.log('Share record with ID:', id);
  }

  public toggleFavorite(id: number): void {
    const record = this.patientRecords.find((r) => r.id === id);
    if (record) {
      record.isFavorite = !record.isFavorite;
      console.log('Toggled favorite for record with ID:', id);
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
