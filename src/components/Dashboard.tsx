import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <main className="d-flex flex-column flex-grow-1">
      <div className="d-flex align-items-center justify-content-center flex-grow-1 flex-wrap-reverse">
        Dashboard {user?.firstName}
      </div>
    </main>
  );
};

export default Dashboard;
