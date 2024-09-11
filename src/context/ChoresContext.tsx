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
  chores: ChoreType[] | [];
  deleteChore: (id: string) => Promise<void>;
  updateChore: (choreData: ChoreType) => Promise<void>;
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
    throw new Error('Function addChore not implemented.');
  },
  chores: [],
  deleteChore: async (): Promise<void> => {
    throw new Error('Function addChore not implemented.');
  },
  isLoading: false,
  updateChore: async (): Promise<void> => {
    throw new Error('Function updateChore not implemented.');
  },
});

export const ChoresProvider: FC<ChoreProviderType> = ({ children }) => {
  const [chores, setChores] = useState<ChoreType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const [chore, setChore] = useState<ChoreType>();

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

  const addChore = useCallback(
    (choreData: ChoreType) => {
      setIsLoading(true);
      return Requests.postChore(choreData)
        .then(() => {
          setChore(choreData);
          fetchData();
        })
        .catch(() => {
          throw new Error('Sorry something went wrong, please try again later');
        })
        .finally(() => setIsLoading(false));
    },
    [fetchData]
  );

  const updateChore = useCallback(
    (choreData: ChoreType) => {
      setIsLoading(true);
      return Requests.patchChore(choreData)
        .then(() => {
          setChore(choreData);
          fetchData();
        })
        .catch(() => {
          throw new Error('Sorry something went wrong, please try again later');
        })
        .finally(() => setIsLoading(false));
    },
    [fetchData]
  );

  const deleteChore = useCallback(
    (id: string) => {
      setIsLoading(true);
      return Requests.deleteChore(id)
        .then(() => {
          fetchData();
        })
        .catch(() => {
          throw new Error(
            'Sorry something went wrong while trying to delete this record, please try again later'
          );
        })
        .finally(() => setIsLoading(false));
    },
    [fetchData]
  );

  const contextValue = useMemo(
    () => ({
      addChore,
      chores,
      deleteChore,
      isLoading,
      updateChore,
    }),
    [addChore, chores, deleteChore, isLoading, updateChore]
  );

  return (
    <ChoreContext.Provider value={contextValue}>
      {children}
    </ChoreContext.Provider>
  );
};

export const useChore = () => useContext(ChoreContext);
