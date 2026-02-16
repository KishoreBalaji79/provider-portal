# Provider Portal (React + MUI)

This project is a Provider Portal UI built with **React + TypeScript + Material UI (MUI)**.  
It follows the Figma design and uses a reusable **DataTable** component (based on **MUI X DataGrid**) for pages like **Patient List** and **Patient Profile → Patient History**.

---

## Tech Stack

- React + TypeScript
- Material UI (`@mui/material`)
- MUI X DataGrid (`@mui/x-data-grid`)
- React Router (`react-router-dom`)
- Vite (build tool)

---

## Getting Started

### Install dependencies
```bash
npm install

npm run dev
```
Open: http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Folder structure
```
provider-portal/
├─ src/
│  ├─ app/
│  │  ├─ App.tsx            # App root
│  │  └─ router.tsx         # Route definitions
│  │
│  ├─ layout/
│  │  ├─ AppLayout.tsx      # Sidebar + Header + page container
│  │  ├─ Header.tsx         # Top AppBar (green header)
│  │  ├─ Sidebar.tsx        # Left navigation
│  │  └─ BreadcrumbsBar.tsx # Breadcrumb rendering
│  │
│  ├─ components/
│  │  ├─ PageShell.tsx      # Page wrapper: title + breadcrumbs + spacing
│  │  └─ DataTable.tsx      # Reusable table (MUI X DataGrid + Figma styles)
│  │
│  ├─ pages/
│  │  ├─ PatientListPage.tsx
│  │  ├─ PatientProfilePage.tsx
│  │  ├─ LoginPage.tsx
│  │  └─ PlaceholderPage.tsx
│  │
│  ├─ theme/
│  │  ├─ alnuTheme.ts       # Alnu colors, border radius, spacing tokens
│  │  └─ theme.ts           # MUI theme mapping (if used)
│  │
│  ├─ main.tsx
│  └─ index.html
│
├─ package.json
├─ tsconfig.json
└─ vite.config.ts

