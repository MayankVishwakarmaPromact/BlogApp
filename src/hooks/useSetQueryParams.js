import { useSearchParams } from "react-router-dom";

export default function useSetQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value.toString());
    setSearchParams(newParams.toString());
  };

  return setParams;
}
