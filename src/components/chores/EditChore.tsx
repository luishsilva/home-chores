import { useParams } from 'react-router-dom';
import SideMenu from '../SideMenu';
import ChoreForm from './ChoreForm';
import { useChore } from '../../context/ChoresContext';

const EditChore = () => {
  const { updateChore, chores, isLoading } = useChore();
  const params = useParams();
  const foundChore = chores.find((chore) => chore.id === params.choreId);

  return (
    <main className="d-flex h-100 bg-light">
      <SideMenu />
      <div className="d-flex flex-wrap flex-column h-100 w-100 p-3 align-items-center justify-content-center">
        <ChoreForm
          btnLabel="Create chore"
          btnSubmitAction={updateChore}
          chore={foundChore}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default EditChore;
