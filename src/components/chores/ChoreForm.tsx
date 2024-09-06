import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ChoreType } from '../../types/ChoreType';

type ChoreFormType = {
  btnSubmitAction: (userData: ChoreType) => Promise<void>;
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
  const initialValues = {
    id: '',
    title: '',
    description: '',
    choreValue: 0,
    userId: '',
    choresTypeId: '',
    choresStatusId: '',
  };

  const [formInputValues, setFormInputValues] = useState(initialValues);

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

  const handleBtnSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    btnSubmitAction(formInputValues).then(() => {
      setFormInputValues(initialValues);
      toast.success('Action successfully executed.');
    });
  };

  const { description, choreValue, title, userId, choresTypeId } =
    formInputValues;

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
          placeholder="Make up the bad"
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
          placeholder="Description"
          type="text"
          value={description}
        />
      </div>
      <div className="mb-3">
        <label className="mt-1" htmlFor="choreValue">
          Task value
        </label>
        <input
          className="form-control"
          id="choreValue"
          name="choreValue"
          onChange={handleInputChange}
          placeholder="0"
          type="number"
          value={choreValue}
        />
      </div>
      <div className="mb-3">
        <label className="mt-1" htmlFor="userId">
          Assign to
        </label>
        <select
          className="form-select"
          id="userId"
          name="userId"
          //   onChange={handleInputChange}
          value={userId}
        >
          <option value="0">Select a user</option>
          <option value="1">Name 1</option>
          <option value="2">Name 2</option>
          <option value="3">Name 3</option>
          <option value="4">Name 4</option>
          <option value="5">Name 5</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="mt-1" htmlFor="choresTypeId">
          Chore Type
        </label>
        <select
          className="form-select"
          id="choresTypeId"
          name="choresTypeId"
          //   onChange={handleInputChange}
          value={choresTypeId}
        >
          <option value="0">Select a user</option>
          <option value="1">Chore 1</option>
          <option value="2">Chore 2</option>
          <option value="3">Chore 3</option>
          <option value="4">Chore 4</option>
          <option value="5">Chore 5</option>
        </select>
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
