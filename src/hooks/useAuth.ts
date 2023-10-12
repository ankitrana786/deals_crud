import { useEffect } from 'react';
import { useUser } from './useUser';
import { useLocalStoragets } from './useLocalStoragets';

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStoragets();

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user: any) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};