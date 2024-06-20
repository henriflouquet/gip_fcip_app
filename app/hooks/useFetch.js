import { useEffect, useState } from 'react';

import { useAuth } from './useAuth';

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const json = await res.json();
        if (json.error) {
          logout();
        } else {
          setResponse(json);
        }
        setLoading(false);
      } catch (error) {
        console.log('error', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url, token, logout]);
  return { loading, error, response };
};

export default useFetch;
