export const SEED_TRANSACTIONS = [
  { id: 1,  desc: 'Monthly Salary',     amount: 5200, type: 'income',  category: 'Salary',        date: '2024-01-02' },
  { id: 2,  desc: 'Apartment Rent',     amount: 1400, type: 'expense', category: 'Housing',       date: '2024-01-03' },
  { id: 3,  desc: 'Groceries',          amount: 180,  type: 'expense', category: 'Food',          date: '2024-01-05' },
  { id: 4,  desc: 'Netflix',            amount: 18,   type: 'expense', category: 'Entertainment', date: '2024-01-07' },
  { id: 5,  desc: 'Freelance Project',  amount: 900,  type: 'income',  category: 'Freelance',     date: '2024-01-10' },
  { id: 6,  desc: 'Electricity Bill',   amount: 95,   type: 'expense', category: 'Utilities',     date: '2024-01-12' },
  { id: 7,  desc: 'Doctor Visit',       amount: 120,  type: 'expense', category: 'Healthcare',    date: '2024-01-15' },
  { id: 8,  desc: 'Monthly Salary',     amount: 5200, type: 'income',  category: 'Salary',        date: '2024-02-02' },
  { id: 9,  desc: 'Apartment Rent',     amount: 1400, type: 'expense', category: 'Housing',       date: '2024-02-03' },
  { id: 10, desc: 'Restaurant',         amount: 85,   type: 'expense', category: 'Food',          date: '2024-02-08' },
  { id: 11, desc: 'Gym Membership',     amount: 50,   type: 'expense', category: 'Healthcare',    date: '2024-02-10' },
  { id: 12, desc: 'Freelance Project',  amount: 1200, type: 'income',  category: 'Freelance',     date: '2024-02-14' },
  { id: 13, desc: 'Online Shopping',    amount: 230,  type: 'expense', category: 'Shopping',      date: '2024-02-18' },
  { id: 14, desc: 'Monthly Salary',     amount: 5200, type: 'income',  category: 'Salary',        date: '2024-03-02' },
  { id: 15, desc: 'Apartment Rent',     amount: 1400, type: 'expense', category: 'Housing',       date: '2024-03-03' },
  { id: 16, desc: 'Car Service',        amount: 320,  type: 'expense', category: 'Transport',     date: '2024-03-06' },
  { id: 17, desc: 'Groceries',          amount: 195,  type: 'expense', category: 'Food',          date: '2024-03-09' },
  { id: 18, desc: 'Concert Tickets',    amount: 110,  type: 'expense', category: 'Entertainment', date: '2024-03-15' },
  { id: 19, desc: 'Monthly Salary',     amount: 5200, type: 'income',  category: 'Salary',        date: '2024-04-02' },
  { id: 20, desc: 'Apartment Rent',     amount: 1400, type: 'expense', category: 'Housing',       date: '2024-04-03' },
  { id: 21, desc: 'Groceries',          amount: 160,  type: 'expense', category: 'Food',          date: '2024-04-07' },
  { id: 22, desc: 'Freelance Project',  amount: 750,  type: 'income',  category: 'Freelance',     date: '2024-04-12' },
  { id: 23, desc: 'Internet Bill',      amount: 60,   type: 'expense', category: 'Utilities',     date: '2024-04-14' },
  { id: 24, desc: 'Clothes',            amount: 180,  type: 'expense', category: 'Shopping',      date: '2024-04-20' },
  { id: 25, desc: 'Monthly Salary',     amount: 5200, type: 'income',  category: 'Salary',        date: '2024-05-02' },
  { id: 26, desc: 'Apartment Rent',     amount: 1400, type: 'expense', category: 'Housing',       date: '2024-05-03' },
  { id: 27, desc: 'Pharmacy',           amount: 45,   type: 'expense', category: 'Healthcare',    date: '2024-05-08' },
  { id: 28, desc: 'Groceries',          amount: 210,  type: 'expense', category: 'Food',          date: '2024-05-11' },
  { id: 29, desc: 'Uber Rides',         amount: 75,   type: 'expense', category: 'Transport',     date: '2024-05-16' },
  { id: 30, desc: 'Monthly Salary',     amount: 5200, type: 'income',  category: 'Salary',        date: '2024-06-02' },
  { id: 31, desc: 'Apartment Rent',     amount: 1400, type: 'expense', category: 'Housing',       date: '2024-06-03' },
  { id: 32, desc: 'Freelance Project',  amount: 1500, type: 'income',  category: 'Freelance',     date: '2024-06-10' },
  { id: 33, desc: 'Dinner Out',         amount: 120,  type: 'expense', category: 'Food',          date: '2024-06-14' },
  { id: 34, desc: 'Streaming Services', amount: 35,   type: 'expense', category: 'Entertainment', date: '2024-06-18' },
  { id: 35, desc: 'Electric Bill',      amount: 88,   type: 'expense', category: 'Utilities',     date: '2024-06-20' },
]

export const CATEGORY_COLORS = {
  Food:          '#4ade80',
  Housing:       '#60a5fa',
  Transport:     '#f59e0b',
  Entertainment: '#c084fc',
  Healthcare:    '#34d399',
  Shopping:      '#fb923c',
  Utilities:     '#94a3b8',
  Salary:        '#4ade80',
  Freelance:     '#60a5fa',
  Other:         '#f87171',
}

export const CATEGORIES = [
  'Food', 'Housing', 'Transport', 'Entertainment',
  'Healthcare', 'Shopping', 'Utilities', 'Salary', 'Freelance', 'Other',
]

export const MONTHS      = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
export const MONTH_KEYS  = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06']
