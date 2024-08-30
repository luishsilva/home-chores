export const getCurrentUser = () => {
  const userString = localStorage.getItem('currentUser');

  if (userString) {
    return JSON.parse(userString);
  }
  return null;
};

export const getCurrentUserId = () => {
  const userId = localStorage.getItem('currentUser');

  if (userId) {
    return JSON.parse(userId);
  }
  return null;
};
