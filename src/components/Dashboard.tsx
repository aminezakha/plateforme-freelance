import type { Profile, WeightEntry } from '../types'
import { computeTargets, estimateWeeksToGoal } from '../lib/calc'
import { PROGRAM } from '../data/program'

interface Props {
  profile: Profile
  weightEntries: WeightEntry[]
}

function todayDayIndex() {
  // 0 = lundi ... 6 = dimanche, aligné sur l'ordre du programme (Push, Pull, Legs, Repos, Upper, Lower, Repos)
  const jsDay = new Date().getDay() // 0 = dimanche
  return (jsDay + 6) % 7
}

export function Dashboard({ profile, weightEntries }: Props) {
  const currentWeight = weightEntries.length
    ? [...weightEntries].sort((a, b) => b.date.localeCompare(a.date))[0].weight
    : profile.startWeight

  const targets = computeTargets(profile, currentWeight)
  const weeksLeft = estimateWeeksToGoal(currentWeight, profile.targetWeight)
  const todayProgram = PROGRAM[todayDayIndex()]
  const progressPct = Math.min(
    100,
    Math.max(0, ((currentWeight - profile.startWeight) / (profile.targetWeight - profile.startWeight)) * 100),
  )

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-white">Salut 👋</h1>
        <p className="text-sm text-slate-400">Objectif : {profile.startWeight}kg → {profile.targetWeight}kg</p>
      </div>

      <div className="bg-slate-800/60 rounded-2xl p-4">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-2xl font-bold text-white">{currentWeight}kg</span>
          <span className="text-sm text-slate-400">reste {Math.max(0, profile.targetWeight - currentWeight).toFixed(1)}kg</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500" style={{ width: `${progressPct}%` }} />
        </div>
        {weeksLeft > 0 && (
          <p className="text-xs text-slate-500 mt-2">
            À un rythme de prise propre (~0.35kg/semaine), encore environ {weeksLeft} semaines
            ({Math.round(weeksLeft / 4.3)} mois). Vérifie ta progression réelle chaque semaine — ça peut varier.
          </p>
        )}
      </div>

      <div className="bg-slate-800/60 rounded-2xl p-4">
        <h2 className="text-sm font-semibold text-slate-300 mb-2">Objectif calorique du jour</h2>
        <div className="text-3xl font-bold text-cyan-400">{targets.target} kcal</div>
        <div className="flex gap-4 mt-3 text-xs text-slate-400">
          <span>Protéines <b className="text-slate-200">{targets.proteinG}g</b></span>
          <span>Lipides <b className="text-slate-200">{targets.fatG}g</b></span>
          <span>Glucides <b className="text-slate-200">{targets.carbsG}g</b></span>
        </div>
      </div>

      <div className="bg-slate-800/60 rounded-2xl p-4">
        <h2 className="text-sm font-semibold text-slate-300 mb-1">Aujourd'hui</h2>
        <div className="text-lg font-bold text-white">{todayProgram.label}</div>
        <p className="text-sm text-slate-400">{todayProgram.focus}</p>
        {todayProgram.exercises.length > 0 && (
          <p className="text-xs text-slate-500 mt-2">{todayProgram.exercises.length} exercices</p>
        )}
      </div>
    </div>
  )
}
