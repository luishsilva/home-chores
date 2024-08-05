import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  FC,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types/UserType';
import Requests from '../api';

type AuthContextType = {
  user: UserType | null;
  signup: (userData: UserType) => Promise<void>;
  isLoading: boolean;
};

type AuthProviderType = {
  children: ReactNode;
};

/**
 * ensures that the context has a default value that matches the expected shape (AuthContextType)
 */
export const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: async (): Promise<void> => {
    throw new Error('Function not implemented.');
  },
  isLoading: false,
});

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const signup = useCallback(
    (userData: UserType) => {
      setIsLoading(true);
      return Requests.postSignUp(userData)
        .then(() => {
          setUser(userData);
          navigate('/login');
        })
        .catch(() => {
          console.error('Sorry something went wrong, please try again later');
        })
        .finally(() => setIsLoading(false));
    },
    [navigate]
  );

  const contextValue = useMemo(
    () => ({ user, signup, isLoading }),
    [user, signup, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
