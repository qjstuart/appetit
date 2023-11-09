import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const fetchedData = await response.json();

  if (!response.ok) {
    throw new Error(fetchedData.message || "Failed to send HTTP request.");
  }

  return fetchedData;
}

export default function useHttp(url, config, initalData) {
  const [data, setData] = useState(initalData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(); // undefined

  const sendHttpRequestAndManageState = useCallback(
    async function sendHttpRequestAndManageState(data) {
      setIsLoading(true);
      try {
        const fetchedData = await sendHttpRequest(url, { ...config, body: data });
        setData(fetchedData);
      } catch (error) {
        setError(error.message || "sendHttpRequestAndManageState() error.");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendHttpRequestAndManageState();
    }
  }, [sendHttpRequestAndManageState, config]);

  return {
    data,
    isLoading,
    error,
    sendHttpRequestAndManageState,
  };
}
