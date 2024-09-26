import { ChoreMemberType, ChoreType } from '../types/ChoresType';
import { UserType } from '../types/UserType';

export const findMemberById = (memberId: string, members: UserType[]) => {
  return members?.find((member: { id: string }) => member.id === memberId);
};

export const membersByPoints = (
  memberId: string,
  choreMembers: ChoreMemberType[],
  chores: ChoreType[]
) => {
  const filteredChoreMembers = choreMembers.filter(
    (member) => member.memberId === '8e0b'
  );
  const result = filteredChoreMembers.map((chore) => {
    return chores.find((choreItem) => choreItem.id === chore.choreId);
  });
  return result.reduce(
    (acc, item) => parseInt(acc) + (parseInt(item?.choreValue) || 0),
    0
  );
};
