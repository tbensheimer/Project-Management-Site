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

        const response = await fetch("/user/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: user.email})
        });
    
        const data = await response.json();

        if(!response.ok) {
            setError(data.error)
            setLoading(false);
        }
    
        if(response.ok) {
            setLoading(false);
            localStorage.removeItem("user");
            dispatch(logout());   
        }
    }

    return {logoutUser, loading, error};
}