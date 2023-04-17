import { useState } from "react";

export default function useFetch(baseUrl) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = async (url) => {
    setLoading(true);
    setError(null);;

    const response = await fetch(baseUrl + url);

    const data = await response.json();

    if(!response.ok) {
        setLoading(false);
        setError(data.error);
    }

    if(response.ok) {
        setLoading(false);
        return data;
    }
  }

const post = async (url, body) => {
    setLoading(true);
    setError(null);

    const response = await fetch(baseUrl + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    if(!response.ok) {
        setLoading(false);
        setError(data.error);
    }

    if(response.ok) {
        setLoading(false);
        return data;
    }
}

  return { get, post, error, loading };
};