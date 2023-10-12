import { createContext } from 'react';
import { User } from '../hooks/useUser';

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn:Boolean;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
  isLoggedIn: false
});