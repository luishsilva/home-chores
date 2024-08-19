import { Link } from 'react-router-dom';

const NavItems = () => {
  return (
    <div className="d-flex flex-column justify-content-between flex-grow-1">
      <div className="d-flex flex-column">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/chores">Chores</Link>
      </div>
      <div className="mb-3">
        <Link to="Logoff">Logoff</Link>
      </div>
    </div>
  );
};

export default NavItems;
