import { keys } from '../constants/localstorage';

export const isLoggedIn = () => {
  const user = localStorage.getItem(keys.user);
  try {
    return user !== null && typeof JSON.parse(user) === 'object';
  } catch {
    return false;
  }
};

export const isSetUp = () => {
  const user = localStorage.getItem(keys.user);
  try {
    const parsedUser = user ? JSON.parse(user) : null;
    return parsedUser?.isSetUp === true;
  } catch {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem(keys.user);
};
