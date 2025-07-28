import { Component, ElementRef, ViewChild } from '@angular/core';
import { FbuttonComponent } from '../../../common/component/fbutton/fbutton.component';
import { CommonModule } from '@angular/common';
import { MedicalRecord, EnumSex } from '../../domain/medical-record';
import { UserHeaderComponent } from '../../../common/component/user-header/user-header.component';
import { FormsModule } from '@angular/forms';

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
  imports: [FbuttonComponent, CommonModule, UserHeaderComponent, FormsModule],
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.scss',
})
export class MedicalRecordComponent {
  // TODO: Cargar los registros reales desde el backend en vez de usar datos de prueba
  public patientRecords: PatientRecord[] = [];

  @ViewChild('filterpanel') filterPanel?: ElementRef;

  public showFilterMenu: boolean = false;

  public searchTerm: string = '';

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

  get filteredPatientRecords(): PatientRecord[] {
    if (!this.searchTerm.trim()) return this.patientRecords;
    const term = this.searchTerm.toLowerCase().trim();
    return this.patientRecords.filter(
      (record) =>
        record.namePatient.toLowerCase().includes(term) ||
        record.diagnosis.toLowerCase().includes(term) ||
        record.recordId.toLowerCase().includes(term)
    );
  }

  ngOnInit() {
    // Aquí deberías llamar a un servicio para cargar los registros reales
    // Ejemplo:
    // this.patientService.getAllPatientProfiles().subscribe(records => {
    //   this.patientRecords = records.map(r => ({
    //     id: r.patientProfileId,
    //     namePatient: r.fullName,
    //     recordId: r.patientProfileId ? `#P-${r.patientProfileId}` : '',
    //     diagnosis: r.medicalDiagnosis || '',
    //     status: r.status || '',
    //     assignedRoutines: r.sessions ? r.sessions.length : 0,
    //     lastUpdate: r.lastUpdate ? new Date(r.lastUpdate) : new Date(),
    //     isFavorite: false // o el campo que corresponda
    //   }));
    // });
  }
}
