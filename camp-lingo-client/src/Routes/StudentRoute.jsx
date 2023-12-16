import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useStudent from "../hooks/useStudent";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isStudent, isStudentLoading] = useStudent();
  const location = useLocation();

  if (loading || isStudentLoading) {
    return (
      <div className="my-14 flex justify-center">
        <div
          className="radial-progress animate-spin text-green-500"
          style={{ "--value": 65 }}
        ></div>
      </div>
    );
  }

  if (user && isStudent) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default StudentRoute;
