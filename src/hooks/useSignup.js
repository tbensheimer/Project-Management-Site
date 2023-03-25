import {useState} from "react";


export default function useSignup() {
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const signup = async(email, password, displayName, profileImage) => {
    setLoading(true);
    setError(null);

    // Set up signup functionality with redux
    //get profileImage url or base64 string
    //setup backend and database for user storage
   
}

return {error, loading, signup}

}