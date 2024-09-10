import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ChoresType } from '../../types/ChoresType';
import { getCurrentUserId } from '../../functions/userLocalStorage';

type ChoreFormType = {
  btnSubmitAction: (choresData: ChoresType) => Promise<void>;
  isLoading: boolean;
  chores?: ChoresType | null;
  btnLabel: string | 'Save';
};

const ChoreForm: React.FC<ChoreFormType> = ({
  btnLabel,
  btnSubmitAction,
  isLoading,
  chores,
}) => {
  const { id } = getCurrentUserId();
  const initialValues = {
    id: '',
    title: '',
    description: '',
    choreValue: 0,
    userId: id,
  };

  const [formInputValues, setFormInputValues] =
    useState<ChoresType>(initialValues);

  useEffect(() => {
    if (chores) {
      setFormInputValues(chores);
    }
  }, [chores]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const { title, description, choreValue } = formInputValues;

  return (
    <form className="login-form col-6">
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
          name="choreValue"
          onChange={handleInputChange}
          placeholder="Eg.: 10"
          type="number"
          value={choreValue}
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

export default ChoreForm;
