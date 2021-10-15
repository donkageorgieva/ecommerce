import { useState, useCallback } from "react/cjs/react.development";

const useSendRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setitems] = useState([]);
  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      setitems(data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    items,
    sendRequest,
  };
};

export default useSendRequest;
