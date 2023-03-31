import "./Navbar.css"
import { Link } from "react-router-dom"
import Dojo from "../../assets/Dojo.svg"
import useLogout from "../../hooks/useLogout";

export default function Navbar() {
    const {logoutUser, loading, error} = useLogout();

    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <Link to="/">
                    <img src={Dojo} alt="Dojo icon" />
                    <span>The Dojo</span>
                    </Link>
                    </li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                {!error && <li><button onClick={logoutUser} disabled={loading} className="btn">{loading ? "Loading" : "Logout"}</button></li> }
                {error && <li><div className="error">{error}</div></li>}
                </ul>
        </div>
    )
}