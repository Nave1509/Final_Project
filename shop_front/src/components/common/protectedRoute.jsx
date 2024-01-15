import { Navigate } from "react-router-dom";
import { useStore } from "../../context/store.context";

const ProtectedRoute = ({ children }) => {
  const { user } = useStore();

  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};
export default ProtectedRoute;
