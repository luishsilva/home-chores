import SideMenu from '../SideMenu';
import { useAuth } from '../../context/AuthContext';

const ListMembers = () => {
  const { members } = useAuth();

  return (
    <main className="d-flex h-100 bg-light">
      <SideMenu />
      {members &&
        members.map((member) => (
          <div className="d-flex gap-3 p-3">
            <div className="card flex-wrap members-card">
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
                  <span className="badge text-bg-secondary">4</span>
                </div>
                <div className="d-flex justify-content-between pb-2">
                  Unfinished tasks{' '}
                  <span className="badge text-bg-secondary">4</span>
                </div>
                <div className="d-flex justify-content-between pb-2">
                  Total points{' '}
                  <span className="badge text-bg-secondary">4</span>
                </div>
              </div>
              <div className="card-footer text-body-secondary" />
            </div>
          </div>
        ))}
    </main>
  );
};

export default ListMembers;
