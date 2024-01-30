import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/store.context";
import { toast } from "react-toastify";

const SignOut = ({ redirect = "/" }) => {
  const Navigate = useNavigate();

  const { logout, clearTheCart, setCartProducts } = useStore();

  useEffect(() => {
    logout();
    setCartProducts([]);
    toast.success("You Are Signed Out", {
      position: "top-center",
      closeButton: true,
      autoClose: 2000,
      hideProgressBar: false,
      toastId: "signOut",
    });
    Navigate(redirect);
  }, [Navigate, logout]);

  return null;
};
export default SignOut;
