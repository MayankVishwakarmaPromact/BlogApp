import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
// import AuthGuard from "../Router/AuthGuard";

export default function Layout() {
  return (
    <div>
      {/* <AuthGuard> */}
      <Header />
      <Outlet />
      <Footer />
      {/* </AuthGuard> */}
    </div>
  );
}
