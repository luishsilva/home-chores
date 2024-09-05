import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import SideMenu from '../SideMenu';
import { useAuth } from '../../context/AuthContext';
import Header from '../Header';

const ListMembers = () => {
  const { members, user } = useAuth();

  return (
    <main className="align-items-start bg-light d-flex h-100">
      <SideMenu />
      <div className="d-flex flex-column h-100 w-100">
        <Header user={user} />
        <div className="d-flex flex-wrap gap-3 p-3">
          {members &&
            members.map((member) => (
              <div className="d-flex" key={member.id}>
                <div className="card members-card">
                  <div className="card-header">
                    <img
                      className="user-thumb me-2"
                      src="default-user-thumb.png"
                      alt="user profile thumbnail"
                    />
                    {member.firstName}
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between pb-2">
                      <div>Total tasks</div>
                      <span className="badge text-bg-primary">4</span>
                    </div>
                    <div className="d-flex justify-content-between pb-2">
                      Unfinished tasks{' '}
                      <span className="badge text-bg-warning">4</span>
                    </div>
                    <div className="d-flex justify-content-between pb-2">
                      Total points{' '}
                      <span className="badge text-bg-success">4</span>
                    </div>
                  </div>
                  <div className="card-footer d-flex text-body-secondary">
                    <div className="ms-auto d-flex align-items-center">
                      <Link to={`/members/${member.id}`}>
                        <PencilSquare className="me-3" />
                      </Link>
                      <Trash />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default ListMembers;
