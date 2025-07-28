export interface Routine {
  id: number;
  name: string;
  category: string; // e.g., "rehabilitation", "strength training", etc.
  description: string;
  difficulty: RoutineDifficulty; // e.g., "easy", "medium", "hard"
  estimatedDuration: number;
  targetArea: number; // e.g., 1 for "shoulder", 2 for "knee", etc.
  numWeeks: number; // number of weeks for the routine
  daysWeek: string[]; // e.g., ["MON", "WED", "FRI"]
  isfavorite: boolean; // true if the routine is marked as favorite
  exercises?: Exercise[]; // details of the routine
}

export interface RoutineSession {
  routineSessionId: number; // ID of the session (from backend)
  accessCode: string; // Access code for the session
  startDatetime?: string; // ISO string
  endDatetime?: string; // ISO string
  isActive?: boolean;
  routine?: Routine; // details of the routine
}

export interface ExerciseMetrics {
  exerciseId: number; // ID of the exercise
  excercise?: Exercise; // details of the exercise
  valueEvaluated: number; // value evaluated for the exercise
}

export interface MetricsDetials {
  sessionDate: Date; // date of the session
  duration: number; // in minutes
  exercisesMetrics: ExerciseMetrics[]; // metrics for each exercise in the routine
  patientComments: string; // comments from the patient about the session
}

export interface PhotosExercise {
  id: number;
  photoUrl: string; // URL to the photo taken during the session
  videoTimestamp: number; // moment in the video when the photo was taken
  description: string; // description of the photo
}

export interface RoutineDetails {
  id: number;
  metrics: MetricsDetials;
  photos?: PhotosExercise[]; // photos taken during the session
}

export interface Exercise {
  id: number;
  name: string;
  videoUrl: string; // URL to the exercise video
  sets: number; // in seconds
  repetitions: number;
  withAssistant: boolean; // true if the exercise requires an assistant
  description: string;
  keymoments: KeyMoment[]; // key moments to focus on during the exercise
}

export interface KeyMoment {
  id: number;
  description: string;
  time: number; // in seconds
}

export enum RoutineDifficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}
