import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Sidebar />
      <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>

        <Route path="/create" element={<Create />}></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/signup" element={<Signup />}></Route>

        <Route path="/projects/:id" element={<Project />}></Route>

      </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
