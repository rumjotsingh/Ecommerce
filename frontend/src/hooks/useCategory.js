import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const getCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(API_ENDPOINTS.CATEGORY.GET_ALL);
        if (!cancelled) {
          setCategories(data?.category || []);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) setCategories([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    getCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, loading };
}
