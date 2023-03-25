import "./Sidebar.css"
import {NavLink} from "react-router-dom"
import Dashboard from "../../assets/Dashboard.svg"
import Add from "../../assets/Add.svg"

export default function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                   {/* avatar and username here */}
                    <p>Hey User</p>
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