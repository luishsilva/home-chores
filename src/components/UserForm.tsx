import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserType } from '../types/UserType';

type UserFormType = {
  btnSubmitAction: (userData: UserType) => Promise<void>;
  isLoading: boolean;
  member?: UserType | null;
  btnLabel: string | 'Save';
};

const UserForm: React.FC<UserFormType> = ({
  btnLabel,
  btnSubmitAction,
  isLoading,
  member,
}) => {
  const initialValues = {
    email: '',
    firstName: '',
    isLogged: false,
    lastName: '',
    password: '',
    thumbnail: '',
  };

  const [formInputValues, setFormInputValues] = useState(initialValues);

  useEffect(() => {
    if (member) {
      setFormInputValues(member);
    }
  }, [member]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    btnSubmitAction(formInputValues).then(() => {
      setFormInputValues(initialValues);
      toast.success('Action successfully executed.');
    });
  };

  const { firstName, lastName, email, password } = formInputValues;

  return (
    <form className="login-form col-6">
      <div className="mb-3">
        <label className="mt-1" htmlFor="firstName">
          First name
        </label>
        <input
          className="form-control"
          id="firstName"
          name="firstName"
          onChange={handleInputChange}
          placeholder="John"
          type="text"
          value={firstName}
        />
      </div>
      <div className="mb-3">
        <label className="mt-1" htmlFor="lastName">
          Last name
        </label>
        <input
          className="form-control"
          id="lastName"
          name="lastName"
          onChange={handleInputChange}
          placeholder="Doe"
          type="text"
          value={lastName}
        />
      </div>
      <div className="mb-3">
        <label className="mt-1" htmlFor="email">
          Email address
        </label>
        <input
          className="form-control"
          id="email"
          name="email"
          onChange={handleInputChange}
          placeholder="name@example.com"
          type="email"
          value={email}
        />
      </div>
      <div>
        <label className="mt-1" htmlFor="password">
          Password
        </label>
        <input
          className="form-control mt-2"
          id="password"
          name="password"
          onChange={handleInputChange}
          placeholder="Password"
          type="password"
          value={password}
        />
      </div>
      <button
        className="btn btn-primary w-100 py-2 mb-2 mt-3"
        disabled={isLoading}
        onClick={handleBtnSubmitClick}
        type="submit"
      >
        {btnLabel}
      </button>
    </form>
  );
};

export default UserForm;
