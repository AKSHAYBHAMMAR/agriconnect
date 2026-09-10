# 🌾 AgriConnect — Three-Sided Agricultural Marketplace

> **Direct from Soil to Shelf**: A modern mobile-first marketplace connecting **Farmers**, **Consumers**, and **Logistics Partners** with transparent 25/75 split freight payments, real-time escrow, and AI demand forecasting.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎨 Earthy Agri Visual Theme

- **Deep Agri Greens**: `#2D5016` (Primary Deep Forest), `#4A7C2A` (Lush Field Green)
- **Terracotta & Harvest Amber**: `#C77D3B` (Warm Terracotta), `#E8A857` (Golden Harvest Amber)
- **Soft Cream Canvas**: `#FAF7F0` (Earthy cream canvas), `#FFFFFF` (Surface cards)
- **Typography**: Inter & Poppins sans-serif
- **Mobile Simulator Frame**: Integrated iPhone/Android frame mockup with notch, status bar, and desktop testing controls.

---

## 🌟 Marketplace Roles & Features

### 1. 🌾 Farmer / Kisan App
- **Dashboard Overview**: Farm location greeting, horizontal metrics slider (*Active stock, Pending orders, Month net payout*).
- **AI Demand Surge Alerts**: In-app advisory banner highlighting regional surge (*e.g., Tomato demand +18%*).
- **My Stock**: Listing cards with photo thumbnails, variety, crop age in days since sowing, remaining quantity, price per unit, and swipe/edit/delete actions.
- **Add Stock Modal**: Full-screen form with crop name, variety, quantity, price, **sowing date picker with automatic crop age calculator**, and location tag.
- **AI Forecast Screen**: Interactive SVG Line/Bar chart of 7-week price trends, AI recommended price badge, and actionable harvesting tips.
- **Orders & Dispatch**: Incoming order cards with expandable dashed-line receipts displaying the 1/4 farmer freight share deduction.
- **Earnings**: Total balance card with itemized transport share deductions and bank settlement records.

### 2. 🛒 Consumer / Buyer App
- **Marketplace**: Search bar, category chips (*All Produce, Fresh Veggies, Grains & Rice, Certified Organic, Fresh Picked*), and sorting options.
- **Product Detail Modal**: High-res image carousel, freshness metrics (*crop age, grade, moisture %*), verified farmer mini-profile with 4.8+ rating, quantity stepper, and price breakdown.
- **Cart & Estimator**: Multi-item cart with quantity steppers and buyer freight contribution preview.
- **Payment Screen**: Transparent transaction receipt with two large tappable cards:
  - **Pay 50% Now** (Pre-selected minimum advance deposit in escrow)
  - **Pay 100% Now** (Full advance settlement)
- **Orders & Timeline**: Vertical 5-step status timeline (*Ordered → Paid → Picked Up → In Transit → Delivered*) and remaining balance card for half-paid orders.
- **Live GPS Tracking**: Stylized SVG route map with animated vehicle marker, ETA badge (*38 mins remaining*), speed indicator (*54 km/h*), and driver profile card (*Ramesh Verma, MH-15-EG-4412*).
- **Profile**: Order history, saved farmers, linked escrow methods, and delivery addresses.

### 3. 🚚 Logistics Partner App
- **Bookings Feed**: Rapido/Uber driver style interface with **"Go Online / Offline"** status toggle and pulsing radar indicator.
- **Load Cards**: Pickup farm pin + drop terminal pin, cargo weight, distance, net driver payout, and Accept/Decline actions.
- **AI Multi-Stop Route Optimizer**: Stop-order sequence (*Stop 1 Farm → Stop 2 Farm → Stop 3 Mandi → Stop 4 Mandi*) with fuel savings metric (*"Saves 42 km & ₹780 fuel"*), combined payout calculation, and vehicle payload bar.
- **Active Trip Screen**: Turn-by-turn navigation card (*Kasara Ghat Expressway*), interactive farm pickup verification checklist, and "Mark Picked Up" / "Mark Delivered" actions.
- **Logistics Earnings**: Weekly settlement card (₹14,850) with itemized breakdown of 1/4 farmer deduction and 3/4 buyer contribution.
- **Driver Profile**: Vehicle specifications (*Mahindra Bolero Maxi Truck, 1.7T*), permit validity, and compliance checklist.

### 4. 🧾 Shared Cross-Cutting Modules
- **`TransparentTransactionCard`**: Reusable itemized dashed-line receipt with corner notches showing produce cost, freight total, 25% farmer deduction, 75% buyer contribution, and payment status.
- **`StatusBadge`**: Color-coded badges for all order and load states.
- **`ForecastChart`**: Reusable SVG line and bar chart.
- **`BottomTabBar`**: Role-specific tab navigation.
- **`PushBanner`**: Real-time floating alert toasts.
- **Instant Role Switcher**: A persistent desktop bar to switch between Farmer, Consumer, Logistics, and Onboarding with a single tap.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 5 + TypeScript
- **Icons**: [lucide-react](https://lucide.dev/)
- **Design System**: Vanilla CSS with custom theme variables, mobile simulator frame, and responsive viewport sizing
- **State Management**: React Context (`AppContext`) with dynamic cross-role synchronization

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/AKSHAYBHAMMAR/agriconnect.git
cd agriconnect

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📜 License
MIT License. Created for the AgriConnect Open Agricultural Network.
