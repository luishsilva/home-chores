import { UserSignInType, UserType } from './types/UserType';

const BASE_URL = 'http://localhost:3000';

const getAllUsers = () => {
  return fetch(`${BASE_URL}/users`, {
    method: 'GET',
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP failed with status ${response.status}`);
    }
    return response.json();
  });
};

const postSignUp = async (user: UserType) => {
  return fetch(`${BASE_URL}/users`, {
    body: JSON.stringify({
      ...user,
      isAdmin: true,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP failed: ${response.statusText}`);
    }
    return response.json();
  });
};

const signIn = async (user: UserSignInType) => {
  return fetch(`${BASE_URL}/users`, {
    body: JSON.stringify({
      ...user,
    }),
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP failed: ${response.statusText}`);
    }
    return response.json();
  });
};

const Requests = {
  getAllUsers,
  signIn,
  postSignUp,
};

export default Requests;
