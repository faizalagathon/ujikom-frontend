import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const fetchData = async () => {
    setError(false);
    setLoading(true);
    setData([]);
    try {
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
      setError(true);
    }
    setLoading(false);
  };

  const handleRefetch = () => {
    setRefetch(!refetch)
  }

  useEffect(() => {
    fetchData();
  }, [refetch]);

  return {
    data,
    loading,
    error,
    handleRefetch,
  };
}
