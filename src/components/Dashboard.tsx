import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user?.isUserLogged) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <main className="d-flex flex-column flex-grow-1">
      <div className="d-flex align-items-center justify-content-center flex-grow-1 flex-wrap-reverse">
        Dashboard {user?.firstName}
      </div>
    </main>
  );
};

export default Dashboard;
