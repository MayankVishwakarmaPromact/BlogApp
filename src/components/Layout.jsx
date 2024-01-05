import Header from "./Header";
import Home from "../pages/Home";
import { useState } from "react";
import Footer from "./Footer";
import { QueryParamsToObject } from "../hooks/queryParamsToObject";
import { useSearchParams } from "react-router-dom";
// import AuthGuard from "../Router/AuthGuard";

export default function Layout() {
  const [params, setParams] = useSearchParams({ s: "", p: "1" });
  const [searchTerm, setSearchTerm] = useState(params.get("s"));

  // Search functionality
  const handleSearch = (event) => {
    const paramsobj = QueryParamsToObject(params);
    setParams({ ...paramsobj, s: event.target.value });
    setSearchTerm(event.target.value);
  };
 

  return (
    <div>
      {/* <AuthGuard> */}
        <Header searchTerm={searchTerm} handleSearch={handleSearch} />
        <Home
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        params={params}
        setParams={setParams}
      />
        <Footer />
      {/* </AuthGuard> */}
    </div>
  );
}
