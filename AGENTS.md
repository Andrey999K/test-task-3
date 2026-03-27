# AGENTS.md - Development Guidelines for test-task-3

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read
the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Overview

This is a Next.js 16.2.1 application with React 19.2.4 and TypeScript 5. It's a citizen management dashboard using Ant
Design components, Recharts for visualizations, and Tailwind CSS v4 for styling. The app uses mock data
from `@/lib/mock-data`.

## Build, Lint & Test Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint (includes Next.js core web vitals rules + TypeScript)
npm run lint
```

**Note**: No test framework is currently installed. Tests are not being run.

## Code Style Guidelines

### Formatting (Prettier)

- **Semicolons**: Yes (`semi: true`)
- **Single quotes**: No (`singleQuote: false`)
- **Trailing commas**: ES5 style
- **Bracket spacing**: Enabled

### Import Order (enforced by Prettier)

Imports MUST be sorted in this order:

1. `react` - React core
2. `react/*` - React submodules
3. `next` - Next.js core
4. `next/*` - Next.js submodules
5. `<THIRD_PARTY_MODULES>` - External libraries (antd, recharts, dayjs, etc.)
6. `@/types/*` - TypeScript types
7. `@/lib/*` - Data/utilities
8. `@/utils/*` - Utility functions
9. `@/hooks/*` - Custom React hooks
10. `@/components/*` - Components
11. `@/app/*` - Next.js app router pages/layouts
12. `[./]` - Relative imports

Use `@ianvs/prettier-plugin-sort-imports` plugin. Separate groups with blank lines.

### TypeScript

- **Strict mode**: Enabled (`"strict": true`)
- **Module resolution**: Bundler
- **JSX**: `react-jsx`
- Use `type` imports for types: `import type { Citizen } from "@/types/citizen"`

### Naming Conventions

- **Components**: PascalCase (e.g., `RecentCitizensTable.tsx`, `CitizenDrawer.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useCitizensTable`, `useDashboardStats`)
- **Types/Interfaces**: PascalCase (e.g., `Citizen`, `MaritalStatus`)
- **Files**: PascalCase for components, camelCase for utilities/hooks
- **CSS classes**: Use Tailwind utility classes

### React/Next.js Patterns

- Use Next.js App Router (`src/app/` directory)
- Use `@/` path alias (maps to `src/`)
- Server Components by default; use `"use client"` directive for client components
- Use Ant Design components for UI (version 6.3.4)

### Error Handling

- Use TypeScript types to prevent runtime errors
- Handle optional values with proper null checks
- No custom error boundaries currently implemented

### Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx      # Dashboard
│   └── citizens/     # Citizens table page
├── components/       # React components
│   ├── dashboard/    # Dashboard-specific components
│   └── *.tsx        # Shared components
├── hooks/            # Custom React hooks
├── lib/              # Mock data and utilities
├── types/            # TypeScript type definitions
├── config/           # Configuration files
└── utils/            # Utility functions
```

### Available Type Definitions

Key types in `@/types/citizen.ts`:

- `Citizen` - Main citizen entity
- `MaritalStatus`, `Citizenship`, `BloodType`, `EducationLevel` - Enums
- `Document`, `Education`, `Work`, `Property`, `FamilyMember` - Related entities

### CSS/Styling

- Tailwind CSS v4 with `@tailwindcss/postcss`
- Use Tailwind utilities; avoid custom CSS unless necessary
- Follow existing patterns in `src/app/globals.css`

### Important Notes

- This is a mock data application (no real backend)
- All citizen data comes from `@/lib/mock-data`
- Date handling uses `dayjs` library
- Charts are rendered with `recharts`
