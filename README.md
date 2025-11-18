# FrontendTask

# 📦 Overview

This project is a fully functional **Product Listings Manager** built as part of a frontend assignment.
It includes search, category filtering, multi-criteria sorting, price filters, pagination, product details, navigation, and an improved UI — powered by a mock backend using **MSW**.

It is architected to resemble a **production-ready frontend**, with URL-synced state, modular components, strong TypeScript types, and a clean folder structure.

---

# 🚀 Features

## 🔍 Search & Debounce

* Real-time search with **300ms debounce**
* Filters results instantly
* Search state stored in URL

## 🏷️ Filters

* Category filter
* Price range (`min` & `max`)
* In-stock only
* Multi-filter combinations
* All filter values saved in URL params

## 🔄 Multi-Criteria Sorting

* **Primary sort** (price/name)
* **Secondary sort** for tie-breaking
* Sorting applied client-side for stable behavior
* URL-synced sorting state

## 📄 Pagination

* Prev/Next navigation
* Page resets intelligently when search/filters change
* Fix applied to prevent “snap back to Page 1” bug

## 📦 Product Cards

* Clean, responsive grid
* Hover animations
* Accessible clickable areas
* Prevented purple visited-link issue

## 🔎 Product Details Page

* Name, price, category, stock status
* Dynamic route (`/products/:id`)
* Loading, error, and empty states
* Fixed "Go Back" behavior for direct visits

## 🎨 Modern UI Improvements

* New header with **Ignosis Tech logo as Home button**
* Hover/active animations
* Clean toolbar layout
* Better alignment and spacing
* Intuitive component grouping

## 📡 MSW-Backed Mock API

* Fully mocked `/products` and `/products/:id` endpoints
* Normalized API responses for consistent consumption
* Intercepted by MSW in development mode

---

# 🧱 Project Structure

```
src/
│── api/
│   └── products.ts        # Fetch helpers
│
│── components/
│   ├── HomeButton.tsx     # Logo home button
│   ├── Toolbar.tsx        # Filters + sorting bar
│   ├── Pagination.tsx
│   ├── ProductCard.tsx
│   └── Logo.jpeg
│
│── features/
│   └── products/
│       ├── ProductList.tsx
│       └── ProductDetails.tsx
│
│── hooks/
│   └── useProducts.ts     # Search params + fetch logic
│
│── mocks/
│   ├── handlers.ts
│   ├── browser.ts
│   └── server.ts
│
└── main.tsx               # MSW init + App bootstrap
```

---

# 🛠️ Tech Stack

| Technology             | Purpose                         |
| ---------------------- | ------------------------------- |
| **React**              | UI Components                   |
| **TypeScript**         | Strong typing & maintainability |
| **Vite**               | Ultra-fast build & dev          |
| **React Router**       | Client-side routing             |
| **MSW**                | API simulation & mock backend   |
| **CSS Grid / Flexbox** | Responsive layout               |
| **Custom Hooks**       | State + URL management          |

---

# ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone <REPO_URL>
cd frontend-task-main
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Start development server

```bash
yarn dev
```

### 4. Visit the app

```
http://localhost:5173/products
```

---

# 🧪 Testing (optional)

This template supports Vitest. You can add tests inside `src/tests/`:

```bash
yarn test
```

---

# 🐞 Bugs Fixed During Development

### ✔ MSW worker not loading → fixed import path & service worker URL

### ✔ “Next Page snaps back” → fixed search debounce logic

### ✔ Product name visited-color → removed default visited styles

### ✔ ProductDetails route failing → normalized data response

### ✔ Incorrect imports for logo → fixed relative asset paths

### ✔ Back button not working → implemented safe fallback logic

### ✔ Sorting overridden incorrectly → added robust comparator

---

# 🚧 Potential Improvements (If Given More Time)

These are realistic next-step enhancements:

## 🌐 Server-Side Sorting & Filtering

Move sorting/filtering/pagination to backend to support large datasets.

## 🎛️ Better Sorting UI

* Sort priority chips (1, 2, 3)
* Drag-and-drop reorder sorts
* Asc/Desc toggle buttons

## 🔎 Advanced Filters

* Multi-category selection
* Brand filter
* Rating filter
* Tag-based filters

## 🎨 UI Polish

* Replace toolbar inputs with styled components
* Introduce a small design system
* Add dark mode

## 📱 Mobile Optimization

* Dedicated mobile filter drawer
* Better spacing & readability

## 🔐 User Preferences

Persist settings in `localStorage` or backend profile

## 🧪 Test Coverage

* Mock API tests
* UI interaction tests
* Sorting & filtering logic unit tests

## ⚡ Performance

* List virtualization (for 1000+ products)
* Memoized expensive sort operations
* Web Worker for sorting/filtering

---
