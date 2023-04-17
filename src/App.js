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

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if(storedUser) {
        dispatch(login(storedUser));
      }

      const getAllProjects = async () => {
        // setLoading(true);
        // setError(null);

    const response = await fetch("/project/projects");

    const data = await response.json();

    if(!response.ok) {
        // setError(data.error)
        // setLoading(false);
    }

    if(response.ok) {
        // setLoading(false);
        dispatch(setProjects(data.projects));
    }
};

getAllProjects();
    //         // eslint-disable-next-line
    }, [dispatch]);

    useEffect(() => {
      const getAllCompletedProjects = async () => {
        // setLoading(true);
        // setError(null);

    const response = await fetch("/project/completed-projects");

    const data = await response.json();

    if(!response.ok) {
        // setError(data.error)
        // setLoading(false);
    }

    if(response.ok) {
        // setLoading(false);
        dispatch(setCompletedProjects(data.projects));
    }
};

getAllCompletedProjects();
    //         // eslint-disable-next-line
    }, [dispatch]);

    useEffect(() => {                   // make this a hook?

        const getUsers = async () => {                //need to figure out how to set offline if inactive and if browser closed
        const response = await fetch("/user/users");
        const data = await response.json();

        if(!response.ok) {
          console.log("error getting users");
        }

        if(response.ok) {
            dispatch(setUsers(data.users))
        }
    }

    getUsers(); 

   const interval = setInterval(() => {
    getUsers();
    }, 10000);          //function every 10 seconds for update   

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
