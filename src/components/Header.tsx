import { Link } from 'react-router-dom';
import { UserType } from '../types/UserType';

type HeaderType = {
  children: React.ReactNode;
  user: UserType | null;
};

const Header: React.FC<HeaderType> = ({ user, children }) => {
  return (
    <div className="align-items-center container-fluid d-flex flex-row justify-content-between p-3">
      {children}
      <div className="align-items-center d-flex">
        <img
          className="user-thumb"
          src="default-user-thumb.png"
          alt="user profile thumbnail"
        />
        {!user?.isLogged && (
          <Link className="" to="/login">
            <span className="ms-2">Login</span>
          </Link>
        )}
        <div className="ms-2">{user?.firstName}</div>
      </div>
    </div>
  );
};

export default Header;
