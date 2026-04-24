import { useState, useEffect } from 'react'
import AddVisit from './components/AddVisit'
import VisitList from './components/VisitList'

const STORAGE_KEY = 'room-tracker-visits'

export default function App() {
  const [visits, setVisits] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visits))
  }, [visits])

  function addVisit(visit) {
    setVisits(prev => [visit, ...prev])
  }

  function deleteVisit(id) {
    setVisits(prev => prev.filter(v => v.id !== id))
  }

  return (
    <div className="app">
      <header>
        <h1>Room Tracker</h1>
        <p>Track which rooms you visit and when</p>
      </header>
      <main>
        <AddVisit onAdd={addVisit} />
        <VisitList visits={visits} onDelete={deleteVisit} />
      </main>
    </div>
  )
}
