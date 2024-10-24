import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { ChoreType } from '../../types/ChoresType';
import { getCurrentUserId } from '../../functions/userLocalStorage';
import { choreFrequency } from '../../functions/choreConstants';

type ChoreFormType = {
  btnSubmitAction: (choresData: ChoreType) => Promise<void>;
  isLoading: boolean;
  chore?: ChoreType | null;
  btnLabel: string | 'Save';
};

type ChoreFormErrorsType = {
  title?: string;
  description?: string;
  choreValue?: string;
  typeId?: string;
};

const ChoreForm: React.FC<ChoreFormType> = ({
  btnLabel,
  btnSubmitAction,
  isLoading,
  chore,
}) => {
  const { id } = getCurrentUserId();
  const initialValues = {
    id: '',
    title: '',
    description: '',
    choreValue: 0,
    userId: id,
    typeId: '',
  };

  const [formInputValues, setFormInputValues] =
    useState<ChoreType>(initialValues);

  const [errors, setErrors] = useState<ChoreFormErrorsType>({});

  useEffect(() => {
    if (chore) {
      setFormInputValues(chore);
    }
  }, [chore]);

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    choreValue: yup
      .number()
      .required()
      .min(0, 'Chore value should be greater than 0'),
    typeId: yup
      .string()
      .required('Please select a chore type')
      .notOneOf([''], 'Select a valid chore type'),
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
      }
      setErrors(validationErrors);
    }
  };

  const { title, description, choreValue, typeId } = formInputValues;

  return (
    <form className="col-6 login-form">
      <div className="mb-3">
        <label className="mt-1" htmlFor="title">
          Title
        </label>
        <input
          className="form-control"
          id="title"
          name="title"
          onChange={handleInputChange}
          placeholder="Make up bed"
          type="text"
          value={title}
        />
      </div>
      {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
      <div className="mb-3">
        <label className="mt-1" htmlFor="description">
          Description
        </label>
        <input
          className="form-control"
          id="description"
          name="description"
          onChange={handleInputChange}
          placeholder="Straighten sheets and pillows."
          type="text"
          value={description}
        />
      </div>
      {errors.description && (
        <p style={{ color: 'red' }}>{errors.description}</p>
      )}
      <div className="mb-3">
        <label className="mt-1" htmlFor="choreValue">
          Chore value
        </label>
        <input
          className="form-control"
          id="choreValue"
          min="0"
          name="choreValue"
          onChange={handleInputChange}
          placeholder="Eg.: 10"
          type="number"
          value={choreValue}
        />
      </div>
      {errors.choreValue && <p style={{ color: 'red' }}>{errors.choreValue}</p>}
      <div className="mb-3">
        <label className="mt-1" htmlFor="typeId">
          Chore type
        </label>
        <select
          className="form-control"
          id="typeId"
          name="typeId"
          onChange={handleSelectChange}
          value={typeId}
        >
          <option value="">Select chore type</option>
          {choreFrequency &&
            choreFrequency.map((frequency) => (
              <option key={frequency.id} value={frequency.id}>
                {frequency.title}
              </option>
            ))}
        </select>
      </div>
      {errors.typeId && <p style={{ color: 'red' }}>{errors.typeId}</p>}
      <button
        className="btn btn-primary mb-2 mt-3 py-2 w-100"
        disabled={isLoading}
        onClick={handleBtnSubmitClick}
        type="submit"
      >
        {btnLabel}
      </button>
    </form>
  );
};

export default ChoreForm;
