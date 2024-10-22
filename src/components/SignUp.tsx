import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [formInputValues, setFormInputValues] = useState({
    id: '',
    email: '',
    firstName: '',
    isLogged: false,
    lastName: '',
    password: '',
    thumbnail: '',
  });

  const { signUp, isLoading } = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUpClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    signUp(formInputValues);
    return null;
  };

  return (
    <div className="align-items-center d-flex flex-column login-container justify-content-center">
      <Link to="/">
        <div className="align-items-center d-flex mb-5">
          <img className="logo" src="../../public/house-hand.png" alt="logo" />
          <div className="ms-2">Home Chores</div>
        </div>
      </Link>
      <form className="login-form col-12">
        <div className="mb-3">
          <input
            className="form-control"
            id="firstName"
            name="firstName"
            onChange={handleInputChange}
            placeholder="John"
            type="text"
          />
          <label className="mt-1" htmlFor="firstName">
            First name
          </label>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            id="lastName"
            name="lastName"
            onChange={handleInputChange}
            placeholder="Doe"
            type="text"
          />
          <label className="mt-1" htmlFor="lastName">
            Last name
          </label>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            id="email"
            name="email"
            onChange={handleInputChange}
            placeholder="name@example.com"
            type="email"
          />
          <label className="mt-1" htmlFor="email">
            Email address
          </label>
        </div>
        <div>
          <input
            className="form-control mt-2"
            id="password"
            name="password"
            onChange={handleInputChange}
            placeholder="Password"
            type="password"
          />
          <label className="mt-1" htmlFor="password">
            Password
          </label>
        </div>

        <button
          className="btn btn-primary w-100 py-2 mb-2 mt-3"
          disabled={isLoading}
          onClick={handleSignUpClick}
          type="submit"
        >
          Create account
        </button>
        <span>
          or <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
