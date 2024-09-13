import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavItems = () => {
  const { logOff } = useAuth();

  return (
    <div className="d-flex flex-column justify-content-between h-100 nav-items-height align-items-center">
      <div className="d-flex flex-column">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/members">Members</Link>
        <Link to="/chores">Chores</Link>
        <Link to="/chores-members">Chores/Members</Link>
      </div>
      <div className="mb-3">
        <button type="button" onClick={logOff}>
          Logoff
        </button>
      </div>
    </div>
  );
};

export default NavItems;
