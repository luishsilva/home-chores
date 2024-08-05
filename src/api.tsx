import { UserType } from './types/UserType';

const BASE_URL = 'http://localhost:3000';

const postSignUp = (user: UserType) => {
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

const Requests = {
  postSignUp,
};

export default Requests;
