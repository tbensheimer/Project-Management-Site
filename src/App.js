import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  const user = useSelector(state => state.user);

  return (
    <BrowserRouter>
    <div className="App">
    <Sidebar />
      <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login"/>}></Route>

        <Route path="/create" element={user ? <Create /> : <Navigate to="/login"/>}></Route>

        <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}></Route>

        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>}></Route>

        <Route path="/projects/:id" element={user ? <Project /> : <Navigate to="/login"/>}></Route>

      </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
