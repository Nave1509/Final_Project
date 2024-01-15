import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/store.context";
const SignOut = ({ redirect = "/" }) => {
  const Navigate = useNavigate();

  const { logout, clearTheCart, setCartProducts } = useStore();

  useEffect(() => {
    logout();
    setCartProducts([]);
    Navigate(redirect);
  }, [Navigate, logout]);

  return null;
};
export default SignOut;
