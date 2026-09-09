import type { WeightEntry } from '../types'

interface Props {
  entries: WeightEntry[]
  targetWeight: number
}

export function WeightChart({ entries, targetWeight }: Props) {
  if (entries.length === 0) {
    return <p className="text-sm text-slate-400">Ajoute une première pesée pour voir ta courbe.</p>
  }

  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date))
  const weights = sorted.map((e) => e.weight)
  const minW = Math.min(...weights, targetWeight) - 1
  const maxW = Math.max(...weights, targetWeight) + 1
  const width = 320
  const height = 160
  const padding = 24

  const xFor = (i: number) =>
    sorted.length === 1
      ? width / 2
      : padding + (i / (sorted.length - 1)) * (width - padding * 2)
  const yFor = (w: number) =>
    height - padding - ((w - minW) / (maxW - minW || 1)) * (height - padding * 2)

  const points = sorted.map((e, i) => `${xFor(i)},${yFor(e.weight)}`).join(' ')
  const targetY = yFor(targetWeight)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <line
        x1={padding}
        y1={targetY}
        x2={width - padding}
        y2={targetY}
        stroke="#334155"
        strokeDasharray="4 4"
        strokeWidth={1}
      />
      <text x={width - padding} y={targetY - 6} textAnchor="end" fontSize="9" fill="#64748b">
        objectif {targetWeight}kg
      </text>
      <polyline points={points} fill="none" stroke="#22d3ee" strokeWidth={2} />
      {sorted.map((e, i) => (
        <circle key={e.date} cx={xFor(i)} cy={yFor(e.weight)} r={3} fill="#22d3ee" />
      ))}
    </svg>
  )
}
