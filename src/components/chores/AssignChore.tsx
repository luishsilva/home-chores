import { useState } from 'react';
import { useChore } from '../../context/ChoresContext';
import { useAuth } from '../../context/AuthContext';
import SideMenu from '../SideMenu';

const AssignChore = () => {
  const initialValues = {
    id: '',
    memberId: '',
    choreId: '',
    choreStatus: '',
  };

  const [formInputValues, setFormInputValues] = useState(initialValues);
  const { isLoading, chores, addChoreMember } = useChore();
  const { members } = useAuth();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBtnSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    addChoreMember(formInputValues);
  };

  const { choreId, memberId } = formInputValues;

  return (
    <main className="d-flex h-100 bg-light">
      <SideMenu />
      <div className="d-flex flex-wrap flex-column h-100 w-100 p-3 align-items-center justify-content-center">
        <form className="login-form col-6">
          <div className="mb-3">
            <label className="mt-1" htmlFor="firstName">
              Member
            </label>
            <select
              className="form-control"
              id="memberId"
              name="memberId"
              onChange={handleSelectChange}
              value={memberId}
            >
              <option value="">Select chore type</option>
              {members &&
                members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.firstName}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="mt-1" htmlFor="firstName">
              Chore
            </label>
            <select
              className="form-control"
              id="choreId"
              name="choreId"
              onChange={handleSelectChange}
              value={choreId}
            >
              <option value="">Select chore type</option>
              {chores &&
                chores.map((chore) => (
                  <option key={chore.id} value={chore.id}>
                    {chore.title}
                  </option>
                ))}
            </select>
          </div>
          <button
            className="btn btn-primary w-100 py-2 mb-2 mt-3"
            disabled={isLoading}
            onClick={handleBtnSubmitClick}
            type="submit"
          >
            Assign chore
          </button>
        </form>
      </div>
    </main>
  );
};

export default AssignChore;
