import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Account.css"
import useFetch from "../../hooks/useFetch";
import { login } from "../../redux/store";

export default function Account() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileError, setProfileError] = useState(null);
    const [success, setSuccess] = useState(null);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {post, loading, error} = useFetch('');


    useEffect(() => {
        setEmail(user.email);
        setDisplayName(user.displayName);
        setProfileImage(user.profileUrl);
               // eslint-disable-next-line
    }, [])

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);

        var updatedUser = await post('/user/account', {_id: user._id, email, oldPassword, newPassword, displayName, profileImage});

        if(updatedUser) {
            setSuccess("Saved changes!");
            dispatch(login(updatedUser));
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setOldPassword('');
            setNewPassword('');
        }
    }

    const handleFileChange = async (e) => {
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

        const base64 = await convertToBase64(file);
        setProfileError(null);
        setProfileImage(base64);
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    return (
        <form className="auth-form" onSubmit={handleEditSubmit} >
            <h2>Edit Profile</h2>

            <label>
                <span>Email:</span>
                <input required type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" />
            </label>

            <label>
                <span>Old Password Check:</span>
                <input type="password" onChange={e => setOldPassword(e.target.value)} value={oldPassword} placeholder="Old Password"/>
            </label>

            <label>
                <span>New Password:</span>
                <input type="password" onChange={e => setNewPassword(e.target.value)} value={newPassword} placeholder="New Password" />
            </label>

            <label>
                <span>Display Name:</span>
                <input required type="text" onChange={e => setDisplayName(e.target.value)} value={displayName} placeholder="Display Name"/>
            </label>

            <label>
                <span>Profile Picture:</span>
                <input type="file" onChange={handleFileChange} />
                {profileImage && <div className="img-container">Preview:<img src={profileImage} className="profile-pic" alt="profile pic" /></div>}

            </label>

            {!loading && <button className="btn">Save Changes</button>}
            {loading && <button disabled type="button" className="btn">Loading...</button>}
            {profileError && <div className="error">{profileError}</div>}
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            </form>
    )
}
