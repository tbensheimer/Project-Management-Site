import "./Sidebar.css"
import {NavLink} from "react-router-dom"
import Dashboard from "../../assets/Dashboard.svg"
import Add from "../../assets/Add.svg"
import Avatar from "../avatar/Avatar";
import { useSelector } from "react-redux";
import Check from "../../assets/check.svg";
import IdleTimer from "../idleTimer/IdleTimer";

export default function Sidebar() {
    const user = useSelector(state => state.user);

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                   <Avatar src={user.profileUrl} />
                    <p data-testid='greeting'>Hello {user.displayName}</p>
                    <IdleTimer />
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

                        <li><NavLink to="/completed-projects">
                        <img src={Check} alt="Check icon" className="check-icon" />
                        <span>Completed Projects</span>
                        </NavLink>
                        </li>

                        <li><NavLink to={`/account/${user._id}`}>
                        <i className="fa-regular fa-user user-icon"></i>
                        <span>Edit Profile</span>
                        </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}