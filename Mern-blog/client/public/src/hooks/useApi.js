// path: client/src/hooks/useApi.js
import { useState, useCallback } from "react";
import axios from "axios";

export default function useApi(baseUrl) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = useCallback(
    async ({ url, method = "GET", data = null, token = null }) => {
      setLoading(true);
      setError(null);

      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios({
          method,
          url: `${baseUrl}${url}`,
          data,
          headers,
        });
        setLoading(false);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        throw err;
      }
    },
    [baseUrl]
  );

  return { apiCall, loading, error };
}
