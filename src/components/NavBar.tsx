import { Link } from 'react-router-dom';

const NavBar = () => (
  <header>
    <nav className="navbar navbar-light bg-light px-4 w-100">
      <div className="container-fluid d-flex flex-row justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          <div className="align-items-center d-flex">
            <img
              className="logo"
              src="../../public/house-hand.png"
              alt="logo"
            />
            <div className="ms-2">Home Chores</div>
          </div>
        </Link>
        <div className="align-items-center d-flex">
          <img
            className="user-thumb"
            src="default-user-thumb.png"
            alt="user profile thumbnail"
          />
          <Link className="" to="/login">
            <span className="ms-2">Login</span>
          </Link>
        </div>
        {/* 
                        Will display if user is logged
                        Signed in as: <a href="#login">Mark Otto</a> 
                    */}
      </div>
    </nav>
  </header>
);

export default NavBar;
