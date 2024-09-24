import { UserMemberType, UserSignInType, UserType } from './types/UserType';
import { getCurrentUserId } from './functions/userLocalStorage';
import { ChoreType, ChoreMemberType } from './types/ChoresType';

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
  const { id: currentUserId } = getCurrentUserId();

  return fetch(`${BASE_URL}/user_members?groupOwnerId=${currentUserId}`, {
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

// Chores API calls
const getAllChores = async (userId: string) => {
  return fetch(`${BASE_URL}/chores?userId=${userId}`, {
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

const patchChore = async (chore: ChoreType) => {
  return fetch(`${BASE_URL}/chores/${chore.id}`, {
    body: JSON.stringify({
      ...chore,
    }),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

const deleteChore = async (id: string) => {
  return fetch(`${BASE_URL}/chores/${id}`, {
    method: 'DELETE',
  }).then((response) => response.json);
};

const postChoreMember = async (
  ChoreMember: ChoreMemberType,
  userId: string
) => {
  const { id, ...choreMemberDataWithoutId } = ChoreMember;
  choreMemberDataWithoutId.choreStatus = '1';
  choreMemberDataWithoutId.groupOwnerId = userId;

  return fetch(`${BASE_URL}/chore_members`, {
    body: JSON.stringify({
      ...choreMemberDataWithoutId,
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
    })
    .catch((error) => {
      console.error('Error posting chore to the group:', error);
      throw error;
    });
};

const getAllChoreMembers = async (userId: string) => {
  return fetch(`${BASE_URL}/chore_members?groupOwnerId=${userId}`, {
    method: 'GET',
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP failed with status ${response.status}`);
    }
    return response.json();
  });
};

const patchChoreMemberStatus = async (
  status: string,
  ChoreMemberId: string,
  userId: string | undefined
) => {
  return fetch(`${BASE_URL}/chore_members/${ChoreMemberId}`, {
    body: JSON.stringify({
      choreStatus: status,
      groupOwnerId: userId,
    }),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP failed with status ${response.status}`);
    }
  });
};

const Requests = {
  // User
  deleteMember,
  getAllUsers,
  getUserGroupMembers,
  patchMember,
  postAddMember,
  postSignUp,
  signIn,

  // Chore
  deleteChore,
  getAllChores,
  getAllChoreMembers,
  postChoreMember,
  patchChore,
  postChore,
  patchChoreMemberStatus,
};

export default Requests;
