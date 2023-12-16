import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();

  if (loading || isInstructorLoading) {
    return (
      <div className="my-14 flex justify-center">
        <div
          className="radial-progress animate-spin text-green-500"
          style={{ "--value": 65 }}
        ></div>
      </div>
    );
  }

  if (user && isInstructor) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
