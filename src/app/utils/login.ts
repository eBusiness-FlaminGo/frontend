import {keys} from '../constants/localstorage';

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


export const login = (user: { username: string; isSetUp: boolean }) => {
  try {
    localStorage.setItem(keys.user, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Failed to log in:', error);
    return false;
  }
};


export const toggleUserSetupState = (state: boolean) => {
  const user = localStorage.getItem(keys.user);
  try {
    if (user) {
      const parsedUser = JSON.parse(user);
      parsedUser.isSetUp = state;
      localStorage.setItem(keys.user, JSON.stringify(parsedUser));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to toggle setup state:', error);
    return false;
  }
};
