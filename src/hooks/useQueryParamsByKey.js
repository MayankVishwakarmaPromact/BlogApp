import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useQueryParamsByKey(key) {
  const location = useLocation();
  const [value, setValue] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get(key);
    setValue(paramValue || ""); 
  }, [location.search, key]);

  return value;
}
