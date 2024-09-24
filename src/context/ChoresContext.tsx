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
import { ChoreType, ChoreMemberType } from '../types/ChoresType';
import { useAuth } from './AuthContext';

type ChoresContextType = {
  addChore: (choreData: ChoreType) => Promise<void>;
  addChoreMember: (choreMember: ChoreMemberType) => Promise<void>;
  chores: ChoreType[] | [];
  choreMembers: ChoreMemberType[] | [];
  deleteChore: (id: string) => Promise<void>;
  updateChore: (choreData: ChoreType) => Promise<void>;
  isLoading: boolean;
  updateChoreMemberStatus: (
    status: string,
    choreMemberId: string
  ) => Promise<void>;
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
  addChoreMember: async (): Promise<void> => {
    throw new Error('Function addChoreMember not implemented.');
  },
  chores: [],
  choreMembers: [],
  deleteChore: async (): Promise<void> => {
    throw new Error('Function deleteChore not implemented.');
  },
  isLoading: false,
  updateChore: async (): Promise<void> => {
    throw new Error('Function updateChore not implemented.');
  },
  updateChoreMemberStatus: async (): Promise<void> => {
    throw new Error('Function updateChoreMemberStatus not implemented.');
  },
});

export const ChoresProvider: FC<ChoreProviderType> = ({ children }) => {
  const [chores, setChores] = useState<ChoreType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const [chore, setChore] = useState<ChoreType>();
  const [choreMember, setChoreMember] = useState<ChoreMemberType | undefined>();

  // list all chores
  const [choreMembers, setChoreMembers] = useState<ChoreMemberType[]>([]);

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

  const fetchChoreMembersData = useCallback(async () => {
    try {
      if (user?.id) {
        const choresData = await Requests.getAllChoreMembers(user?.id);
        setChoreMembers(choresData);
      }
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchChoreMembersData();
  }, [fetchChoreMembersData]);

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

  const addChoreMember = useCallback(
    (choreMemberData: ChoreMemberType) => {
      if (user?.id) {
        setIsLoading(true);
        return Requests.postChoreMember(choreMemberData, user?.id)
          .then(() => {
            setChoreMember(choreMemberData);
            fetchChoreMembersData();
          })
          .catch(() => {
            throw new Error(
              'Sorry something went wrong, please try again later'
            );
          })
          .finally(() => setIsLoading(false));
      }
      return Promise.resolve();
    },
    [fetchChoreMembersData, setChoreMember, user?.id]
  );

  const updateChoreMemberStatus = useCallback(
    (status: string, choreMemberId: string) => {
      setIsLoading(true);
      return Requests.patchChoreMemberStatus(status, choreMemberId, user?.id)
        .then(() => {
          fetchChoreMembersData();
          setChoreMembers(choreMembers);
        })
        .catch(() => {
          throw new Error(
            'Sorry, something went wrong, please try again later.'
          );
        })
        .finally(() => setIsLoading(false));
    },
    [choreMembers, fetchChoreMembersData, user?.id]
  );

  const contextValue = useMemo(
    () => ({
      addChore,
      addChoreMember,
      chores,
      choreMembers,
      deleteChore,
      isLoading,
      updateChore,
      updateChoreMemberStatus,
    }),
    [
      addChore,
      addChoreMember,
      chores,
      choreMembers,
      deleteChore,
      isLoading,
      updateChore,
      updateChoreMemberStatus,
    ]
  );

  return (
    <ChoreContext.Provider value={contextValue}>
      {children}
    </ChoreContext.Provider>
  );
};

export const useChore = () => useContext(ChoreContext);
