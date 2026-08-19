import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useFetch(path, { skip = false } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!skip);

  const refetch = useCallback(async () => {
    if (!path || skip) return;
    setLoading(true);
    setError(null);
    try {
      const result = await api.get(path);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [path, skip]);
}