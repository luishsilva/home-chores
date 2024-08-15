import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  FC,
  useContext,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSignInType, UserType } from '../types/UserType';
import Requests from '../api';

type AuthContextType = {
  user: UserType | null;
  signUp: (userData: UserType) => Promise<void>;
  signIn: (userData: UserSignInType) => Promise<void>;
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
  signUp: async (): Promise<void> => {
    throw new Error('Function not implemented.');
  },
  signIn: async (): Promise<void> => {
    throw new Error('Function not implemented');
  },
  isLoading: false,
});

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const isUserLocalStorage = localStorage.getItem('currentUser');
    if (isUserLocalStorage) {
      const loggedUser: UserType = JSON.parse(isUserLocalStorage);
      setUser(loggedUser);
    }
  }, []);

  const navigate = useNavigate();

  const signUp = useCallback(
    (userData: UserType) => {
      setIsLoading(true);
      return Requests.postSignUp(userData)
        .then(() => {
          /**
           * Note: Setting the user from local storage is not ideal since
           * anyone who knows how to manipulate local storage can compromise
           * your login. This is for study purposes only.
           * User is set in local storage when sign up
           */
          localStorage.setItem('currentUser', JSON.stringify(userData));
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

  const signIn = useCallback(
    (userData: UserSignInType) => {
      setIsLoading(true);
      const { email, password } = userData;

      return Requests.getAllUsers()
        .then((response) => {
          const emailFound = response.find(
            (res: UserSignInType) => res.email === email
          );
          const passwordFound = response.find(
            (res: UserSignInType) => res.password === password
          );
          if (!emailFound) {
            throw new Error('Email not found');
          }
          if (!passwordFound) {
            throw new Error('Password not found');
          }
          // if user is in the db.json but not in the local storage should I add the user in the local storage from the sign page?
          // setUser(emailFound);
          navigate('/dashboard');
        })
        .finally(() => setIsLoading(false));
    },
    [navigate]
  );

  const contextValue = useMemo(
    () => ({ user, signIn, signUp, isLoading }),
    [user, signIn, signUp, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
