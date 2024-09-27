import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';
import Header from '../Header';
import SideMenu from '../SideMenu';
import { useAuth } from '../../context/AuthContext';
import { useChore } from '../../context/ChoresContext';
import { choreFrequency, choreStatus } from '../../functions/choreConstants';
import ConfirmModal from '../ConfirmModal';
import { ChoreMemberType } from '../../types/ChoresType';

const ChoreMembers = () => {
  const { user, members } = useAuth();
  const {
    chores,
    choreMembers,
    updateChoreMemberStatus,
    deleteChoreMember,
    isLoading,
  } = useChore();
  const [showModal, setShowModal] = useState(false);
  const [selectedChoreMember, setSelectedChoreMember] =
    useState<ChoreMemberType>();

  const choreFound = (choreId: string) => {
    return chores?.find((chore) => chore.id === choreId);
  };

  const memberFound = (memberId: string) => {
    return members?.find((member) => member.id === memberId);
  };

  const frequencyFound = (typeId: string) => {
    return choreFrequency.find((frequencyType) => frequencyType.id === typeId);
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    choreMemberId: string
  ) => {
    const { value } = event.target;
    const [statusId] = value.split('-');
    updateChoreMemberStatus(statusId, choreMemberId)
      .then(() => toast.success('Status changed successfully'))
      .catch(() =>
        toast.error('Sorry, something went wrong, please try again later')
      );
  };

  const handleClose = () => setShowModal(false);
  const handleShow = (choreMember: ChoreMemberType) => {
    setSelectedChoreMember(choreMember);
    setShowModal(true);
  };
  const handleDelete = () => {
    if (selectedChoreMember && selectedChoreMember.id) {
      deleteChoreMember(selectedChoreMember.id).then(() => {
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
        text="Are you sure you want to delete ?"
        title="Delete chore assignment"
      />
      <main className="align-items-start bg-light d-flex h-100">
        <SideMenu />
        <div className="d-flex flex-column h-100 w-100">
          <Header user={user}>
            <Link className="btn btn-primary ms-2" to="/assign-chore">
              Assign Chore to a member
            </Link>
          </Header>
          <div className="d-flex flex-wrap gap-3 p-3">
            {choreMembers &&
              choreMembers.map((choreMember) => (
                <div className="d-flex" key={choreMember.id}>
                  <div className="card members-card">
                    <div className="d-flex justify-content-between card-header fw-bold">
                      {choreFound(choreMember.choreId)?.title}
                      <span className="badge fs-6 text-bg-secondary">
                        {choreFound(choreMember.choreId)?.choreValue}
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-row justify-content-between pb-2">
                        <div>
                          <div>Assign to:</div>
                          <img
                            className="user-thumb me-2"
                            src="default-user-thumb.png"
                            alt="user profile thumbnail"
                          />
                          <span className="fw-bold">
                            {memberFound(choreMember.memberId)?.firstName}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column pb-2">
                        <div>Description</div>
                        <div className="border chores-description p-2">
                          {choreFound(choreMember.choreId)?.description}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between pb-2">
                        Frequency:{' '}
                        {
                          frequencyFound(
                            choreFound(choreMember.choreId)?.typeId ?? ''
                          )?.title
                        }
                      </div>
                      <div className="mb-3">
                        <label className="mt-1" htmlFor="choreStatus">
                          Chore status
                        </label>
                        <select
                          className="form-control"
                          id="choreStatus"
                          name="choreStatus"
                          onChange={(e) =>
                            handleSelectChange(e, choreMember.id)
                          }
                          value={choreMember.choreStatus}
                        >
                          <option value="">Select chore status</option>
                          {choreStatus &&
                            choreStatus.map((status) => (
                              <option key={status.id} value={status.id}>
                                {status.title}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="card-footer d-flex text-body-secondary">
                      <div className="ms-auto d-flex align-items-center">
                        <Trash
                          className="cursor-pointer"
                          onClick={() => handleShow(choreMember)}
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

export default ChoreMembers;
