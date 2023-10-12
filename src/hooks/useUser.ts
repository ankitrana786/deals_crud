import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocalStoragets } from './useLocalStoragets';

export interface User {
  id: string;
  name: string;
  email: string;
  authToken?: string;
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStoragets();

  const addUser = (user:User) => {
    setUser(user);
    setItem('token', JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem('token', '');
  };

  return { user, addUser, removeUser };
};