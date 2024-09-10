import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';
import { useChore } from '../../context/ChoresContext';
import SideMenu from '../SideMenu';
import { UserType } from '../../types/UserType';
import { ChoreType } from '../../types/ChoresType';
import ConfirmModal from '../ConfirmModal';
import Header from '../Header';
import choreFrequency from '../../functions/choreFrequency';

const Chores = () => {
  const { user } = useAuth();
  const { chores } = useChore();
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<UserType>();

  const handleClose = () => setShowModal(false);
  const handleShow = (chore: ChoreType) => {
    // setSelectedMember(member);
    // setShowModal(true);
  };
  const handleDelete = () => {
    if (selectedMember && selectedMember.id) {
      /* deleteMember(selectedMember.id).then(() => {
        setShowModal(false);
      }); */
    }
  };

  const linkAction = {
    title: 'Add Chore',
    to: '/add-chore',
  };

  const getChoreType = (choreTypeId: string) => {
    const choreTypeFound = choreFrequency.find(
      (item) => item.id === choreTypeId
    );
    return choreTypeFound;
  };
  const reservedData =
    chores?.reduce((acc: ChoreType, item: ChoreType) => [item, ...acc], []) ||
    [];

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
            {reservedData &&
              reservedData.map((chore: ChoreType) => (
                <div className="d-flex" key={chore.id}>
                  <div className="card members-card">
                    <div className="card-header fw-bold">{chore.title}</div>
                    <div className="card-body">
                      <div>
                        <div className="d-flex pb-2">
                          <div>Chore value:</div>
                          <span className="badge text-bg-success ms-2">
                            {chore.choreValue}
                          </span>
                        </div>
                        <div className="p-2">
                          <div>Description:</div>
                          <div className="border chores-description p-2 rounded">
                            {chore.description}
                          </div>
                        </div>
                        <div className="p-2">
                          <div>
                            Chore type:
                            <span className="p-2">
                              {getChoreType(chore.type)?.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer d-flex text-body-secondary">
                      <div className="ms-auto d-flex align-items-center">
                        <Link to={`/chores/${chore.id}`}>
                          <PencilSquare className="me-4" />
                        </Link>
                        <Trash
                          className="cursor-pointer"
                          onClick={() => handleShow(chore)}
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
