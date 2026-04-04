import React from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Filler, Tooltip, Legend,
} from 'chart.js'
import { useFinance } from '../context/FinanceContext'
import { getMonthlyData } from '../utils/helpers'
import SummaryCards from '../components/SummaryCards'
import SpendingBars from '../components/SpendingBars'
import styles from './Dashboard.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler, Tooltip, Legend)

function chartColors(theme) {
  return {
    text:  theme === 'dark' ? '#a8b0c8' : '#374151',
    grid:  theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
  }
}

export default function Dashboard() {
  const { transactions, theme } = useFinance()
  const { months, inc, exp } = getMonthlyData(transactions)
  const { text, grid } = chartColors(theme)

  let bal = 2000
  const balTrend = inc.map((v, i) => { bal += v - exp[i]; return Math.round(bal) })

  const trendData = {
    labels: months,
    datasets: [{
      label: 'Balance',
      data: balTrend,
      borderColor: '#4ade80',
      backgroundColor: 'rgba(74,222,128,0.08)',
      tension: 0.4,
      pointBackgroundColor: '#4ade80',
      pointRadius: 4,
      fill: true,
    }],
  }

  const barData = {
    labels: months,
    datasets: [
      { label: 'Income',   data: inc, backgroundColor: 'rgba(74,222,128,0.75)', borderRadius: 4 },
      { label: 'Expenses', data: exp, backgroundColor: 'rgba(248,113,113,0.75)', borderRadius: 4 },
    ],
  }

  const axisOpts = (prefix = '$') => ({
    ticks: { color: text, callback: v => prefix + v.toLocaleString() },
    grid:  { color: grid },
  })

  const baseOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  }

  return (
    <div>
      <SummaryCards />

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Balance Trend — 6 Months</div>
          <div className={styles.chartWrap}>
            <Line data={trendData} options={{ ...baseOpts, scales: { x: axisOpts(''), y: axisOpts() } }} />
          </div>
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Spending by Category</div>
          <SpendingBars />
        </div>
      </div>

      <div className={styles.chartCard}>
        <div className={styles.chartTitle}>Monthly Income vs Expenses</div>
        <div className={styles.chartLegend}>
          <span><span style={{ background: 'rgba(74,222,128,0.75)' }} />Income</span>
          <span><span style={{ background: 'rgba(248,113,113,0.75)' }} />Expenses</span>
        </div>
        <div className={styles.chartWrap}>
          <Bar data={barData} options={{ ...baseOpts, scales: { x: axisOpts(''), y: axisOpts() } }} />
        </div>
      </div>
    </div>
  )
}
