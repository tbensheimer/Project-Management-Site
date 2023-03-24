import "./Navbar.css"
import { Link } from "react-router-dom"

export default function Navbar() {

    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <Link to="/">
                    {/* Add logo image here */}
                    <span>The Dojo</span>
                    </Link>
                    </li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><button className="btn">Logout</button></li>
                </ul>
        </div>
    )
}