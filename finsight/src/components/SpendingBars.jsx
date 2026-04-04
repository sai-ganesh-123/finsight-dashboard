import React from 'react'
import { useFinance } from '../context/FinanceContext'
import { getCategoryTotals, fmt } from '../utils/helpers'
import { CATEGORY_COLORS } from '../data/transactions'
import styles from './SpendingBars.module.css'

export default function SpendingBars() {
  const { transactions } = useFinance()
  const sorted = getCategoryTotals(transactions).slice(0, 6)
  const max = sorted[0]?.[1] || 1

  if (!sorted.length) {
    return <p className={styles.empty}>No expense data yet.</p>
  }

  return (
    <div className={styles.wrap}>
      {sorted.map(([cat, val]) => (
        <div key={cat} className={styles.row}>
          <div className={styles.label}>{cat}</div>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{
                width: `${(val / max * 100).toFixed(1)}%`,
                background: CATEGORY_COLORS[cat] || '#94a3b8',
              }}
            />
          </div>
          <div className={styles.val}>{fmt(val)}</div>
        </div>
      ))}
    </div>
  )
}
