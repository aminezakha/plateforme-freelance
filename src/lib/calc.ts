import type { ActivityLevel, Profile } from '../types'

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentaire: 1.2,
  leger: 1.375,
  modere: 1.55,
  actif: 1.725,
}

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentaire: 'Sédentaire (bureau, peu de marche)',
  leger: 'Légèrement actif (marche, 1-3 séances/sem hors muscu)',
  modere: 'Modérément actif (debout/physique une partie de la journée)',
  actif: 'Actif (travail physique ou beaucoup de marche)',
}

/** Mifflin-St Jeor — estimation standard, pas une mesure exacte */
export function computeBMR(profile: Profile, currentWeight: number): number {
  const { gender, age, heightCm } = profile
  const base = 10 * currentWeight + 6.25 * heightCm - 5 * age
  return gender === 'homme' ? base + 5 : base - 161
}

export function computeTDEE(profile: Profile, currentWeight: number): number {
  const bmr = computeBMR(profile, currentWeight)
  return bmr * ACTIVITY_MULTIPLIERS[profile.activityLevel] + 250 // +250 kcal : dépense de l'entraînement de muscu (5j/sem)
}

export interface CalorieTargets {
  tdee: number
  target: number
  proteinG: number
  fatG: number
  carbsG: number
  proteinKcal: number
  fatKcal: number
  carbsKcal: number
}

/**
 * Surplus modéré (+350 kcal) pour prise de muscle sans excès de gras.
 * Protéines ~2g/kg, lipides ~25% des calories, reste en glucides.
 */
export function computeTargets(profile: Profile, currentWeight: number): CalorieTargets {
  const tdee = computeTDEE(profile, currentWeight)
  const target = tdee + 350
  const proteinG = Math.round(currentWeight * 2)
  const proteinKcal = proteinG * 4
  const fatKcal = target * 0.25
  const fatG = Math.round(fatKcal / 9)
  const carbsKcal = target - proteinKcal - fatKcal
  const carbsG = Math.round(carbsKcal / 4)

  return {
    tdee: Math.round(tdee),
    target: Math.round(target),
    proteinG,
    fatG,
    carbsG,
    proteinKcal: Math.round(proteinKcal),
    fatKcal: Math.round(fatKcal),
    carbsKcal: Math.round(carbsKcal),
  }
}

/** Estimation grossière du temps pour atteindre l'objectif à un rythme de prise "propre" (~0.35kg/semaine en moyenne) */
export function estimateWeeksToGoal(currentWeight: number, targetWeight: number): number {
  const remaining = targetWeight - currentWeight
  if (remaining <= 0) return 0
  return Math.ceil(remaining / 0.35)
}
