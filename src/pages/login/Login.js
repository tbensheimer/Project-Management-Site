import "./Login.css"
import {useState} from "react";
import useLogin from "../../hooks/useLogin";
import { useSelector } from "react-redux";
import Avatar from "../../components/avatar/Avatar";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState(null);
    const {loading, error, loginUser} = useLogin();
    const users = useSelector(state => state.users);

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        loginUser(email, password);
    }

    const findProfilePic = () => {
       const user = users.find(user => {
            return user.email === email;
        })

        if (!user) {
            setProfile(null);
        }
        else {
            setProfile(user.profileUrl);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="img-format">
            <h2>Log In</h2>
            {profile && <Avatar src={profile}/>}
            </div>

            <label>
                <span>Email:</span>
                <input required type="email" onChange={e => setEmail(e.target.value)} value={email}  placeholder="Email..." />
            </label>

            <label>
                <span>Password:</span>
                <input onFocus={findProfilePic} required type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password..."/>
            </label>

            {!loading && <button className="btn">Login</button>}
            {loading && <button disabled type="button" className="btn">Loading...</button>}
            {error && <div className="error">{error}</div>}
            </form>
    )
}