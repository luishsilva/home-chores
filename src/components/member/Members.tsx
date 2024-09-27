import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { choresByUserId } from '../../functions/choreMembers';
import { membersPoints } from '../../functions/members';
import { useAuth } from '../../context/AuthContext';
import { useChore } from '../../context/ChoresContext';
import { UserType } from '../../types/UserType';
import ConfirmModal from '../ConfirmModal';
import Header from '../Header';
import SideMenu from '../SideMenu';

const ListMembers = () => {
  const { deleteMember, members, user } = useAuth();
  const { chores, choreMembers } = useChore();

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
          <Header user={user}>
            <Link className="btn btn-primary" to="/add-member">
              Add member
            </Link>
          </Header>
          <div className="d-flex flex-wrap gap-3 p-3">
            {members &&
              members.map((member: UserType) => (
                <div className="d-flex" key={member.id}>
                  <div className="card members-card">
                    <div className="card-header fw-bold">
                      <img
                        className="user-thumb me-2"
                        src="default-user-thumb.png"
                        alt="user profile thumbnail"
                      />
                      {member.firstName}
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between pb-2">
                        <div>Number of chores</div>
                        <span className="badge text-bg-primary">
                          {choresByUserId(choreMembers, member.id, '').length}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between pb-2">
                        Unfinished chores{' '}
                        <span className="badge text-bg-warning">
                          {choresByUserId(choreMembers, member.id, '1').length}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between pb-2">
                        Total points{' '}
                        <span className="badge text-bg-success">
                          {membersPoints(member.id, choreMembers, chores)}
                        </span>
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

export default ListMembers;
