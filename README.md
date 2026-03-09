# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## Project Folder Structure

The codebase follows a **feature-first** structure with shared utilities and centralized configuration:

```
src/
├── app/                 # Global state management
│   ├── store.ts         # Redux store configuration
│   └── rootReducer.ts   # Combined slice reducers
├── features/            # Self-contained feature modules
│   └── users/           # Example feature
│       ├── userSlice.ts
│       └── hooks/
│           └── useFetchUsers.ts
├── routes/              # Router definitions and layouts (optional)
│   ├── AppRouter.jsx
│   └── layouts/...
├── shared/              # Reusable utilities and config
│   └── api/
│       ├── axiosInstance.ts
│       └── queryClient.ts
└── App.tsx              # Root component
```

This organization makes it easy to add new features (auth, users, posts, etc.) without touching unrelated code — each feature owns its slice, API logic, and hooks. The `shared` folder holds cross-cutting concerns like the axios client and React Query configuration.

### Features implemented so far

- **Authentication** (fake credentials `admin` / `password`): login page, Redux slice, token stored in localStorage, protected routes
- **User management**: fetch list, add/delete users via JSONPlaceholder, CRUD reducers and mutations, UI form in `/users`
- **Posts placeholder**: scaffold awaiting implementation
- **Routing**: `react-router-dom` with `AppRouter`, layouts, protected routes
- **Error handling**: top‑level `ErrorBoundary` component wraps layouts and can integrate with
  external reporting services (Sentry, etc.) for production
- **Styling**: Tailwind CSS with configurable `tailwind.config.js` theme colors

### Getting started

1. Run `npm install` to grab dependencies (including `react-router-dom`, `tailwindcss`, `postcss`, `autoprefixer`).
   - There is also an `npm run analyze` script that builds the app with
     `rollup-plugin-visualizer` enabled; open `dist/bundle-analysis.html` to see a
     breakdown of bundle sizes.
2. Start dev server: `npm run dev`.
3. Authentication credentials are hard‑coded; after login you land on `/users` and can add or delete.

The folder layout shown above is suitable as a base for future growth and theming – update `tailwind.config.js` to adjust colors, spacing, etc.
