import { useParams } from 'react-router-dom';
import SideMenu from '../SideMenu';
import UserForm from '../UserForm';
import { useAuth } from '../../context/AuthContext';

const EditMember = () => {
  const params = useParams();
  const { updateMember, isLoading, members } = useAuth();
  const foundMember = members?.find((member) => member.id === params.memberId);

  return (
    <main className="d-flex h-100 bg-light">
      <SideMenu />
      <div className="d-flex flex-wrap flex-column h-100 w-100 p-3 align-items-center justify-content-center">
        <UserForm
          btnLabel="Edit member"
          btnSubmitAction={updateMember}
          isLoading={isLoading}
          member={foundMember}
        />
      </div>
    </main>
  );
};

export default EditMember;
