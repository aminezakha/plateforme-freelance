import { useState } from 'react'
import { useLocalStorage } from './lib/storage'
import type { Profile, SessionLog, WeightEntry } from './types'
import { TabBar, type Tab } from './components/TabBar'
import { Dashboard } from './components/Dashboard'
import { Training } from './components/Training'
import { Nutrition } from './components/Nutrition'
import { Progress } from './components/Progress'
import { ProfileForm } from './components/ProfileForm'

const DEFAULT_PROFILE: Profile = {
  gender: 'homme',
  age: 25,
  heightCm: 175,
  startWeight: 72,
  targetWeight: 82,
  activityLevel: 'modere',
}

function App() {
  const [profile, setProfile] = useLocalStorage<Profile | null>('profile', null)
  const [weightEntries, setWeightEntries] = useLocalStorage<WeightEntry[]>('weightEntries', [])
  const [sessionLogs, setSessionLogs] = useLocalStorage<SessionLog[]>('sessionLogs', [])
  const [tab, setTab] = useState<Tab>('dashboard')

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <ProfileForm
            standalone
            initial={DEFAULT_PROFILE}
            onSave={(p) => {
              setProfile(p)
              setWeightEntries([{ date: new Date().toISOString().slice(0, 10), weight: p.startWeight }])
            }}
          />
        </div>
      </div>
    )
  }

  const currentWeight = weightEntries.length
    ? [...weightEntries].sort((a, b) => b.date.localeCompare(a.date))[0].weight
    : profile.startWeight

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <div className="max-w-md mx-auto px-5 pt-8 pb-28">
        {tab === 'dashboard' && <Dashboard profile={profile} weightEntries={weightEntries} />}
        {tab === 'training' && <Training sessionLogs={sessionLogs} setSessionLogs={setSessionLogs} />}
        {tab === 'nutrition' && <Nutrition profile={profile} currentWeight={currentWeight} />}
        {tab === 'progress' && (
          <Progress profile={profile} weightEntries={weightEntries} setWeightEntries={setWeightEntries} />
        )}
        {tab === 'profile' && <ProfileForm initial={profile} onSave={setProfile} standalone />}
      </div>
      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}

export default App
