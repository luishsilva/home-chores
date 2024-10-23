import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';

type TypeErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

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

  const [errors, setErrors] = useState<TypeErrors>({});

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSignUpClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formInputValues, { abortEarly: false });
      setErrors({});

      signUp(formInputValues);
    } catch (err) {
      const validationErrors: Record<string, string> = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
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
          {errors.firstName && (
            <p style={{ color: 'red' }}>{errors.firstName}</p>
          )}
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
          {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
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
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
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
