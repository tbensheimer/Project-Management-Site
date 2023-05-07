import "./OnlineUsers.css";
import Avatar from "../avatar/Avatar";
import { useSelector } from "react-redux";

export default function OnlineUsers() {
    const users = useSelector(state => state.users);
    
    return (
        <div className="user-list">
            <h2>All Users</h2>            
            {users && users.map(user => {
                    return <div data-testid="user" key={user._id} className="user-list-item"> 
                    {user.isOnline && <span data-testid='active' className="online-user"></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.profileUrl} />
                </div>
            })}
        </div>
    );
}