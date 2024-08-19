import { useAuth } from '../context/AuthContext';
import SideMenu from './SideMenu';

const Chores = () => {
  const { user } = useAuth();
  return (
    <main className="d-flex flex-grow-1 flex-row bg-success">
      <SideMenu />
      <div className="align-items-center d-flex flex-grow-1 flex-wrap justify-content-center">
        Chores {user?.firstName}
      </div>
    </main>
  );
};

export default Chores;
