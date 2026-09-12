import { createContext } from 'react';

// Split into its own file (not ThemeContext.jsx) for the same reason
// auth-context.js is separate from AuthContext.jsx: Vite Fast Refresh
// only works on files that export *only* components.
export const ThemeContext = createContext(null);
