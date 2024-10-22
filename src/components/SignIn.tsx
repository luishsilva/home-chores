import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';

type TypeErrors = {
  email?: string | null;
  password?: string | null;
};

const SignIn = () => {
  const [formInputValues, setFormInputValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<TypeErrors>({});

  const { signIn, isLoading } = useAuth();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: yup.string().required(),
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

  const handleSignIn: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formInputValues, { abortEarly: false });
      setErrors({});

      signIn({
        email: formInputValues.email,
        password: formInputValues.password,
      });
    } catch (err) {
      const validationErrors: Record<string, string> = {};

      // Map Yup validation errors to error state
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
            id="login-email"
            name="email"
            onChange={handleInputChange}
            placeholder="name@example.com"
            type="email"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

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
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
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
      </form>
    </div>
  );
};

export default SignIn;
