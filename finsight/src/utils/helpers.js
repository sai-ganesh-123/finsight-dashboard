import { MONTH_KEYS, MONTHS } from '../data/transactions'

export function fmt(n) {
  return '$' + Math.abs(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function getMonthlyData(transactions) {
  const inc = MONTH_KEYS.map(m =>
    transactions.filter(t => t.type === 'income'  && t.date.startsWith(m)).reduce((s, t) => s + t.amount, 0)
  )
  const exp = MONTH_KEYS.map(m =>
    transactions.filter(t => t.type === 'expense' && t.date.startsWith(m)).reduce((s, t) => s + t.amount, 0)
  )
  return { months: MONTHS, inc, exp }
}

export function getCategoryTotals(transactions) {
  const cats = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    cats[t.category] = (cats[t.category] || 0) + t.amount
  })
  return Object.entries(cats).sort((a, b) => b[1] - a[1])
}

export function exportToCSV(transactions) {
  const rows = [
    ['Date', 'Description', 'Category', 'Type', 'Amount'],
    ...transactions.map(t => [t.date, t.desc, t.category, t.type, t.amount]),
  ]
  const csv = rows.map(r => r.join(',')).join('\n')
  const a = document.createElement('a')
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
  a.download = 'finsight_transactions.csv'
  a.click()
}
