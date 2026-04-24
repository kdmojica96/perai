import { useState } from 'react'
import { ROOMS, PERIODS } from '../data'

export default function AddVisit({ onAdd }) {
  const today = new Date().toISOString().split('T')[0]
  const [room, setRoom] = useState('')
  const [period, setPeriod] = useState('')
  const [date, setDate] = useState(today)

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

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Log a Visit</h2>
      <div className="form-row">
        <label>
          Room
          <select value={room} onChange={e => setRoom(e.target.value)} required>
            <option value="">Select a room</option>
            {ROOMS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
        <label>
          Period
          <select value={period} onChange={e => setPeriod(e.target.value)} required>
            <option value="">Select a period</option>
            {PERIODS.map(p => (
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
