import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import toast from 'react-hot-toast';
import SideMenu from '../SideMenu';
import { useAuth } from '../../context/AuthContext';

const AddMember = () => {
  const initialValues = {
    email: '',
    firstName: '',
    isLogged: false,
    lastName: '',
    password: '',
    thumbnail: '',
  };

  const [formInputValues, setFormInputValues] = useState(initialValues);

  const { addMember, isLoading } = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddMemberClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    addMember(formInputValues).then(() => {
      setFormInputValues(initialValues);
      toast.success('Member added successfully');
    });
  };

  return (
    <main className="d-flex h-100 bg-light">
      <SideMenu />
      <div className="d-flex flex-wrap h-100 w-100 p-3 align-items-center justify-content-center">
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
              value={formInputValues.firstName}
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
              value={formInputValues.lastName}
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
              value={formInputValues.email}
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
              value={formInputValues.password}
            />
          </div>
          <button
            className="btn btn-primary w-100 py-2 mb-2 mt-3"
            disabled={isLoading}
            onClick={handleAddMemberClick}
            type="submit"
          >
            Add Member
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddMember;
