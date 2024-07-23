import { Link } from 'react-router-dom';

const Register = () => (
  <div className="align-items-center d-flex login-container justify-content-center">
    <form className="login-form col-12">
      <div className="mb-3">
        <input
          type="First name"
          className="form-control"
          id="first-name"
          placeholder="John"
        />
        <label className="mt-1" htmlFor="first-name">
          First name
        </label>
      </div>
      <div className="mb-3">
        <input
          type="Last name"
          className="form-control"
          id="last-name"
          placeholder="Doe"
        />
        <label className="mt-1" htmlFor="first-name">
          Last name
        </label>
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          id="login-email"
          placeholder="name@example.com"
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
          placeholder="Password"
        />
        <label className="mt-1" htmlFor="login-password">
          Password
        </label>
      </div>

      <button className="btn btn-primary w-100 py-2 mb-2 mt-3" type="submit">
        Create account
      </button>
      <span>
        or <Link to="/login">Login</Link>
      </span>
    </form>
  </div>
);

export default Register;
