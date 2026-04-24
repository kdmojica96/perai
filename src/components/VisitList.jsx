import { useState } from 'react'
import { ROOMS, PERIODS } from '../data'

export default function VisitList({ visits, onDelete }) {
  const [filterRoom, setFilterRoom] = useState('')
  const [filterPeriod, setFilterPeriod] = useState('')

  const filtered = visits.filter(v => {
    if (filterRoom && v.room !== filterRoom) return false
    if (filterPeriod && v.period !== filterPeriod) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  )

  return (
    <div className="visit-list">
      <h2>Visit History</h2>
      <div className="filters">
        <select value={filterRoom} onChange={e => setFilterRoom(e.target.value)}>
          <option value="">All Rooms</option>
          {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={filterPeriod} onChange={e => setFilterPeriod(e.target.value)}>
          <option value="">All Periods</option>
          {PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        {(filterRoom || filterPeriod) && (
          <button className="clear-btn" onClick={() => { setFilterRoom(''); setFilterPeriod('') }}>
            Clear Filters
          </button>
        )}
      </div>

      {sorted.length === 0 ? (
        <p className="empty">No visits recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Room</th>
              <th>Period</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(v => (
              <tr key={v.id}>
                <td>{v.date}</td>
                <td>{v.room}</td>
                <td>{v.period}</td>
                <td>
                  <button className="delete-btn" onClick={() => onDelete(v.id)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="count">{sorted.length} visit{sorted.length !== 1 ? 's' : ''}</p>
    </div>
  )
}
