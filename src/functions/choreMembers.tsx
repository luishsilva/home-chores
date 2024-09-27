import { ChoreMemberType, ChoreType } from '../types/ChoresType';
import { UserType } from '../types/UserType';
import { findChoreById } from './chores';
import { findMemberById } from './members';

type FilteredChoreMemberType = {
  choreMemberId: string | undefined;
  choreTitle: string | undefined;
  memberId: string | undefined;
  memberName: string | undefined;
};

export const choreMembersByStatus = (
  choreMembers: ChoreMemberType[],
  chores: ChoreType[],
  members: UserType[],
  status: string
): FilteredChoreMemberType[] => {
  const filtered = choreMembers.filter(
    (choreMemberItem) => choreMemberItem.choreStatus === status
  );

  const result = filtered.map((data) => ({
    choreMemberId: data.id,
    choreTitle: findChoreById(data.choreId, chores)?.title,
    memberId: data.memberId,
    memberName: findMemberById(data.memberId, members)?.firstName,
  }));

  return result;
};

export const choresByUserId = (
  choresMembers: ChoreMemberType[],
  memberId: string,
  status: string
) => {
  const totalChores = choresMembers.filter(
    (choreMemberItem) => choreMemberItem.memberId === memberId
  );
  if (!status) {
    return totalChores;
  }
  return totalChores.filter((choreItem) => choreItem.choreStatus === status);
};
