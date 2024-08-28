import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavItems = () => {
  const { logOff } = useAuth();

  return (
    <div className="d-flex flex-column justify-content-between flex-grow-1">
      <div className="d-flex flex-column">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-member">Add Members</Link>
        <Link to="/chores">Chores</Link>
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
