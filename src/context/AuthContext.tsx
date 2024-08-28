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
  addMember: (userData: UserType) => Promise<void>;
  isLoading: boolean;
  logOff: () => void;
  signIn: (userData: UserSignInType) => Promise<void>;
  signUp: (userData: UserType) => Promise<void>;
  user: UserType | null;
};

type AuthProviderType = {
  children: ReactNode;
};

/**
 * ensures that the context has a default value that matches the expected shape (AuthContextType)
 */
export const AuthContext = createContext<AuthContextType>({
  addMember: async (): Promise<void> => {
    throw new Error('Function not addMember implemented.');
  },
  isLoading: false,
  logOff: () => {},
  signIn: async (): Promise<void> => {
    throw new Error('Function not signIn implemented');
  },
  signUp: async (): Promise<void> => {
    throw new Error('Function not signUp implemented.');
  },
  user: null,
});

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const isUserLocalStorage = localStorage.getItem('currentUser');
    if (isUserLocalStorage) {
      const loggedUser: UserType = JSON.parse(isUserLocalStorage);
      setUser(loggedUser);
    }
  }, []);

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
          const newUser = { ...userData, isLogged: false };
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          setUser(newUser);
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

          // using emailFound to set the current user because at this point the user is already validated
          const loggedUser = { ...emailFound, isLogged: true };
          localStorage.setItem('currentUser', JSON.stringify(loggedUser));
          setUser(loggedUser);
          navigate('/dashboard');
        })
        .finally(() => setIsLoading(false));
    },
    [navigate]
  );

  const addMember = useCallback((userData: UserType) => {
    setIsLoading(true);
    return Requests.postAddMember(userData)
      .then(() => {
        const newUser = { ...userData, isLogged: false };
        setUser(newUser);
      })
      .catch(() => {
        console.error('Sorry something went wrong, please try again later');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const logOff = useCallback(() => {
    setUser(null);
    localStorage.removeItem('currentUser');
    navigate('/login');
  }, [navigate, setUser]);

  const contextValue = useMemo(
    () => ({ addMember, isLoading, logOff, signIn, signUp, user }),
    [addMember, isLoading, logOff, signIn, signUp, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
