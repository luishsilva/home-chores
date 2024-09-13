import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import Chores from './components/chores/Chores';
import AddMember from './components/member/AddMember';
import EditMember from './components/member/EditMember';
import ListMembers from './components/member/ListMembers';
import { AuthProvider } from './context/AuthContext';
import { ChoresProvider } from './context/ChoresContext';
import AddChore from './components/chores/AddChore';
import EditChore from './components/chores/EditChore';
import AssignChore from './components/chores/AssignChore';

const App = () => {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <ChoresProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="chores" element={<Chores />} />
              <Route path="chore/:choreId" element={<EditChore />} />
              <Route path="add-chore" element={<AddChore />} />
              <Route path="/assign-chore" element={<AssignChore />} />
              <Route path="members" element={<ListMembers />} />
              <Route path="add-member" element={<AddMember />} />
              <Route path="members/:memberId" element={<EditMember />} />
            </Routes>
          </ChoresProvider>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
