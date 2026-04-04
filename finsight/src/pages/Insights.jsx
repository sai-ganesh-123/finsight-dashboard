import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, Filler, Tooltip, Legend,
} from 'chart.js'
import { useFinance } from '../context/FinanceContext'
import { getMonthlyData, getCategoryTotals, fmt } from '../utils/helpers'
import { CATEGORY_COLORS, MONTHS } from '../data/transactions'
import styles from './Insights.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip, Legend)

function InsightCard({ label, value, desc, color }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardLabel}>{label}</div>
      <div className={styles.cardValue} style={color ? { color } : {}}>{value}</div>
      <div className={styles.cardDesc}>{desc}</div>
    </div>
  )
}

export default function Insights() {
  const { transactions, theme } = useFinance()
  const { months, inc, exp } = getMonthlyData(transactions)
  const catTotals = getCategoryTotals(transactions).slice(0, 6)

  const textColor = theme === 'dark' ? '#a8b0c8' : '#374151'
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'

  const topCat    = catTotals[0]?.[0] ?? 'N/A'
  const topAmt    = catTotals[0]?.[1] ?? 0
  const activeInc = inc.filter(v => v > 0)
  const activeExp = exp.filter(v => v > 0)
  const avgInc    = activeInc.length ? activeInc.reduce((s, v) => s + v, 0) / activeInc.length : 0
  const avgExp    = activeExp.length ? activeExp.reduce((s, v) => s + v, 0) / activeExp.length : 0
  const netLast   = inc[inc.length - 1] - exp[exp.length - 1]

  const trendData = {
    labels: months,
    datasets: [{
      label: 'Expenses',
      data: exp,
      borderColor: '#f87171',
      backgroundColor: 'rgba(248,113,113,0.08)',
      tension: 0.4,
      pointBackgroundColor: '#f87171',
      pointRadius: 4,
      fill: true,
    }],
  }

  const donutData = {
    labels: catTotals.map(([c]) => c),
    datasets: [{
      data: catTotals.map(([, v]) => Math.round(v)),
      backgroundColor: catTotals.map(([c]) => CATEGORY_COLORS[c] || '#94a3b8'),
      borderWidth: 0,
      hoverOffset: 6,
    }],
  }

  const lineOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor, callback: v => '$' + v.toLocaleString() }, grid: { color: gridColor } },
    },
  }

  const donutOpts = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right',
        labels: { color: textColor, font: { size: 11 }, boxWidth: 10, padding: 8 },
      },
    },
  }

  return (
    <div>
      <div className={styles.grid}>
        <InsightCard
          label="Top Spending Category"
          value={topCat}
          desc={`${fmt(topAmt)} total spent`}
          color={CATEGORY_COLORS[topCat]}
        />
        <InsightCard
          label="Avg Monthly Income"
          value={fmt(avgInc)}
          desc={`Across ${activeInc.length} months`}
        />
        <InsightCard
          label="Avg Monthly Expenses"
          value={fmt(avgExp)}
          desc={`Across ${activeExp.length} months`}
        />
        <InsightCard
          label={`${MONTHS[MONTHS.length - 1]} Net Savings`}
          value={(netLast >= 0 ? '+' : '') + fmt(netLast)}
          desc="Latest month income vs expenses"
          color={netLast >= 0 ? 'var(--accent)' : 'var(--accent4)'}
        />
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Monthly Expense Trend</div>
          <div className={styles.chartWrap}>
            <Line data={trendData} options={lineOpts} />
          </div>
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Category Breakdown</div>
          <div className={styles.chartWrap}>
            <Doughnut data={donutData} options={donutOpts} />
          </div>
        </div>
      </div>
    </div>
  )
}
