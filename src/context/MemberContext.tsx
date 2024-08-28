import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  FC,
  useContext,
} from 'react';
import { UserType } from '../types/UserType';
import Requests from '../api';

type MemberContextType = {
  user: UserType | null;
  addMember: (userData: UserType) => Promise<void>;
  isLoading: boolean;
};

type MemberProviderType = {
  children: ReactNode;
};

/**
 * ensures that the context has a default value that matches the expected shape (MemberContextType)
 */
export const MemberContext = createContext<MemberContextType>({
  user: null,
  addMember: async (): Promise<void> => {
    throw new Error('Function not implemented.');
  },
  isLoading: false,
});

export const MemberProvider: FC<MemberProviderType> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const contextValue = useMemo(
    () => ({ addMember, isLoading, user }),
    [addMember, isLoading, user]
  );

  return (
    <MemberContext.Provider value={contextValue}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);
