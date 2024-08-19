import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import SideMenu from './SideMenu';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user?.isUserLogged) {
    navigate('/login');
  }
  /* 
   if (user === undefined) {
    return null;
  }
  useEffect(() => {
    navigate('/login');
  }, [user, navigate]); */

  return (
    <main className="d-flex flex-grow-1 flex-row bg-light">
      <SideMenu />
      <div className="align-items-start d-flex flex-wrap justify-content-center p-3">
        <div className="d-flex flex-row gap-3">
          <div className="border card p-3">
            Family/Group members
            <div className="d-flex flex-column">
              <span>Lucas</span>
              <span>Luisa</span>
              <span>Luana</span>
            </div>
          </div>
          <div className="border card p-3">Last Chores</div>
          <div className="border card p-3">Finished Chores</div>
          <div className="border card p-3">Needs approval</div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
