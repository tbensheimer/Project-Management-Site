import "./Login.css"
import {useState} from "react";
import useLogin from "../../hooks/useLogin";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loading, error, loginUser} = useLogin();

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        loginUser(email, password);
    }

    return (
        <form className="auth-form" onSubmit={handleLoginSubmit} >
            <h2>Log In</h2>

            <label>
                <span>Email:</span>
                <input required type="email" onChange={e => setEmail(e.target.value)} value={email} />
            </label>

            <label>
                <span>Password:</span>
                <input required type="password" onChange={e => setPassword(e.target.value)} value={password} />
            </label>

            {!loading && <button className="btn">Login</button>}
            {loading && <button disabled type="button" className="btn">Loading...</button>}
            {error && <div className="error">{error}</div>}
            </form>
    )
}