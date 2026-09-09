import type { Profile } from '../types'
import { computeTargets } from '../lib/calc'
import { MEALS, BOOST_SHAKE, APPETITE_BOOSTERS, CHEAP_FOODS, type Meal } from '../data/nutrition'

interface Props {
  profile: Profile
  currentWeight: number
}

function MealCard({ meal }: { meal: Meal }) {
  const totalKcal = meal.items.reduce((sum, i) => sum + i.kcal, 0)
  const totalProtein = meal.items.reduce((sum, i) => sum + i.proteinG, 0)

  return (
    <div className="bg-slate-800/60 rounded-2xl p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-white">{meal.label}</h3>
          <p className="text-xs text-slate-400">{meal.description}</p>
        </div>
        <div className="text-right shrink-0 ml-2">
          <div className="text-cyan-400 font-bold">{totalKcal} kcal</div>
          <div className="text-xs text-slate-500">{totalProtein}g prot.</div>
        </div>
      </div>
      <ul className="mt-3 flex flex-col gap-1.5">
        {meal.items.map((item) => (
          <li key={item.name} className="flex justify-between text-sm">
            <span className="text-slate-300">
              {item.name} <span className="text-slate-500">— {item.quantity}</span>
            </span>
            <span className="text-slate-500 shrink-0 ml-2">{item.kcal} kcal</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Nutrition({ profile, currentWeight }: Props) {
  const targets = computeTargets(profile, currentWeight)
  const mealsTotal = MEALS.reduce((sum, m) => sum + m.items.reduce((s, i) => s + i.kcal, 0), 0)
  const gap = targets.target - mealsTotal

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-white">Nutrition</h1>
        <p className="text-sm text-slate-400">
          3 repas denses en calories plutôt que volumineux — pensés pour un appétit limité.
        </p>
      </div>

      <div className="bg-slate-800/40 rounded-2xl p-4 flex justify-between items-center">
        <div>
          <div className="text-xs text-slate-500">Objectif du jour</div>
          <div className="text-lg font-bold text-cyan-400">{targets.target} kcal</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">3 repas type</div>
          <div className="text-lg font-bold text-white">{mealsTotal} kcal</div>
        </div>
      </div>

      {gap > 150 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-sm text-amber-300">
          Il manque environ {Math.round(gap)} kcal pour atteindre ton objectif — ajoute le shake ci-dessous, ou une
          portion plus généreuse de féculent/huile d'olive à un des 3 repas.
        </div>
      )}

      <div className="flex flex-col gap-3">
        {MEALS.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>

      <div className="border-t border-slate-800 pt-4">
        <MealCard meal={BOOST_SHAKE} />
      </div>

      <div className="border-t border-slate-800 pt-4">
        <h2 className="text-base font-semibold text-white mb-1">Ouvrir l'appétit</h2>
        <p className="text-xs text-slate-500 mb-3">
          Usage traditionnel marocain, pas une prescription médicale — vérifie avec un médecin ou pharmacien si tu
          suis un traitement, ou si le manque d'appétit persiste plus de quelques semaines.
        </p>
        <div className="flex flex-col gap-2">
          {APPETITE_BOOSTERS.map((b) => (
            <div key={b.name} className="bg-slate-800/60 rounded-2xl p-4">
              <div className="flex items-baseline gap-2">
                <h3 className="font-semibold text-white text-sm">{b.name}</h3>
                <span className="text-xs text-cyan-400/80">{b.nameLocal}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{b.usage}</p>
              <p className="text-xs text-slate-500 mt-1">{b.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800 pt-4">
        <h2 className="text-base font-semibold text-white mb-1">Aliments pas chers</h2>
        <p className="text-xs text-slate-500 mb-3">
          Base courante et économique au Maroc — les prix varient selon la région et la saison, vérifie au souk ou
          en épicerie près de chez toi.
        </p>
        <div className="flex flex-col gap-2">
          {CHEAP_FOODS.map((f) => (
            <div key={f.name} className="bg-slate-800/40 rounded-xl px-4 py-3 flex justify-between items-start gap-3">
              <div>
                <div className="text-sm text-white font-medium">{f.name}</div>
                <div className="text-xs text-slate-500">{f.note}</div>
              </div>
              <span className="text-xs text-slate-400 bg-slate-800 rounded-full px-2 py-1 shrink-0">
                {f.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
