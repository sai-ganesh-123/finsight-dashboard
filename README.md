# 📈 fin.insight — Finance Dashboard

A clean, interactive finance dashboard built with **React + Vite** for tracking financial activity, visualizing spending patterns, and managing transactions with role-based access control.

---

## 👁️‍🗨️ Live Preview

https://finsight-dashboard-mocha.vercel.app/

---

## ✨ Features

### 📊 Dashboard Overview

- **4 Summary Cards** — Total Balance, Income, Expenses, and Savings Rate with animated entrance
- **Balance Trend Chart** — 6-month line chart showing cumulative balance over time
- **Income vs Expenses Bar Chart** — Monthly side-by-side comparison
- **Category Spending Bars** — Horizontal bar breakdown of top expense categories

### 💳 Transactions

- Full transaction table with **Date, Description, Category, Amount, Type**
- **Search** by description or category
- **Filter** by type (Income / Expense) and category
- **Sort** by date (newest/oldest) or amount (high/low)
- **Delete** transactions (Admin only)
- **Export to CSV** — one-click download of all transactions

### 💡 Insights

- Top spending category with total amount
- Average monthly income and expenses
- Latest month net savings with positive/negative indicator
- Monthly expense trend line chart
- Doughnut chart for category breakdown

### 🔐 Role-Based UI

- **Admin** — can add and delete transactions, full access
- **Viewer** — read-only mode, add/delete controls hidden
- Switch roles instantly via the top-right dropdown 

### ⭐ Additional Enhancements

- **Dark / Light mode toggle** — persists via CSS variables
- **Local Storage persistence** — transactions survive page refresh
- **Responsive design** — works on mobile, tablet, and desktop
- **Animated cards** — staggered entrance animations on load
- **Empty state handling** — graceful UI when no data matches filters

---

## 🛠️ Tech Stack

| Layer       | Choice                       |
| ----------- | ---------------------------- |
| Framework   | React 18                     |
| Bundler     | Vite 5                       |
| Charts      | Chart.js + react-chartjs-2   |
| Styling     | CSS Modules + CSS Variables  |
| State       | React Context API + useState |
| Persistence | localStorage                 |
| Fonts       | Syne (display) + DM Mono     |

---

## 📂 Project Structure

```
fin.insight/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── TopBar.jsx              # Header with role switcher & theme toggle
│   │   ├── TopBar.module.css
│   │   ├── SummaryCards.jsx        # 4 KPI cards
│   │   ├── SummaryCards.module.css
│   │   ├── SpendingBars.jsx        # Horizontal category bars
│   │   ├── SpendingBars.module.css
│   │   ├── AddTransactionModal.jsx # Modal form for adding transactions
│   │   └── AddTransactionModal.module.css
│   ├── context/
│   │   └── FinanceContext.jsx      # Global state (transactions, role, theme)
│   ├── data/
│   │   └── transactions.js         # Seed data + constants
│   ├── pages/
│   │   ├── Dashboard.jsx           # Overview page with charts
│   │   ├── Dashboard.module.css
│   │   ├── Transactions.jsx        # Transaction table with filters
│   │   ├── Transactions.module.css
│   │   ├── Insights.jsx            # Insights + analytics charts
│   │   └── Insights.module.css
│   ├── utils/
│   │   └── helpers.js              # fmt(), getMonthlyData(), exportToCSV()
│   ├── App.jsx                     # Root component + navigation
│   ├── App.module.css
│   ├── index.css                   # Global styles + CSS variables
│   └── main.jsx                    # React entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 📌 Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/fin-insight.git
cd fin-insight

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 📦 Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🧠 State Management Approach

All global application state is managed through a single **React Context** called `FinanceContext`. This was chosen over external libraries like Redux or Zustand because the application state is straightforward and does not require middleware, async thunks, or complex selectors.
 
The context handles:
 
- **Transactions** — initialised from localStorage on first load, falling back to seed data if nothing is stored. Any add or delete operation immediately saves back to localStorage via a `useEffect`.
- **Role** — stored as a simple string (`admin` or `viewer`). Controls which UI elements are visible.
- **Theme** — stored as a simple string (`dark` or `light`). Applies a `data-theme` attribute to the root element which CSS custom properties respond to.
- **Derived stats** — `income`, `expense`, `balance`, and `savingsRate` are calculated directly from the transactions array inside the context. There is no separate state for these values, which eliminates the risk of them going out of sync.
 
Page-level UI state such as search query, active filters, sort order, and modal visibility is kept **local** inside each page component using `useState`. This keeps the global context lean and focused only on data that needs to be shared across pages.

---

## 🔐 Role-Based UI

| Feature            | Admin | Viewer |
| ------------------ | ----- | ------ |
| View dashboard     | ✅    | ✅     |
| View transactions  | ✅    | ✅     |
| View insights      | ✅    | ✅     |
| Add transaction    | ✅    | ❌     |
| Delete transaction | ✅    | ❌     |
| Export CSV         | ✅    | ✅     |

Switch roles using the dropdown in the top-right corner.

---

## 🎨 Design Decisions

- **CSS Modules** were chosen over Tailwind for full control over CSS variables and theme switching without a build-time compiler.
- **Chart.js** via `react-chartjs-2` gives rich, accessible charts with minimal bundle overhead.
- **No routing library** — tab-based navigation is handled with a simple `useState` string, keeping the dependency footprint small for a single-page dashboard.
- **Seed data** covers 6 months across 10 categories, giving charts meaningful variation out of the box.

---
