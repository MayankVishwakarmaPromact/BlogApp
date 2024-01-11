/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

export const AuthGuard = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.admin.admin.isAdminLogin);  
  return isLoggedIn && children;
};
