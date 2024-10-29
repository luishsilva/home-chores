import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { UserType } from '../types/UserType';

type UserFormType = {
  btnSubmitAction: (userData: UserType) => Promise<void>;
  isLoading: boolean;
  member?: UserType | null;
  btnLabel: string | 'Save';
};

type UserFormErrorsType = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const UserForm: React.FC<UserFormType> = ({
  btnLabel,
  btnSubmitAction,
  isLoading,
  member,
}) => {
  const initialValues = {
    id: '',
    email: '',
    firstName: '',
    isLogged: false,
    lastName: '',
    password: '',
    thumbnail: '',
  };

  const [formInputValues, setFormInputValues] = useState(initialValues);
  const [errors, setErrors] = useState<UserFormErrorsType>({});

  useEffect(() => {
    if (member) {
      setFormInputValues(member);
    }
  }, [member]);

  const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
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

  const handleBtnSubmitClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formInputValues, { abortEarly: false });
      setErrors({});

      btnSubmitAction(formInputValues).then(() => {
        setFormInputValues(initialValues);
        toast.success('Action successfully executed.');
      });
    } catch (err) {
      const validationErrors: Record<string, string> = {};
      if (err instanceof yup.ValidationError) {
        // console.log(err.errors);
        // console.log(err.inner);
        err.inner.forEach((error) => {
          // console.log(error.path);
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
      }
      setErrors(validationErrors);
    }
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
      {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
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
      {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
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
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
