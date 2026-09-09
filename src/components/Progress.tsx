import { useState } from 'react'
import type { Profile, WeightEntry } from '../types'
import { WeightChart } from './WeightChart'

interface Props {
  profile: Profile
  weightEntries: WeightEntry[]
  setWeightEntries: (entries: WeightEntry[]) => void
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function Progress({ profile, weightEntries, setWeightEntries }: Props) {
  const [newWeight, setNewWeight] = useState('')
  const sorted = [...weightEntries].sort((a, b) => b.date.localeCompare(a.date))

  const addEntry = () => {
    const w = Number(newWeight)
    if (!w || w <= 0) return
    const date = todayISO()
    const filtered = weightEntries.filter((e) => e.date !== date)
    setWeightEntries([...filtered, { date, weight: w }])
    setNewWeight('')
  }

  const deleteEntry = (date: string) => {
    setWeightEntries(weightEntries.filter((e) => e.date !== date))
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold text-white">Progression</h1>

      <div className="bg-slate-800/60 rounded-2xl p-4">
        <WeightChart entries={weightEntries} targetWeight={profile.targetWeight} />
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          step="0.1"
          inputMode="decimal"
          placeholder="Poids du jour (kg)"
          className="flex-1 min-w-0 bg-slate-800 rounded-lg px-3 py-2 text-white"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
        />
        <button
          onClick={addEntry}
          className="bg-cyan-500 text-slate-900 font-semibold rounded-lg px-4 active:scale-95 transition"
        >
          Ajouter
        </button>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-300 mb-2">Historique</h2>
        {sorted.length === 0 && <p className="text-sm text-slate-500">Aucune pesée enregistrée.</p>}
        <div className="flex flex-col gap-1.5">
          {sorted.map((e) => (
            <div
              key={e.date}
              className="flex justify-between items-center bg-slate-800/40 rounded-xl px-4 py-2.5"
            >
              <span className="text-sm text-slate-300">
                {new Date(e.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white">{e.weight}kg</span>
                <button onClick={() => deleteEntry(e.date)} className="text-slate-600 text-xs">
                  supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Conseil : pèse-toi le matin à jeun, dans les mêmes conditions, 1 à 2 fois par semaine. Le poids fluctue
        d'un jour à l'autre (eau, digestion) — regarde la tendance sur plusieurs semaines, pas une seule pesée.
      </p>
    </div>
  )
}
