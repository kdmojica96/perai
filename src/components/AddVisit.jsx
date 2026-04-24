import { useState } from 'react'
import { ROOMS, PERIODS } from '../data'

export default function AddVisit({ visits, onAdd }) {
  const today = new Date().toISOString().split('T')[0]
  const [room, setRoom] = useState('')
  const [period, setPeriod] = useState('')
  const [date, setDate] = useState(today)

  const visited = new Set(visits.map(v => `${v.room}|${v.period}`))
  const total = ROOMS.length * PERIODS.length
  const done = visited.size

  // Rooms where every period is already logged — hide them entirely
  const availableRooms = ROOMS.filter(r => {
    if (PERIODS.every(p => visited.has(`${r}|${p}`))) return false
    if (period && visited.has(`${r}|${period}`)) return false
    return true
  })

  // Periods where every room is already logged — hide them entirely
  const availablePeriods = PERIODS.filter(p => {
    if (ROOMS.every(r => visited.has(`${r}|${p}`))) return false
    if (room && visited.has(`${room}|${p}`)) return false
    return true
  })

  function handleRoomChange(e) {
    const newRoom = e.target.value
    setRoom(newRoom)
    if (period && visited.has(`${newRoom}|${period}`)) setPeriod('')
  }

  function handlePeriodChange(e) {
    const newPeriod = e.target.value
    setPeriod(newPeriod)
    if (room && visited.has(`${room}|${newPeriod}`)) setRoom('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!room || !period) return
    onAdd({
      id: crypto.randomUUID(),
      room,
      period,
      date,
      createdAt: new Date().toISOString(),
    })
    setRoom('')
    setPeriod('')
    setDate(today)
  }

  const pct = Math.round((done / total) * 100)

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Log a Visit</h2>
        <span className="progress-badge">{done} / {total} combinations ({pct}%)</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="form-row">
        <label>
          Room
          <select value={room} onChange={handleRoomChange} required>
            <option value="">Select a room</option>
            {availableRooms.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
        <label>
          Period
          <select value={period} onChange={handlePeriodChange} required>
            <option value="">Select a period</option>
            {availablePeriods.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Add Visit</button>
    </form>
  )
}
