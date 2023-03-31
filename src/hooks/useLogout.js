import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/store";
import {useState} from "react";

export default function Logout() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.user);

    const logoutUser = async () => {
        setLoading(true);
        setError(null);

        console.log(user);
        const response = await fetch("/user/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({_id: user._id})
        });
    
        const data = await response.json();

        if(!response.ok) {
            setError(data.error)
            setLoading(false);
            console.log(data)
        }
    
        if(response.ok) {
            setLoading(false);
            localStorage.removeItem("user");
            dispatch(logout());   
            console.log(data)
            console.log(user);
        }
    }

    return {logoutUser, loading, error};
}