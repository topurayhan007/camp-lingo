import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <div className="font-bold ">
      <Helmet>
        <title>CampLingo | Admin Dashboard</title>
      </Helmet>
      <h2 className="md:text-5xl text-2xl">Welcome back! </h2>
      <h2 className="text-green-400 text-3xl md:text-6xl py-3">
        {user.displayName}
      </h2>
    </div>
  );
};

export default AdminHome;
