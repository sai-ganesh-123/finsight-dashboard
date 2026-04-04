import React, { useState, useMemo } from 'react'
import { useFinance } from '../context/FinanceContext'
import { fmt, exportToCSV } from '../utils/helpers'
import { CATEGORY_COLORS } from '../data/transactions'
import AddTransactionModal from '../components/AddTransactionModal'
import styles from './Transactions.module.css'

export default function Transactions() {
  const { transactions, deleteTransaction, role } = useFinance()
  const isAdmin = role === 'admin'

  const [search,     setSearch]     = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterCat,  setFilterCat]  = useState('')
  const [sortBy,     setSortBy]     = useState('date-desc')
  const [showModal,  setShowModal]  = useState(false)

  const categories = useMemo(() => [...new Set(transactions.map(t => t.category))].sort(), [transactions])

  const filtered = useMemo(() => {
    let data = transactions.filter(t => {
      if (filterType && t.type !== filterType) return false
      if (filterCat  && t.category !== filterCat) return false
      if (search && !t.desc.toLowerCase().includes(search.toLowerCase()) &&
          !t.category.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    if      (sortBy === 'date-desc')   data = [...data].sort((a, b) => b.date.localeCompare(a.date))
    else if (sortBy === 'date-asc')    data = [...data].sort((a, b) => a.date.localeCompare(b.date))
    else if (sortBy === 'amount-desc') data = [...data].sort((a, b) => b.amount - a.amount)
    else if (sortBy === 'amount-asc')  data = [...data].sort((a, b) => a.amount - b.amount)
    return data
  }, [transactions, search, filterType, filterCat, sortBy])

  return (
    <div>
      <div className={styles.toolbar}>
        <input
          className={styles.searchInput}
          placeholder="Search transactions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className={styles.select} value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select className={styles.select} value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className={styles.select} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Amount High</option>
          <option value="amount-asc">Amount Low</option>
        </select>
        <button className={styles.exportBtn} onClick={() => exportToCSV(transactions)}>Export CSV</button>
        {isAdmin && (
          <button className={styles.addBtn} onClick={() => setShowModal(true)}>+ Add</button>
        )}
      </div>

      <div className={styles.tableWrap}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>◌</div>
            <p>No transactions found</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th onClick={() => setSortBy(sortBy === 'amount-desc' ? 'amount-asc' : 'amount-desc')} className={styles.sortable}>
                  Amount {sortBy.startsWith('amount') ? (sortBy === 'amount-desc' ? '↓' : '↑') : ''}
                </th>
                <th>Type</th>
                {isAdmin && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td className={styles.mono}>{t.date}</td>
                  <td>{t.desc}</td>
                  <td>
                    <span className={styles.catWrap}>
                      <span
                        className={styles.catDot}
                        style={{ background: CATEGORY_COLORS[t.category] || '#94a3b8' }}
                      />
                      {t.category}
                    </span>
                  </td>
                  <td className={styles.mono} style={{ color: t.type === 'income' ? 'var(--accent)' : 'var(--accent4)' }}>
                    {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles[t.type]}`}>{t.type}</span>
                  </td>
                  {isAdmin && (
                    <td>
                      <button className={styles.deleteBtn} onClick={() => deleteTransaction(t.id)} title="Delete">×</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
