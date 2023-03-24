import "./Signup.css"
import {useState} from "react";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileError, setProfileError] = useState(null);

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, displayName, profileImage);
    }

    const handleFileChange = (e) => {
        setProfileImage(null);

        let file = e.target.files[0];  //selects first file if multiple uploaded

        if(!file) {
            setProfileError("Please select a file");
            return;
        }

        if(!file.type.includes('image')) {
            setProfileError("File type must be an image");
            return;
        }

        if(file.size > 100000) {
            setProfileError("File size must be less than 100Kb");
            return;
        }

        setProfileError(null);
        setProfileImage(file);
    }

    return (
        <form className="auth-form" onSubmit={handleSignupSubmit} >
            <h2>Sign Up</h2>

            <label>
                <span>Email:</span>
                <input required type="email" onChange={e => setEmail(e.target.value)} value={email} />
            </label>

            <label>
                <span>Password:</span>
                <input required type="password" onChange={e => setPassword(e.target.value)} value={password} />
            </label>

            <label>
                <span>Display Name:</span>
                <input required type="text" onChange={e => setDisplayName(e.target.value)} value={displayName} />
            </label>

            <label>
                <span>Profile Picture:</span>
                <input required type="file" onChange={handleFileChange} />
            </label>

            <button className="btn">Signup</button>
            {profileError && <div className="error">{profileError}</div>}

            </form>
    )
}