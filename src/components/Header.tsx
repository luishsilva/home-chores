import { Link } from 'react-router-dom';
import { UserType } from '../types/UserType';

type HeaderType = {
  user: UserType | null;
  linkAction: {
    title: string;
    to: string;
  };
};

const Header: React.FC<HeaderType> = ({ user, linkAction }) => {
  return (
    <div className="align-items-center container-fluid d-flex flex-row justify-content-between p-3">
      <Link className="btn btn-primary" to={linkAction.to}>
        {linkAction.title}
      </Link>
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
