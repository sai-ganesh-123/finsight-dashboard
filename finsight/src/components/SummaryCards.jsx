import React from 'react'
import { useFinance } from '../context/FinanceContext'
import { fmt } from '../utils/helpers'
import styles from './SummaryCards.module.css'

function Card({ label, value, sub, subPositive, accent }) {
  return (
    <div className={`${styles.card} ${styles[accent]}`}>
      <div className={styles.bar} />
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      <div className={`${styles.sub} ${subPositive ? styles.pos : styles.neg}`}>{sub}</div>
    </div>
  )
}

export default function SummaryCards() {
  const { income, expense, balance, savingsRate } = useFinance()

  return (
    <div className={styles.grid}>
      <Card
        label="Total Balance"
        value={fmt(balance)}
        sub={balance >= 0 ? 'Positive net' : 'Negative net'}
        subPositive={balance >= 0}
        accent="green"
      />
      <Card
        label="Total Income"
        value={fmt(income)}
        sub={`+${income.toLocaleString()}`}
        subPositive
        accent="blue"
      />
      <Card
        label="Total Expenses"
        value={fmt(expense)}
        sub={`-${expense.toLocaleString()}`}
        subPositive={false}
        accent="red"
      />
      <Card
        label="Savings Rate"
        value={`${savingsRate}%`}
        sub={savingsRate > 20 ? 'Healthy' : 'Below 20%'}
        subPositive={savingsRate > 20}
        accent="amber"
      />
    </div>
  )
}
