import JwtDecode from 'jwt-decode';
import Axios from 'axios';

interface Data {
  username: string;
  password: string | number;
  email?: string;
}

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
  email: string;
}

export const LocalUser = async (key: string, token: string) => {
  let val = window.localStorage.setItem(key, JSON.stringify(token));
  return val;
};

export const setLocalUser = (token: string) => {
  let authUser: User;
  const user: User = JwtDecode(token);
  authUser = {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
    email: user.email,
  };
  return authUser;
};

export const SetUser = async (userDetails: Data, method: string) => {
  let authUser: User = {
    email: '',
    username: '',
    id: '',
    isAdmin: false,
  };
  let authorized = false;
  let error;

  if (method === 'login') {
    const { data } = await Axios.post('/auth/login', {
      username: userDetails.username,
      password: userDetails.password,
    });
    await LocalUser('shopifyToken', data.token);
    if (!data.error) {
      const user: User = JwtDecode(data.token);
      authUser = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
        email: user.email,
      };
      authorized = true;
    } else {
      authorized = false;
      error = data.error;
    }
  } else if (method === 'signup') {
    const { data } = await Axios.post('/auth/signup', {
      username: userDetails.username,
      password: userDetails.password,
      email: userDetails.email,
    });
    await LocalUser('shopifyToken', data.token);
    if (!data.error) {
      const user: User = JwtDecode(data.token);
      authUser = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
        email: user.email,
      };
      authorized = true;
    } else {
      authorized = false;
      error = data.error;
    }
  } else {
    authorized = false;
    error = 'Please provide Method ( Signup | Login )';
  }

  return [authUser, authorized, error];
};
