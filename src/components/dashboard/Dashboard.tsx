import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import SideMenu from '../SideMenu';
import DashboardCard from './DashboardCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) {
    navigate('/');
  }
  /* 
   if (user === undefined) {
    return null;
  }
  useEffect(() => {
    navigate('/login');
  }, [user, navigate]); */
  return (
    <main className="d-flex h-100 bg-light">
      <SideMenu />
      <div className="d-flex gap-3 flex-wrap h-100 w-100 p-3">
        <DashboardCard cardTitle="Family/Group members" hasBtnAction>
          <div className="align-items-center d-flex justify-content-between pb-2">
            <div>Lucas</div>
            <div>Points: 0</div>
          </div>
          <div className="align-items-center d-flex justify-content-between pb-2">
            <div>Luisa</div>
            <div>Points: 0</div>
          </div>
          <div className="align-items-center d-flex justify-content-between pb-2">
            <div>Luana</div>
            <div>Points: 0</div>
          </div>
        </DashboardCard>
        <DashboardCard cardTitle="Last Chores">
          <div className="align-items-top d-flex justify-content-between">
            <div className="d-flex row col-md-4">
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
