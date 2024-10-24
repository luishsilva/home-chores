import { useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useChore } from '../../context/ChoresContext';
import { useAuth } from '../../context/AuthContext';
import SideMenu from '../SideMenu';

type ChoreMemberFormErrorsType = {
  memberId?: string;
  choreId?: string;
};

const AssignChore = () => {
  const initialValues = {
    id: '',
    memberId: '',
    choreId: '',
    choreStatus: '',
    groupOwnerId: '',
  };

  const [formInputValues, setFormInputValues] = useState(initialValues);
  const [errors, setErrors] = useState<ChoreMemberFormErrorsType>({});
  const { isLoading, chores, addChoreMember } = useChore();
  const { members } = useAuth();

  const validationSchema = yup.object().shape({
    memberId: yup.string().required('Member is required'),
    choreId: yup.string().required('Chore is required'),
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrorState) => ({
      ...prevErrorState,
      [name]: null,
    }));
  };

  const handleBtnSubmitClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formInputValues, { abortEarly: false });
      setErrors({});

      addChoreMember(formInputValues).then(() =>
        toast.success('Chore assigned successfully')
      );
    } catch (err) {
      const validationErrors: Record<string, string> = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
      }
      setErrors(validationErrors);
    }
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
              <option value="">Select Member</option>
              {members &&
                members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.firstName}
                  </option>
                ))}
            </select>
            {errors.memberId && (
              <p style={{ color: 'red' }}>{errors.memberId}</p>
            )}
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
            {errors.choreId && <p style={{ color: 'red' }}>{errors.choreId}</p>}
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
