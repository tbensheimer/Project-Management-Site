import {useDispatch} from "react-redux";
import {logout} from "../redux/store";

export default function Logout() {
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
    }

    return {logoutUser};
}