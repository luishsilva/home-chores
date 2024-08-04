import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
  const [formInputValues, setFormInputValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const authContext = useContext(AuthContext);
  const { user, signup } = authContext;

  const nagivate = useNavigate();

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
    signup(formInputValues);

    if (user) {
      console.log(user);
      nagivate('/login');
    }
    return null;
  };

  return (
    <div className="align-items-center d-flex login-container justify-content-center">
      <form className="login-form col-12">
        <div className="mb-3">
          <input
            className="form-control"
            id="firstName"
            name="firstName"
            onChange={handleInputChange}
            placeholder="John"
            type="First name"
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
            type="Last name"
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