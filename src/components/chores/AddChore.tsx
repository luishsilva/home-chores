import SideMenu from '../SideMenu';
import ChoreForm from './ChoreForm';
import { useChore } from '../../context/ChoresContext';

const AddChore = () => {
  const { addChore, isLoading } = useChore();

  return (
    <main className="d-flex h-100 bg-light">
      <SideMenu />
      <div className="d-flex flex-wrap flex-column h-100 w-100 p-3 align-items-center justify-content-center">
        <ChoreForm
          btnLabel="Create chore"
          btnSubmitAction={addChore}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default AddChore;
