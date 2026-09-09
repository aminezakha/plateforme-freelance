export type Tab = 'dashboard' | 'training' | 'nutrition' | 'progress' | 'profile'

interface Props {
  active: Tab
  onChange: (tab: Tab) => void
}

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Accueil', icon: '🏠' },
  { id: 'training', label: 'Muscu', icon: '🏋️' },
  { id: 'nutrition', label: 'Nutrition', icon: '🍽️' },
  { id: 'progress', label: 'Progrès', icon: '📈' },
  { id: 'profile', label: 'Profil', icon: '⚙️' },
]

export function TabBar({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto grid grid-cols-5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex flex-col items-center gap-0.5 py-2.5 text-xs transition ${
              active === tab.id ? 'text-cyan-400' : 'text-slate-500'
            }`}
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
