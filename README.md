# 🐾 Animal Search

A modern, responsive web application for searching and discovering animals. Built as a technical assessment showcasing clean architecture, TypeScript best practices, and professional UI/UX design.

## 🚀 Live Demo

**[View Live Application](https://agile-tv-animals.vercel.app/)**

## 📋 Features

- **Smart Search**: Search animals by both title and type with real-time results
- **Interactive UI**: Click on any result to view detailed information including images and descriptions
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Loading States**: Elegant loading indicators and error handling
- **Empty States**: Clear messaging when no results are found or no search term is provided
- **Quick Suggestions**: One-click search suggestions for popular animals
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: CSS3 with CSS Variables (no UI libraries)
- **Icons**: Lucide React
- **Data Generation**: Faker.js
- **Testing**: Vitest + Testing Library
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable UI components
├── layout/          # Layout components (Header, Footer)
├── pages/           # Page components
│   ├── home/        # Homepage with search
│   └── results/     # Results page with list
├── routes/          # Route definitions
├── services/        # API services and data logic
│   └── fakeApi.ts   # Fake API with Faker.js
└── test/            # Test setup and utilities
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/luisdandolini/agile-tv-animals
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🧪 Running Tests

```bash
# Run tests in watch mode
npm run test
```

## 📱 Responsive Breakpoints

- **Desktop**: 1080px+ (optimal experience)
- **Tablet**: 768px - 1079px
- **Mobile**: 320px - 767px

## 🔭 Future Improvements (given more time)

### 1) Accessibility (target Lighthouse A11y ≥ 95)

- [ ] Consistent visible focus (`:focus-visible`) for keyboard/mouse
- [ ] `aria-expanded` / `aria-controls` on expandable result items
- [ ] `aria-live` for loading/error states
- [ ] Improve color contrast via tokens (see Tokens section)
- [ ] Axe/Lighthouse audits and remediation

**Why:** improves inclusivity and reduces usability pitfalls.

---

### 2) Testing & Quality

- [ ] Integration tests covering routing (`/results?search=…`) and **empty/error** states
- [ ] Basic a11y checks in tests (e.g., `axe` with Testing Library)
- [ ] Increase coverage of critical flows (submit, details toggle, image fallback)
- [ ] Lightweight CI (GitHub Actions) running `lint` + `test` on PRs

**Why:** fewer regressions and more confidence to iterate.

---

### 3) Resilience & Performance

- [ ] Skeletons/suspense for the results list
- [ ] `loading="lazy"` and `decoding="async"` on images (with placeholders)
- [ ] Error Boundaries for unexpected failures
- [ ] Simple cache for repeated searches (e.g., in-memory Map by normalized term)
- [ ] Debounced search and keyboard navigation for suggestions

**Why:** smoother UX on slow networks and graceful error handling.

---

### 4) Design Tokens & Theming

- [ ] Consolidate CSS variables as a single source of truth  
       `--primary-color`, `--primary-hover`, `--bg-primary`, `--bg-secondary`, `--border-color`, `--text-primary`, `--text-secondary`, `--accent-color`
- [ ] Support **light/dark** using the same token set (via `:root` and `[data-theme="dark"]`)
- [ ] Document the token map in the README

**Why:** visual consistency and easy future re-branding.

---

### 🧩 Technical Notes

- Replace deprecated `faker.image.urlLoremFlickr()` with `faker.image.url()`.
- Ensure `aria-expanded` on the button that toggles result details.
- Standardize the search query param (`search`) across the app to avoid edge cases.
