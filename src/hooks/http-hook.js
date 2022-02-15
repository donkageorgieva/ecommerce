import { useState, useCallback } from "react/cjs/react.development";

const useSendRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setitems] = useState([]);
  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);

    fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : "GET",
      headers: requestConfig.headers
        ? requestConfig.headers
        : { "Content-Type": "application/json" },
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    })
      .then((response) => {
        console.log(response.headers, "response");
        if (!response.ok) {
          throw new Error("Request failed!");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data, "data");
        setitems(data);
        console.log(data);
        requestConfig.fn(data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });

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
