import { createContext } from 'react';

// Split out from AuthContext.jsx: Fast Refresh only works on files that
// export *only* components. AuthContext.jsx exports the AuthProvider
// component, so the raw context object has to live somewhere else.
export const AuthContext = createContext(null);
