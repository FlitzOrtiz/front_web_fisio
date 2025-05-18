import { RoutineSession } from './routine';

export interface MedicalRecord {
  recordId: string; // ID of the medical record
  namePatient: string;
  identification: string;
  age: number;
  sex: EnumSex;
  telephone: string;
  email: string;
  hasPreviousInjuries: boolean;
  previousInjuries?: string;
  chronicDiseases?: string[];
  affectedZone: string[];
  lesionTypes: string[];
  symptomStartDate: Date;
  painLevel: number;
  medicalDiagnosis: string;
  sessionRoutine: RoutineSession[];
  status: string; // status of the medical record (e.g., "En tratamiento", "En espera")
  lastUpdate: Date; // last update date of the medical record
}

export enum EnumSex {
  Femenino = 'Femenino',
  Masculino = 'Masculino',
  Otro = 'Otro',
  NoEspecificado = 'No Especificado',
}
