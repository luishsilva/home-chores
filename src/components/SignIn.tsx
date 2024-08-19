import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const SignIn = () => {
  const [formInputValues, setFormInputValues] = useState({
    email: '',
    password: '',
  });

  const { signIn, isLoading } = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    signIn({
      email: formInputValues.email,
      password: formInputValues.password,
    });
  };

  return (
    <div className="align-items-center d-flex login-container justify-content-center">
      <form className="login-form col-12">
        <div className="mb-3">
          <input
            className="form-control"
            id="login-email"
            name="email"
            onChange={handleInputChange}
            placeholder="name@example.com"
            type="email"
          />
          <label className="mt-1" htmlFor="login-email">
            Email address
          </label>
        </div>
        <div>
          <input
            type="password"
            className="form-control mt-2"
            id="login-password"
            name="password"
            onChange={handleInputChange}
            placeholder="Password"
          />
          <label className="mt-1" htmlFor="login-password">
            Password
          </label>
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button
          className="btn btn-primary w-100 py-2 mb-2"
          disabled={isLoading}
          onClick={handleSignIn}
          type="submit"
        >
          Sign in
        </button>
        <span>
          Not a member? <Link to="/signup">Sign up</Link>
        </span>
        <p className="mt-5 text-body-secondary text-center">
          &copy; 2024–{currentYear}
        </p>
      </form>
    </div>
  );
};

export default SignIn;