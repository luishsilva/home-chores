import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserType } from '../types/UserType';

type UserFormType = {
  btnSubmitAction: (userData: UserType) => Promise<void>;
  isLoading: boolean;
  members: UserType[] | null;
};

const UserForm: React.FC<UserFormType> = ({
  btnSubmitAction,
  isLoading,
  members,
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

  const params = useParams();

  useEffect(() => {
    if (params.memberId) {
      const foundMember = members?.find(
        (member) => member.id === params.memberId
      );

      if (foundMember) {
        const { id, ...memberWithoutId } = foundMember;
        setFormInputValues(memberWithoutId);
      }
    }
  }, [members, params.memberId]);

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
      toast.success('Member added successfully');
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
        Add Member
      </button>
    </form>
  );
};

export default UserForm;
