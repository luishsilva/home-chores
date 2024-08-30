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
import { UserMemberType, UserSignInType, UserType } from '../types/UserType';
import Requests from '../api';

type AuthContextType = {
  addMember: (userData: UserType) => Promise<void>;
  isLoading: boolean;
  logOff: () => void;
  signIn: (userData: UserSignInType) => Promise<void>;
  signUp: (userData: UserType) => Promise<void>;
  user: UserType | null;
  members: UserType[] | null;
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
  members: null,
});

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<UserType[] | null>(null);

  const fetchData = async () => {
    const isUserLocalStorage = localStorage.getItem('currentUser');
    if (isUserLocalStorage) {
      const loggedUser: UserType = JSON.parse(isUserLocalStorage);
      setUser(loggedUser);
    }

    try {
      const usersResponse = await Requests.getAllUsers();

      const membersResponse = await Requests.getUserGroupMembers();
      // Merge members user with users table
      const matchingMembers = membersResponse.reduce(
        (acc: UserType[], member: UserMemberType) => {
          const membersData = usersResponse.filter(
            (userList: UserType) => userList?.id === member?.userId
          );
          return acc.concat(membersData);
        },
        []
      );

      setMembers(matchingMembers);
    } catch (error) {
      throw new Error(`Error fetching data:${error}`);
    }
  };

  useEffect(() => {
    fetchData();
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
          throw new Error('Sorry something went wrong, please try again later');
        })
        .finally(() => setIsLoading(false));
    },
    [navigate]
  );

  const signIn = useCallback(
    async (userData: UserSignInType) => {
      setIsLoading(true);
      const { email, password } = userData;

      try {
        const response = await Requests.getAllUsers();
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

        const loggedUser = { ...emailFound, isLogged: true };
        localStorage.setItem('currentUser', JSON.stringify(loggedUser));
        setUser(loggedUser);

        await fetchData();

        navigate('/dashboard');
      } catch (error) {
        throw new Error(`Error please try again later ${error}`);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const addMember = useCallback((userData: UserType) => {
    setIsLoading(true);
    return Requests.postAddMember(userData)
      .then(() => {
        const newUser = { ...userData, isLogged: false };
        setUser(newUser);
        fetchData();
      })
      .catch(() => {
        throw new Error('Sorry something went wrong, please try again later');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const logOff = useCallback(() => {
    setUser(null);
    setMembers(null);
    localStorage.removeItem('currentUser');
    navigate('/login');
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      addMember,
      isLoading,
      logOff,
      signIn,
      signUp,
      user,
      members,
    }),
    [addMember, isLoading, logOff, signIn, signUp, user, members]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
