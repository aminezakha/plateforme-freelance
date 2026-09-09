export type Gender = 'homme' | 'femme'

export type ActivityLevel = 'sedentaire' | 'leger' | 'modere' | 'actif'

export interface Profile {
  gender: Gender
  age: number
  heightCm: number
  startWeight: number
  targetWeight: number
  activityLevel: ActivityLevel
}

export interface WeightEntry {
  date: string // ISO yyyy-mm-dd
  weight: number
}

export interface SetLog {
  reps: number
  weight: number
}

export interface ExerciseLog {
  exerciseId: string
  sets: SetLog[]
}

export interface SessionLog {
  date: string // ISO yyyy-mm-dd
  dayId: string
  exercises: ExerciseLog[]
}

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  note?: string
}

export interface TrainingDay {
  id: string
  label: string
  focus: string
  exercises: Exercise[]
}
