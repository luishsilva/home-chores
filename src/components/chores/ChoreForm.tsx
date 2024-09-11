import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ChoreType } from '../../types/ChoresType';
import { getCurrentUserId } from '../../functions/userLocalStorage';
import choreFrequency from '../../functions/choreFrequency';

type ChoreFormType = {
  btnSubmitAction: (choresData: ChoreType) => Promise<void>;
  isLoading: boolean;
  chore?: ChoreType | null;
  btnLabel: string | 'Save';
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
    type: 0,
  };

  const [formInputValues, setFormInputValues] =
    useState<ChoreType>(initialValues);

  useEffect(() => {
    if (chore) {
      setFormInputValues(chore);
    }
  }, [chore]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      toast.success('Action successfully executed.');
    });
  };

  const { title, description, choreValue, type } = formInputValues;

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
      <div className="mb-3">
        <label className="mt-1" htmlFor="type">
          Chore type
        </label>
        <select
          className="form-control"
          id="type"
          name="type"
          onChange={handleSelectChange}
          value={type}
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
