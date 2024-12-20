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
  chores: ChoreType[] | [];
  deleteChore: (id: string) => Promise<void>;
  updateChore: (choreData: ChoreType) => Promise<void>;

  addChoreMember: (choreMember: ChoreMemberType) => Promise<void>;
  choreMembers: ChoreMemberType[] | [];
  deleteChoreMember: (id: string) => Promise<void>;
  updateChoreMemberStatus: (
    status: string,
    choreMemberId: string
  ) => Promise<void>;
  isLoading: boolean;
};

type ChoreProviderType = {
  children: ReactNode;
};

/**
 * ensures that the context has a default value that matches the expected shape (ChoresContextType)
 */
export const ChoreContext = createContext<ChoresContextType>({
  // chores
  addChore: async (): Promise<void> => {
    throw new Error('Function addChore not implemented.');
  },
  chores: [],
  deleteChore: async (): Promise<void> => {
    throw new Error('Function deleteChore not implemented.');
  },
  updateChore: async (): Promise<void> => {
    throw new Error('Function updateChore not implemented.');
  },
  // chore members
  addChoreMember: async (): Promise<void> => {
    throw new Error('Function addChoreMember not implemented.');
  },
  choreMembers: [],
  updateChoreMemberStatus: async (): Promise<void> => {
    throw new Error('Function updateChoreMemberStatus not implemented.');
  },
  deleteChoreMember: async (): Promise<void> => {
    throw new Error('Function deleteChoreMember not implemented.');
  },
  isLoading: false,
});

export const ChoresProvider: FC<ChoreProviderType> = ({ children }) => {
  const [chores, setChores] = useState<ChoreType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const [chore, setChore] = useState<ChoreType>();
  const [choreMember, setChoreMember] = useState<ChoreMemberType | undefined>();

  // list all chores assigned to members
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

  const deleteChoreMember = useCallback(
    (id: string) => {
      setIsLoading(true);
      return Requests.deleteChoreMembers(id)
        .then(() => {
          fetchChoreMembersData();
        })
        .catch(() => {
          throw new Error(
            'Sorry something went wrong while trying to delete this record, please try again later'
          );
        })
        .finally(() => setIsLoading(false));
    },
    [fetchChoreMembersData]
  );

  const contextValue = useMemo(
    () => ({
      addChore,
      chore,
      chores,
      choreMember,
      deleteChore,
      updateChore,

      // chore member
      addChoreMember,
      choreMembers,
      deleteChoreMember,
      updateChoreMemberStatus,
      isLoading,
    }),
    [
      addChore,
      chore,
      chores,
      choreMember,
      deleteChore,
      updateChore,

      // chore member
      addChoreMember,
      choreMembers,
      deleteChoreMember,
      updateChoreMemberStatus,
      isLoading,
    ]
  );

  return (
    <ChoreContext.Provider value={contextValue}>
      {children}
    </ChoreContext.Provider>
  );
};

export const useChore = () => useContext(ChoreContext);
