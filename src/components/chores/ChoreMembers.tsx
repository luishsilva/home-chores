import { Link } from 'react-bootstrap-icons';
import Header from '../Header';
import SideMenu from '../SideMenu';
import { useAuth } from '../../context/AuthContext';

const ChoreMembers = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <main className="align-items-start bg-light d-flex h-100">
      <SideMenu />
      <div className="d-flex flex-column h-100 w-100">
        <Header user={user}>
          <Link className="btn btn-primary ms-2" to="/assign-chore">
            Assign Chore to a member
          </Link>
        </Header>
        <div className="d-flex flex-wrap gap-3 p-3">
          <h6>List assign</h6>
        </div>
      </div>
    </main>
  );
};

export default ChoreMembers;
