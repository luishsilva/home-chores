import { ChoreMemberType, ChoreType } from '../types/ChoresType';
import { UserType } from '../types/UserType';

export const findMemberById = (memberId: string, members: UserType[]) => {
  return members?.find((member: { id: string }) => member.id === memberId);
};

export const membersPoints = (
  memberId: string,
  choreMembers: ChoreMemberType[],
  chores: ChoreType[]
) => {
  const filteredChoreMembers = choreMembers.filter(
    (choreMemberItem) =>
      choreMemberItem.memberId === memberId &&
      choreMemberItem.choreStatus === '4'
  );
  const result = filteredChoreMembers.map((chore) => {
    return chores.find((choreItem) => choreItem.id === chore.choreId);
  });
  return result.reduce(
    (acc, item) => acc + parseInt(item?.choreValue?.toString() || '0', 10),
    0
  );
};
