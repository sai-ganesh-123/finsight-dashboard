import React from 'react'
import { useFinance } from '../context/FinanceContext'
import styles from './TopBar.module.css'

export default function TopBar() {
  const { role, setRole, theme, toggleTheme } = useFinance()

  return (
    <header className={styles.topbar}>
      <div className={styles.logo}>
        fin<span className={styles.dot}>.</span>sight
      </div>
      <div className={styles.right}>
        <span
          className={styles.roleBadge}
          data-role={role}
        >
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </span>
        <select
          className={styles.roleSelect}
          value={role}
          onChange={e => setRole(e.target.value)}
          aria-label="Switch role"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
        <button
          className={styles.themeBtn}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☽' : '☀'}
        </button>
      </div>
    </header>
  )
}
