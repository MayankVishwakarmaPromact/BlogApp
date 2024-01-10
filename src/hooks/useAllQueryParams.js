import { useSearchParams } from "react-router-dom";

export default function useAllQueryParams() {
  const [searchParams] = useSearchParams();
  return Object.fromEntries(searchParams);
}
