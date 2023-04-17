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
import OnlineUsers from "./components/online-users/OnlineUsers";
import { useDispatch } from 'react-redux';
import { setUsers, login, setProjects, setCompletedProjects } from './redux/store';
import { useEffect } from 'react';
import History from './pages/history/History';
import useFetch from './hooks/useFetch';

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const {get} = useFetch('');

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if(storedUser) {
        dispatch(login(storedUser));
      }
      const getAllProjects = async () => {
        const data = await get('/project/projects');

        if(data) {
        dispatch(setProjects(data.projects));
        }
};
getAllProjects();
    //         // eslint-disable-next-line
    }, [dispatch]);

    useEffect(() => {
      const getAllCompletedProjects = async () => {
    const data = await get("/project/completed-projects");

    if(data) {
        dispatch(setCompletedProjects(data.projects));
    }
};

getAllCompletedProjects();
    //         // eslint-disable-next-line
    }, [dispatch]);

    useEffect(() => {                 

        const getUsers = async () => {                //need to figure out how to set offline/online if inactive/active and if browser closed
        const data = await get('/user/users')
        if(data) {
            dispatch(setUsers(data.users))
        }
    }
    getUsers(); 

   const interval = setInterval(() => {
    getUsers();
    }, 10000);          

    return () => clearInterval(interval);
    }, [dispatch])

  return (
    <BrowserRouter>
    <div className="App">
      {user && <Sidebar />}
      <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login"/>}></Route>

        <Route path="/completed-projects" element={user ? <History /> : <Navigate to="/login"/>}></Route>

        <Route path="/create" element={user ? <Create /> : <Navigate to="/login"/>}></Route>

        <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}></Route>

        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>}></Route>

        <Route path="/projects/:id" element={user ? <Project /> : <Navigate to="/login"/>}></Route>

      </Routes>
      </div>
      {user && <OnlineUsers />}
    </div>
    </BrowserRouter>
  );
}

export default App;
