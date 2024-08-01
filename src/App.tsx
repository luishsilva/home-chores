import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
