import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';
import SideMenu from '../SideMenu';
import { UserType } from '../../types/UserType';
import ConfirmModal from '../ConfirmModal';
import Header from '../Header';

const Chores = () => {
  const { deleteMember, members, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<UserType>();
  const handleClose = () => setShowModal(false);
  const handleShow = (member: UserType) => {
    setSelectedMember(member);
    setShowModal(true);
  };
  const handleDelete = () => {
    if (selectedMember && selectedMember.id) {
      deleteMember(selectedMember.id).then(() => {
        setShowModal(false);
      });
    }
  };

  const linkAction = {
    title: 'Add Chore',
    to: '/add-chore',
  };

  return (
    <>
      <ConfirmModal
        handleClose={handleClose}
        handleConfirm={handleDelete}
        show={showModal}
        text={`Are you sure you want to delete the ${selectedMember?.firstName.toLocaleUpperCase()} from this group?`}
        title="Delete Member"
      />
      <main className="align-items-start bg-light d-flex h-100">
        <SideMenu />
        <div className="d-flex flex-column h-100 w-100">
          <Header user={user} linkAction={linkAction} />
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
                          <PencilSquare className="me-4" />
                        </Link>
                        <Trash
                          className="cursor-pointer"
                          onClick={() => handleShow(member)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Chores;
