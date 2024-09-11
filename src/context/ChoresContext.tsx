import {
  createContext,
  ReactNode,
  useMemo,
  FC,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import Requests from '../api';
import { ChoreType } from '../types/ChoresType';
import { useAuth } from './AuthContext';

type ChoresContextType = {
  addChore: (choreData: ChoreType) => Promise<void>;
  isLoading: boolean;
};

type ChoreProviderType = {
  children: ReactNode;
};

/**
 * ensures that the context has a default value that matches the expected shape (ChoresContextType)
 */
export const ChoreContext = createContext<ChoresContextType>({
  addChore: async (): Promise<void> => {
    throw new Error('Function not implemented.');
  },
  isLoading: false,
});

export const ChoresProvider: FC<ChoreProviderType> = ({ children }) => {
  const [chores, setChores] = useState<ChoreType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (!user?.id) return;

    try {
      const choresResponse = await Requests.getAllChores(user.id);
      setChores(choresResponse);
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, user?.id]);

  const addChore = useCallback((choreData: ChoreType) => {
    setIsLoading(true);
    return Requests.postChore(choreData)
      .then(() => {
        setChores((prevChores) => [...prevChores, choreData]);
      })
      .catch(() => {
        throw new Error('Sorry something went wrong, please try again later');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const contextValue = useMemo(
    () => ({
      addChore,
      chores,
      isLoading,
    }),
    [addChore, chores, isLoading]
  );

  return (
    <ChoreContext.Provider value={contextValue}>
      {children}
    </ChoreContext.Provider>
  );
};

export const useChore = () => useContext(ChoreContext);
