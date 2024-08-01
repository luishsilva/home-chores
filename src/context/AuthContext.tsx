import { createContext, ReactNode, useState, useMemo, FC } from 'react';

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: UserType | null;
  signup: (UserData: UserType) => void;
};

type AuthProviderType = {
  children: ReactNode;
};

// const BASE_URL = 'http://localhost:3000/';

const defaultAuthContextValue: AuthContextType = {
  user: null,
  signup: () => {},
};

export const AuthContext = createContext<AuthContextType>(
  defaultAuthContextValue
);

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const signup = (userData: UserType) => {
    // only set user if response from server is ok, simulating only now change code in the future to do it
    setUser(userData);
    /* fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json); */
  };

  const contextValue = useMemo(() => ({ user, signup }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
