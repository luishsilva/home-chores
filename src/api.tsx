import { UserSignInType, UserType } from './types/UserType';
import { UserMemberType } from './types/UserMemberType';
import { getCurrentUser } from './functions/userLocalStorage';

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

const postUserMember = async (member: UserMemberType) => {
  return fetch(`${BASE_URL}/user_members`, {
    body: JSON.stringify({
      ...member,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP failed: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error posting member to the group:', error);
      throw error;
    });
};

const postAddMember = async (user: UserType) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      body: JSON.stringify({
        ...user,
        isAdmin: false,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP failed: ${response.statusText}`);
    }

    const data = await response.json();
    const currentUser = getCurrentUser();

    if (currentUser) {
      await postUserMember({
        userId: data.id,
        groupOwnerId: currentUser.id,
      });
    } else {
      throw new Error('No current user found or user ID missing.');
    }

    return data;
  } catch (error) {
    console.error('Error posting member:', error);
    throw error;
  }
};

const Requests = {
  postAddMember,
  getAllUsers,
  postSignUp,
  signIn,
};

export default Requests;
