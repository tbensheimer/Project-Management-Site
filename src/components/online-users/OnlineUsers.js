import "./OnlineUsers.css";
// import { useState, useEffect } from "react";
import Avatar from "../avatar/Avatar";
import { useSelector } from "react-redux";

export default function OnlineUsers() {
    // const [users, setUsers] = useState([]);
    const users = useSelector(state => state.users);
    
    return (
        <div className="user-list">
            <h2>All Users</h2>
            {/* {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>} */}
            
            {users && users.map(user => {
                    return <div key={user._id} className="user-list-item"> 
                    {user.isOnline && <span className="online-user"></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.profileUrl} />
                </div>
            })}
        </div>
    );
}