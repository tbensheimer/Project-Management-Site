import "./OnlineUsers.css";
import { useState, useEffect } from "react";
import Avatar from "../avatar/Avatar";

export default function OnlineUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getUsers = async () => {
            setError(null);
            setLoading(true);

        const response = await fetch("/user/users");

        const data = await response.json();

        if(!response.ok) {
            setError(data.error);
            setLoading(false);
        }

        if(response.ok) {
            setError(null);
            setLoading(false);
            setUsers(data.users);
        }
    }

    getUsers();
    }, [])

    return (
        <div className="user-list">
            <h2>All Users</h2>
            {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}
            
            {users && users.map(user => {
                    return <div key={user._id} className="user-list-item"> 
                    <span>{user.displayName}</span>
                    <Avatar src={user.profileUrl} />
                </div>
            })}
        </div>
    );
}