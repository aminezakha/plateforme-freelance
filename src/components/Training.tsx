import { useMemo, useState } from 'react'
import { PROGRAM, TRAINING_TIPS } from '../data/program'
import type { ExerciseLog, SessionLog, SetLog } from '../types'

interface Props {
  sessionLogs: SessionLog[]
  setSessionLogs: (logs: SessionLog[]) => void
}

function todayDayIndex() {
  const jsDay = new Date().getDay()
  return (jsDay + 6) % 7
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function lastLogFor(logs: SessionLog[], dayId: string): SessionLog | undefined {
  return [...logs].filter((l) => l.dayId === dayId).sort((a, b) => b.date.localeCompare(a.date))[0]
}

export function Training({ sessionLogs, setSessionLogs }: Props) {
  const [selectedDayId, setSelectedDayId] = useState(PROGRAM[todayDayIndex()].id)
  const day = PROGRAM.find((d) => d.id === selectedDayId)!
  const lastLog = useMemo(() => lastLogFor(sessionLogs, day.id), [sessionLogs, day.id])

  const [draft, setDraft] = useState<Record<string, SetLog[]>>({})

  const setsFor = (exerciseId: string, defaultCount: number): SetLog[] => {
    if (draft[exerciseId]) return draft[exerciseId]
    const last = lastLog?.exercises.find((e) => e.exerciseId === exerciseId)
    if (last) return last.sets
    return Array.from({ length: defaultCount }, () => ({ reps: 0, weight: 0 }))
  }

  const updateSet = (exerciseId: string, index: number, field: keyof SetLog, value: number, defaultCount: number) => {
    const current = setsFor(exerciseId, defaultCount)
    const next = current.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    setDraft({ ...draft, [exerciseId]: next })
  }

  const saveSession = () => {
    const exercises: ExerciseLog[] = day.exercises
      .map((ex) => ({ exerciseId: ex.id, sets: setsFor(ex.id, ex.sets) }))
      .filter((e) => e.sets.some((s) => s.weight > 0 || s.reps > 0))

    if (exercises.length === 0) return

    const filtered = sessionLogs.filter((l) => !(l.date === todayISO() && l.dayId === day.id))
    setSessionLogs([...filtered, { date: todayISO(), dayId: day.id, exercises }])
    setDraft({})
  }

  const isRestDay = day.exercises.length === 0

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-white">Entraînement</h1>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {PROGRAM.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setSelectedDayId(d.id)}
            className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition ${
              d.id === selectedDayId
                ? 'bg-cyan-500 text-slate-900'
                : i === todayDayIndex()
                  ? 'bg-slate-700 text-cyan-300'
                  : 'bg-slate-800 text-slate-400'
            }`}
          >
            {d.label.replace(/^Jour \d+ — /, '')}
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-bold text-white">{day.label}</h2>
        <p className="text-sm text-slate-400">{day.focus}</p>
      </div>

      {isRestDay ? (
        <div className="bg-slate-800/60 rounded-2xl p-4 text-sm text-slate-300">
          Jour de repos. La récupération fait partie de la prise de muscle — profites-en pour bien manger et dormir.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {day.exercises.map((ex) => {
            const sets = setsFor(ex.id, ex.sets)
            return (
              <div key={ex.id} className="bg-slate-800/60 rounded-2xl p-4">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-semibold text-white text-sm">{ex.name}</h3>
                    <p className="text-xs text-slate-400">
                      {ex.sets} séries × {ex.reps}
                    </p>
                  </div>
                </div>
                {ex.note && <p className="text-xs text-cyan-400/80 mt-1">{ex.note}</p>}

                <div className="mt-3 flex flex-col gap-2">
                  <div className="grid grid-cols-[auto_1fr_1fr] gap-2 text-xs text-slate-500 px-1">
                    <span>Série</span>
                    <span>Poids (kg)</span>
                    <span>Reps</span>
                  </div>
                  {sets.map((s, i) => (
                    <div key={i} className="grid grid-cols-[auto_1fr_1fr] gap-2 items-center">
                      <span className="text-xs text-slate-500 w-5">{i + 1}</span>
                      <input
                        type="number"
                        inputMode="decimal"
                        className="min-w-0 w-full bg-slate-900 rounded-lg px-2 py-2 text-white text-sm"
                        value={s.weight || ''}
                        placeholder="0"
                        onChange={(e) => updateSet(ex.id, i, 'weight', Number(e.target.value), ex.sets)}
                      />
                      <input
                        type="number"
                        inputMode="numeric"
                        className="min-w-0 w-full bg-slate-900 rounded-lg px-2 py-2 text-white text-sm"
                        value={s.reps || ''}
                        placeholder="0"
                        onChange={(e) => updateSet(ex.id, i, 'reps', Number(e.target.value), ex.sets)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          <button
            onClick={saveSession}
            className="bg-cyan-500 text-slate-900 font-semibold rounded-xl py-3 active:scale-95 transition"
          >
            Enregistrer la séance
          </button>
        </div>
      )}

      <div className="bg-slate-800/40 rounded-2xl p-4 mt-2">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">Conseils</h3>
        <ul className="flex flex-col gap-2">
          {TRAINING_TIPS.map((tip) => (
            <li key={tip} className="text-xs text-slate-400 leading-relaxed">
              • {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
