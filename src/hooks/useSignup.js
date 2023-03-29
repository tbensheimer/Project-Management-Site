import {useState} from "react";

export default function useSignup() {
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const signup = async(email, password, displayName, profileUrl) => {
    setLoading(true);
    setError(null);
    console.log("makes it to useSignup");
   
    const response = await fetch("http://localhost:2000/user/signup", {
        mode: 'no-cors',
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {email, password, displayName, profileUrl}
    });

    console.log(response);

    const data = await response.text();

    console.log(data);

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