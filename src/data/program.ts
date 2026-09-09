import type { TrainingDay } from '../types'

/**
 * Split 5 jours : Push / Pull / Legs / Repos / Upper / Lower / Repos.
 * Fréquence 2x/semaine sur chaque groupe majeur (1x lourd + 1x volume modéré),
 * pensé pour maximiser la prise de muscle sans épuiser un appétit déjà limité
 * par des séances trop longues ou trop nombreuses.
 */
export const PROGRAM: TrainingDay[] = [
  {
    id: 'push',
    label: 'Jour 1 — Push',
    focus: 'Pectoraux, épaules, triceps',
    exercises: [
      { id: 'push-bench', name: 'Développé couché barre', sets: 4, reps: '6-8', note: 'Exercice principal — augmente le poids dès que 8 reps sont faites sur toutes les séries' },
      { id: 'push-incline-db', name: 'Développé incliné haltères', sets: 3, reps: '8-10' },
      { id: 'push-shoulder-press', name: 'Développé militaire haltères', sets: 3, reps: '8-10' },
      { id: 'push-lateral-raise', name: 'Élévations latérales', sets: 3, reps: '12-15' },
      { id: 'push-dips', name: 'Dips (ou pompes serrées si indisponible)', sets: 3, reps: 'max' },
      { id: 'push-triceps-pushdown', name: 'Extension triceps à la poulie', sets: 3, reps: '10-12' },
    ],
  },
  {
    id: 'pull',
    label: 'Jour 2 — Pull',
    focus: 'Dos, biceps',
    exercises: [
      { id: 'pull-row-barbell', name: 'Rowing barre', sets: 4, reps: '8-10', note: 'Exercice principal' },
      { id: 'pull-pullup', name: 'Tractions (ou tirage vertical si indisponible)', sets: 3, reps: '6-10' },
      { id: 'pull-cable-row', name: 'Tirage horizontal poulie basse', sets: 3, reps: '10-12' },
      { id: 'pull-oneam-row', name: 'Rowing haltère unilatéral', sets: 3, reps: '10' },
      { id: 'pull-curl-barbell', name: 'Curl biceps barre', sets: 3, reps: '10-12' },
      { id: 'pull-curl-hammer', name: 'Curl marteau haltères', sets: 3, reps: '12' },
    ],
  },
  {
    id: 'legs',
    label: 'Jour 3 — Legs',
    focus: 'Jambes complet',
    exercises: [
      { id: 'legs-squat', name: 'Squat barre', sets: 4, reps: '6-8', note: 'Exercice principal' },
      { id: 'legs-press', name: 'Presse à cuisses', sets: 3, reps: '10-12' },
      { id: 'legs-rdl', name: 'Soulevé de terre roumain', sets: 3, reps: '10' },
      { id: 'legs-curl', name: 'Leg curl allongé', sets: 3, reps: '12' },
      { id: 'legs-extension', name: 'Leg extension', sets: 3, reps: '12' },
      { id: 'legs-calf', name: 'Mollets debout', sets: 4, reps: '15' },
    ],
  },
  {
    id: 'rest1',
    label: 'Jour 4 — Repos',
    focus: 'Récupération',
    exercises: [],
  },
  {
    id: 'upper',
    label: 'Jour 5 — Upper',
    focus: 'Haut du corps (volume secondaire)',
    exercises: [
      { id: 'upper-incline-barbell', name: 'Développé incliné barre', sets: 3, reps: '8-10' },
      { id: 'upper-pulldown', name: 'Tirage vertical prise large', sets: 3, reps: '8-10' },
      { id: 'upper-db-shoulder', name: 'Développé haltères assis', sets: 3, reps: '10' },
      { id: 'upper-seated-row', name: 'Rowing poulie basse assis', sets: 3, reps: '10' },
      { id: 'upper-lateral', name: 'Élévations latérales', sets: 3, reps: '15' },
      { id: 'upper-arms', name: 'Curl + extension triceps (superset)', sets: 2, reps: '12 chaque' },
    ],
  },
  {
    id: 'lower',
    label: 'Jour 6 — Lower',
    focus: 'Bas du corps (volume secondaire)',
    exercises: [
      { id: 'lower-deadlift', name: 'Soulevé de terre', sets: 4, reps: '5-6', note: 'Exercice principal — technique avant charge' },
      { id: 'lower-bulgarian', name: 'Fentes bulgares', sets: 3, reps: '10 par jambe' },
      { id: 'lower-press', name: 'Presse à cuisses', sets: 3, reps: '12' },
      { id: 'lower-curl', name: 'Leg curl', sets: 3, reps: '12' },
      { id: 'lower-calf', name: 'Mollets assis', sets: 4, reps: '15' },
      { id: 'lower-plank', name: 'Gainage planche', sets: 3, reps: '45s' },
    ],
  },
  {
    id: 'rest2',
    label: 'Jour 7 — Repos',
    focus: 'Récupération',
    exercises: [],
  },
]

export const TRAINING_TIPS = [
  'Progression : quand tu atteins le haut de la fourchette de reps sur toutes les séries d\'un exercice, augmente le poids la séance suivante (petit incrément).',
  'Échauffement : 5-10 min de cardio léger + 1-2 séries légères de l\'exercice principal avant de charger lourd.',
  'Repos entre séries : 90-120s sur les gros mouvements (squat, développé, rowing, deadlift), 60s sur les isolations.',
  'Le sommeil (7-8h) compte autant que l\'entraînement pour la prise de muscle — surtout avec un appétit limité, le corps a besoin de récupérer efficacement.',
]
