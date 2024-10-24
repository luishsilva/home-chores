import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';
import { useChore } from '../../context/ChoresContext';
import SideMenu from '../SideMenu';
import { ChoreType } from '../../types/ChoresType';
import ConfirmModal from '../ConfirmModal';
import Header from '../Header';
import { choreFrequency } from '../../functions/choreConstants';

const Chores = () => {
  const { user } = useAuth();
  const { chores, deleteChore } = useChore();
  const [showModal, setShowModal] = useState(false);
  const [selectedChore, setSelectedChore] = useState<ChoreType>();

  const handleClose = () => setShowModal(false);
  const handleShow = (chore: ChoreType) => {
    setSelectedChore(chore);
    setShowModal(true);
  };
  const handleDelete = () => {
    if (selectedChore && selectedChore.id) {
      deleteChore(selectedChore.id).then(() => {
        setShowModal(false);
      });
    }
  };

  const getChoreType = (choreTypeId: string) => {
    const choreTypeFound = choreFrequency.find(
      (item) => item.id === choreTypeId
    );
    return choreTypeFound;
  };
  const reservedData =
    chores?.reduce((acc: ChoreType[], item: ChoreType) => [item, ...acc], []) ||
    [];

  return (
    <>
      <ConfirmModal
        handleClose={handleClose}
        handleConfirm={handleDelete}
        show={showModal}
        text={`Are you sure you want to delete the ${selectedChore?.title.toUpperCase()} ?`}
        title="Delete Chore"
      />
      <main className="align-items-start bg-light d-flex h-100">
        <SideMenu />
        <div className="d-flex flex-column h-100 w-100">
          <Header user={user}>
            <div>
              <Link className="btn btn-primary" to="/add-chore">
                Add Chore
              </Link>
            </div>
          </Header>
          <div className="d-flex flex-wrap gap-3 p-3 overflow-auto">
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
                              {getChoreType(chore.typeId)?.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer d-flex text-body-secondary">
                      <div className="ms-auto d-flex align-items-center">
                        <Link to={`/chore/${chore.id}`}>
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
