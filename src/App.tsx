import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import Chores from './components/Chores';
import AddMember from './components/member/AddMember';
import EditMember from './components/member/EditMember';
import ListMembers from './components/member/ListMembers';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="chores" element={<Chores />} />
            <Route path="members" element={<ListMembers />} />
            <Route path="add-member" element={<AddMember />} />
            <Route path="members/:memberId" element={<EditMember />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
