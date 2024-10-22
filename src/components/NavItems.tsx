import { NavLink } from 'react-router-dom';
import {
  CardChecklist,
  ClipboardData,
  People,
  PersonVcard,
} from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';

const NavItems = () => {
  const { logOff } = useAuth();

  return (
    <div className="d-flex flex-column justify-content-between h-100 nav-items-height align-items-center">
      <div className="d-flex flex-column">
        <NavLink
          className={({ isActive }) =>
            `nav-link${!isActive ? ' nav-link-unselected' : ''}`
          }
          to="/dashboard"
        >
          <div className="d-flex align-items-center">
            <ClipboardData className=" me-1" /> <div>Dashboard</div>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `nav-link${!isActive ? ' nav-link-unselected' : ''} mt-2`
          }
          to="/members"
        >
          <div className="d-flex align-items-center">
            <People className=" me-1" /> <span>Members</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `nav-link${!isActive ? ' nav-link-unselected' : ''} mt-2`
          }
          to="/chores"
        >
          <div className="d-flex align-items-center">
            <CardChecklist className=" me-1" /> <span>Chores</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `nav-link${!isActive ? ' nav-link-unselected' : ''} mt-2`
          }
          to="/chores-members"
        >
          <div className="d-flex align-items-center">
            <PersonVcard className=" me-1" /> <span>Chores/Members</span>
          </div>
        </NavLink>
      </div>
      <div className="mb-3">
        <button className="btn btn-danger" type="button" onClick={logOff}>
          Logoff
        </button>
      </div>
    </div>
  );
};

export default NavItems;
