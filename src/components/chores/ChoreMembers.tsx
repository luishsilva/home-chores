import { Link } from 'react-router-dom';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import Header from '../Header';
import SideMenu from '../SideMenu';
import { useAuth } from '../../context/AuthContext';
import { useChore } from '../../context/ChoresContext';
import { choreFrequency, choreStatus } from '../../functions/choreConstants';

const ChoreMembers = () => {
  const { user, members } = useAuth();
  const { chores, choreMembers } = useChore();

  const choreFound = (choreId: string) => {
    return chores?.find((chore) => chore.id === choreId);
  };

  const memberFound = (memberId: string) => {
    return members?.find((member) => member.id === memberId);
  };

  const frequencyFound = (typeId: string) => {
    return choreFrequency.find((frequencyType) => frequencyType.id === typeId);
  };

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
          {choreMembers &&
            choreMembers.map((choreMember) => (
              <div className="d-flex" key={choreMember.choreId}>
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
                        {memberFound(choreMember.memberId)?.firstName}
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
                        frequencyFound(choreFound(choreMember.choreId)?.typeId)
                          ?.title
                      }
                    </div>
                    <div className="mb-3">
                      <label className="mt-1" htmlFor="typeId">
                        Chore status
                      </label>
                      <select
                        className="form-control"
                        id="typeId"
                        name="typeId"
                        // onChange={handleSelectChange}
                        value={choreMember.choreStatus}
                      >
                        <option value="">Select chore status</option>
                        {choreStatus &&
                          choreStatus.map((status) => (
                            <option
                              key={status.id}
                              value={choreMember.choreStatus}
                            >
                              {`${status.title} ${choreMember.choreStatus}`}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="card-footer d-flex text-body-secondary">
                    <div className="ms-auto d-flex align-items-center">
                      <Link to={`/members/${choreMember.id}`}>
                        <PencilSquare className="me-4" />
                      </Link>
                      <Trash
                        className="cursor-pointer"
                        // onClick={() => handleShow(member)}
                      />
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

export default ChoreMembers;
