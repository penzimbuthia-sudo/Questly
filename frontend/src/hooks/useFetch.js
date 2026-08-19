import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useFetch(path, { skip = false } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!skip);
}