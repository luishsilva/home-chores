import { UserMemberType, UserSignInType, UserType } from './types/UserType';
import { getCurrentUserId } from './functions/userLocalStorage';
import { ChoreType } from './types/ChoresType';

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

const getUserGroupMembers = () => {
  const { id } = getCurrentUserId();

  return fetch(`${BASE_URL}/user_members?groupOwnerId=${id}`, {
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

// Add the member in the users "table"
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
    const { id } = getCurrentUserId();
    const data = await response.json();

    if (id) {
      await postUserMember({
        userId: data.id,
        groupOwnerId: id,
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

const patchMember = async (user: UserType) => {
  return fetch(`${BASE_URL}/users/${user.id}`, {
    body: JSON.stringify({
      ...user,
    }),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json);
};

const deleteMember = async (id: string) => {
  return fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  }).then((response) => response.json);
};

const getAllChores = async () => {
  return fetch(`${BASE_URL}/chores`, {
    method: 'GET',
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP failed with status ${response.status}`);
    }
    return response.json();
  });
};

const postChore = async (chore: ChoreType) => {
  const { id, ...choreWithoutId } = chore; // ommiting chore id
  return fetch(`${BASE_URL}/chores`, {
    body: JSON.stringify({
      ...choreWithoutId,
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
      console.error('Error posting chore to the group:', error);
      throw error;
    });
};

const Requests = {
  deleteMember,
  getAllChores,
  getAllUsers,
  getUserGroupMembers,
  patchMember,
  postAddMember,
  postChore,
  postSignUp,
  signIn,
};

export default Requests;
