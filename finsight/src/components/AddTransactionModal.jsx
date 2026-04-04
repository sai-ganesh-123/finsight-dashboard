import React, { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { CATEGORIES } from '../data/transactions'
import styles from './AddTransactionModal.module.css'

export default function AddTransactionModal({ onClose }) {
  const { addTransaction } = useFinance()
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    desc: '', amount: '', type: 'expense', category: 'Food', date: today,
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit() {
    if (!form.desc.trim())       return setError('Description is required.')
    if (!form.amount || parseFloat(form.amount) <= 0) return setError('Enter a valid amount.')
    if (!form.date)              return setError('Date is required.')
    addTransaction({ ...form, amount: parseFloat(form.amount) })
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Add transaction">
        <h3 className={styles.title}>Add Transaction</h3>

        <div className={styles.group}>
          <label className={styles.label}>Description</label>
          <input name="desc" value={form.desc} onChange={handleChange} placeholder="e.g. Grocery run" className={styles.input} />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Amount ($)</label>
          <input name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={handleChange} placeholder="0.00" className={styles.input} />
        </div>
        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Type</label>
            <select name="type" value={form.type} onChange={handleChange} className={styles.input}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} className={styles.input}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} className={styles.input} />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.btns}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={handleSubmit}>Save Transaction</button>
        </div>
      </div>
    </div>
  )
}
