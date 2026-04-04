import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { SEED_TRANSACTIONS } from '../data/transactions'

const FinanceContext = createContext(null)

const STORAGE_KEY = 'finsight_txns'

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : [...SEED_TRANSACTIONS]
    } catch {
      return [...SEED_TRANSACTIONS]
    }
  })

  const [role, setRole] = useState('admin')
  const [theme, setTheme] = useState('dark')
  const [nextId, setNextId] = useState(100)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    } catch { /* storage unavailable */ }
  }, [transactions])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const addTransaction = useCallback((txn) => {
    setTransactions(prev => [...prev, { ...txn, id: nextId }])
    setNextId(id => id + 1)
  }, [nextId])

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }, [])

  // Derived summary stats
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance = income - expense
  const savingsRate = income > 0 ? ((income - expense) / income * 100).toFixed(1) : 0

  return (
    <FinanceContext.Provider value={{
      transactions, addTransaction, deleteTransaction,
      role, setRole,
      theme, toggleTheme,
      income, expense, balance, savingsRate,
    }}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const ctx = useContext(FinanceContext)
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider')
  return ctx
}
