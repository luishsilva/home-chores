import { useAuth } from '../../context/AuthContext';
import { UserType } from '../../types/UserType';
import SideMenu from '../SideMenu';
import DashboardCard from './DashboardCard';

const Dashboard = () => {
  const { members } = useAuth();

  return (
    <main className="align-items-start bg-light d-flex h-100">
      <SideMenu />
      <div className="d-flex flex-wrap gap-3 p-3">
        <DashboardCard cardTitle="Family/Group members" hasBtnAction>
          {members &&
            members.map((member: UserType) => (
              <div
                key={member.id}
                className="align-items-center d-flex justify-content-between pb-2"
              >
                <div>{member.firstName}</div>
                <div>points: 0</div>
              </div>
            ))}
        </DashboardCard>
        <DashboardCard cardTitle="Last Chores">
          <div className="align-items-top d-flex justify-content-between">
            <div className="col-md-4 d-flex row">
              <span>Make the Bed</span>
              <span className="fs-7 text-body-tertiary">Lucas</span>
            </div>
            <div>Daily Chore</div>
            <div>Value: 1</div>
          </div>
        </DashboardCard>
        <DashboardCard cardTitle="Finished Chores"> </DashboardCard>
        <DashboardCard cardTitle="Needs approval"> </DashboardCard>
      </div>
    </main>
  );
};

export default Dashboard;
