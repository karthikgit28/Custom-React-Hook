import { useState,useCallback } from "react";

const useHttp = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const sendRequest = useCallback(async (requestObject,applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestObject.url,{
            method: requestObject.method ? requestObject.method : 'GET',
            body: requestObject.body ? JSON.stringify(requestObject.body) : null,
            headers: requestObject.headers ? requestObject.headers : {}
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  },[]);

  return{
    isLoading,
    error,
    sendRequest
  };

};

export default useHttp;