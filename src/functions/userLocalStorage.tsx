const getCurrentUser = () => {
  const userString = localStorage.getItem('currentUser');

  if (userString) {
    return JSON.parse(userString);
  }
  return null;
};

export default getCurrentUser;
