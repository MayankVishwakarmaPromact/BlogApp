/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }) {
  const navigateTo = useNavigate();
  const isLoggedIn = useSelector((state) => state.admin.admin.isAdminLogin);
  useEffect(() => {
    if (!isLoggedIn) {
      navigateTo("/login");
    }
  }, [isLoggedIn, navigateTo]);
  return children;
}
