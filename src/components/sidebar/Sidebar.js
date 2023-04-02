import "./Sidebar.css"
import {NavLink} from "react-router-dom"
import Dashboard from "../../assets/Dashboard.svg"
import Add from "../../assets/Add.svg"
import Avatar from "../avatar/Avatar";
import { useSelector } from "react-redux";

export default function Sidebar() {
    const user = useSelector(state => state.user);

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                   <Avatar src={user.profileUrl} />
                    <p>Hello {user.displayName}</p>
                </div>
                <nav className="links">
                    <ul>
                        <li><NavLink to="/">
                        <img src={Dashboard} alt="Dashboard icon" />
                        <span>Dashboard</span>
                        </NavLink>
                        </li>

                        <li><NavLink to="/create">
                        <img src={Add} alt="Plus icon" />
                        <span>New Project</span>
                        </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}