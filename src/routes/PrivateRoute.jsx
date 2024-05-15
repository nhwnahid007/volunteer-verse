
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";



// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img
          className="w-20 h-20 animate-spin"
          src="https://www.svgrepo.com/show/448500/loading.svg"
          alt="Loading icon"
        />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate replace={true} state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
