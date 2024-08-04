import { User } from './types/UserType';

const BASE_URL = 'http://localhost:3000/';

const postSignUp = (user: Omit<User, 'id'>) => {
  return fetch(`${BASE_URL}/users`, {
    body: JSON.stringify(user),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(
          `HTTP failed with status ${response.status}: ${error.message}`
        );
      });
    }
    return response.json();
  });
};

const Requests = {
  postSignUp,
};

export default Requests;
