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
  token: string;
}

export const LocalUser = async (key: string, token: string) => {
  let val;
  // try {
  //   val = window.localStorage.getItem(key);
  // } catch (e) {
  val = window.localStorage.setItem(key, JSON.stringify(token));
  // }
  return val;
};

export const setLocalUser = (token: string) => {
  let authUser: User = {
    email: '',
    username: '',
    id: '',
    isAdmin: false,
    token: '',
  };
  try {
    const user: User = JwtDecode(token);
    authUser = {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
      email: user.email,
      token: user.token,
    };
    return authUser;
  } catch {
    return;
  }
};

export const SetUser = async (userDetails: Data, method: string) => {
  let authUser: User = {
    email: '',
    username: '',
    id: '',
    isAdmin: false,
    token: '',
  };
  let authorized = false;
  let error;

  try {
    if (userDetails.username && userDetails.password) {
      if (method === 'login') {
        const { data } = await Axios.post('/auth/login', {
          username: userDetails.username,
          password: userDetails.password,
        });
        if (!data.error) {
          await LocalUser('shopifyToken', data.token);
          const user: User = JwtDecode(data.token);
          authUser = {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            email: user.email,
            token: data.token,
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
        if (!data.error) {
          await LocalUser('shopifyToken', data.token);
          const user: User = JwtDecode(data.token);
          authUser = {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            email: user.email,
            token: data.token,
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
    } else {
      authorized = false;
      error = 'Please Provide us with your Credentials';
    }
  } catch (e) {
    console.log(e);
  }

  return [authUser, authorized, error];
};
