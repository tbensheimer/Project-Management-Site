import {useState} from "react";

export default function useSignup() {
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const signup = async(email, password, displayName, profileUrl) => {
    setLoading(true);
    setError(null);
    console.log("makes it to useSignup");
    console.log(profileUrl);

    const response = await fetch('/user/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password, displayName, profileUrl})
    });
    const data = response.json();

    if(!response.ok) {
        setError(data.error)
        setLoading(false);
    }

    if(response.ok) {
        setLoading(false);
        localStorage.setItem('user', data);
        //dispatch login
    }
}
return {error, loading, signup}
}