import "./Sidebar.css"
import {NavLink} from "react-router-dom"

export default function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                    {/* Add Avatar and Users */}
                    <p>Hey User</p>
                </div>
                <nav className="links">
                    <ul>
                        <li><NavLink to="/">{/* add image icon for dashboard */}
                        <span>Dashboard</span>
                        </NavLink>
                        </li>

                        <li><NavLink to="/create">{/* add image icon for create */}
                        <span>New Project</span>
                        </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}