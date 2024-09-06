import SideMenu from '../SideMenu';
import ChoreForm from './ChoreForm';
import { useAuth } from '../../context/AuthContext';

const AddChore = () => {
  const { addMember, isLoading } = useAuth();

  return (
    <main className="d-flex h-100 bg-light">
      <SideMenu />
      <div className="d-flex flex-wrap flex-column h-100 w-100 p-3 align-items-center justify-content-center">
        <ChoreForm
          btnLabel="Create task"
          //   btnSubmitAction={addMember}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default AddChore;
