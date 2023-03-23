import "./Sidebar.css"
import {Link} from "react-router-dom"

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
                        <li><Link to="/">{/* add image icon for dashboard */}</Link>
                        <span>Dashboard</span>
                        </li>

                        <li><Link to="/create">{/* add image icon for create */}</Link>
                        <span>New Project</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}