import React, { useState } from 'react'
import { FinanceProvider } from './context/FinanceContext'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import styles from './App.module.css'

const PAGES = [
  { key: 'dashboard',    label: 'Overview' },
  { key: 'transactions', label: 'Transactions' },
  { key: 'insights',     label: 'Insights' },
]

function AppInner() {
  const [page, setPage] = useState('dashboard')

  return (
    <div className={styles.app}>
      <TopBar />

      <nav className={styles.nav}>
        {PAGES.map(p => (
          <button
            key={p.key}
            className={`${styles.navBtn} ${page === p.key ? styles.active : ''}`}
            onClick={() => setPage(p.key)}
          >
            {p.label}
          </button>
        ))}
      </nav>

      <main className={styles.main}>
        {page === 'dashboard'    && <Dashboard />}
        {page === 'transactions' && <Transactions />}
        {page === 'insights'     && <Insights />}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <FinanceProvider>
      <AppInner />
    </FinanceProvider>
  )
}
