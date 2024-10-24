import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useChore } from '../../context/ChoresContext';
import { UserType } from '../../types/UserType';
import SideMenu from '../SideMenu';
import DashboardCard from './DashboardCard';
import { findChoreById, findChoreFrequencyById } from '../../functions/chores';
import { findMemberById, membersPoints } from '../../functions/members';
import { choreMembersByStatus } from '../../functions/choreMembers';
import { ChoreMemberType } from '../../types/ChoresType';

const Dashboard = () => {
  const { members } = useAuth();
  const { chores, choreMembers, updateChoreMemberStatus } = useChore();

  const reservedMembersData =
    members?.reduce<UserType[]>((acc, item) => [item, ...acc], []) || [];
  const limitedMembers = reservedMembersData?.slice(0, 6);
  const viewAllMembers =
    members && members?.length > 6 ? { linkTo: '/members' } : null;

  const reservedChoreMembersData =
    choreMembers?.reduce<ChoreMemberType[]>(
      (acc, item) => [item, ...acc],
      []
    ) || [];
  const limitedChoreMembers = reservedChoreMembersData.slice(0, 4);

  const viewAllChoreMembers =
    choreMembers && choreMembers?.length > 4
      ? { linkTo: '/chores-members' }
      : null;

  const choresUnderReview = choreMembersByStatus(
    choreMembers,
    chores,
    members,
    '3'
  );

  const choresNotStarted = choreMembersByStatus(
    choreMembers,
    chores,
    members,
    '1'
  );

  const handleUpdateChoreMemberStatus = (
    status: string,
    choreMemberId: string
  ) => {
    updateChoreMemberStatus(status, choreMemberId)
      .then(() => toast.success('Status review successfully'))
      .catch(() => toast.error('Something went wrong, try again later'));
  };

  return (
    <main className="align-items-start bg-light d-flex h-100">
      <SideMenu />
      <div className="d-flex flex-wrap gap-3 p-3">
        <DashboardCard
          cardTitle="Family/Group members"
          hasBtnAction
          viewAllLink={viewAllMembers}
        >
          {limitedMembers?.length > 0 ? (
            limitedMembers.map((member: UserType) => (
              <div
                key={member.id}
                className="align-items-center d-flex justify-content-between pb-2"
              >
                <Link to={`/members/${member.id}`}>{member.firstName}</Link>
                <span className="badge text-bg-primary">
                  points: {membersPoints(member.id, choreMembers, chores)}
                </span>
              </div>
            ))
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
              <div>No members found</div>
              <Link className="btn btn-primary btn-sm mt-2" to="/add-member">
                Add your first member
              </Link>
            </div>
          )}
        </DashboardCard>
        <DashboardCard
          cardTitle="Assigned chores"
          viewAllLink={viewAllChoreMembers}
        >
          {limitedChoreMembers.length > 0 &&
            limitedChoreMembers.map((choreMember: ChoreMemberType) => (
              <div
                className="align-items-top d-flex flex-row justify-content-between"
                key={choreMember.id}
              >
                <div className="d-flex row col-md-8">
                  <span>
                    {findChoreById(choreMember.choreId, chores)?.title}
                  </span>
                  <span className="fs-7 text-body-tertiary">
                    {findMemberById(choreMember.memberId, members)?.firstName}
                  </span>
                </div>
                <div>
                  {findChoreFrequencyById(choreMember.choreStatus)?.title}
                </div>
                <div>
                  <span className="badge text-bg-primary">
                    {findChoreById(choreMember.choreId, chores)?.choreValue}
                  </span>
                </div>
              </div>
            ))}
        </DashboardCard>
        <DashboardCard cardTitle="Needs to be reviewed">
          {choresUnderReview.length > 0 &&
            choresUnderReview.map((choreUnderReView) => (
              <div
                className="d-flex justify-content-between mt-2"
                key={choreUnderReView.choreMemberId}
              >
                <div className="col-md-6">{choreUnderReView?.choreTitle}</div>
                <div className="col-md-3">{choreUnderReView?.memberName}</div>
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleUpdateChoreMemberStatus(
                      '4',
                      choreUnderReView.choreMemberId ?? ''
                    )
                  }
                  size="sm"
                >
                  Review
                </Button>
              </div>
            ))}
        </DashboardCard>
        <DashboardCard cardTitle="Chores not started">
          {choresNotStarted.length > 0 &&
            choresNotStarted.map((choreUnderView) => (
              <div
                className="d-flex justify-content-between mt-2"
                key={choreUnderView.choreMemberId}
              >
                <div>{choreUnderView?.choreTitle}</div>
                <div>{choreUnderView?.memberName}</div>
              </div>
            ))}
        </DashboardCard>
      </div>
    </main>
  );
};

export default Dashboard;
