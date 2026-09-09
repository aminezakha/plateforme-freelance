import { useState } from 'react'
import type { Profile } from '../types'
import { ACTIVITY_LABELS } from '../lib/calc'

interface Props {
  initial: Profile
  onSave: (profile: Profile) => void
  standalone?: boolean
}

export function ProfileForm({ initial, onSave, standalone }: Props) {
  const [form, setForm] = useState<Profile>(initial)

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSave(form)
      }}
    >
      {standalone && (
        <div>
          <h1 className="text-xl font-semibold text-white">Ton profil</h1>
          <p className="text-sm text-slate-400 mt-1">
            Ces infos servent juste à calculer tes besoins caloriques (formule Mifflin-St Jeor). Rien n'est envoyé
            nulle part, tout reste sur ton téléphone.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 min-w-0">
        <label className="flex flex-col gap-1 text-sm text-slate-300 min-w-0">
          Genre
          <select
            className="w-full min-w-0 bg-slate-800 rounded-lg px-3 py-2 text-white"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value as Profile['gender'] })}
          >
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300 min-w-0">
          Âge
          <input
            type="number"
            className="w-full min-w-0 bg-slate-800 rounded-lg px-3 py-2 text-white"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
            min={14}
            max={80}
            required
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm text-slate-300 min-w-0">
        Taille (cm)
        <input
          type="number"
          className="w-full min-w-0 bg-slate-800 rounded-lg px-3 py-2 text-white"
          value={form.heightCm}
          onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) })}
          min={120}
          max={230}
          required
        />
      </label>

      <div className="grid grid-cols-2 gap-3 min-w-0">
        <label className="flex flex-col gap-1 text-sm text-slate-300 min-w-0">
          Poids actuel (kg)
          <input
            type="number"
            step="0.1"
            className="w-full min-w-0 bg-slate-800 rounded-lg px-3 py-2 text-white"
            value={form.startWeight}
            onChange={(e) => setForm({ ...form, startWeight: Number(e.target.value) })}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300 min-w-0">
          Objectif (kg)
          <input
            type="number"
            step="0.1"
            className="w-full min-w-0 bg-slate-800 rounded-lg px-3 py-2 text-white"
            value={form.targetWeight}
            onChange={(e) => setForm({ ...form, targetWeight: Number(e.target.value) })}
            required
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm text-slate-300 min-w-0">
        Niveau d'activité (en dehors de la muscu)
        <select
          className="w-full min-w-0 bg-slate-800 rounded-lg px-3 py-2 text-white"
          value={form.activityLevel}
          onChange={(e) => setForm({ ...form, activityLevel: e.target.value as Profile['activityLevel'] })}
        >
          {Object.entries(ACTIVITY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="mt-2 bg-cyan-500 text-slate-900 font-semibold rounded-lg py-3 active:scale-95 transition"
      >
        Enregistrer
      </button>
    </form>
  )
}
