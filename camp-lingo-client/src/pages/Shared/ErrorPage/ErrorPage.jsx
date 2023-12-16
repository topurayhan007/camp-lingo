import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen bg-green-50">
      <Helmet>
        <title>CampLingo | 404 Page</title>
      </Helmet>
      <div className="flex justify-center items-center h-screen lg:h-auto p-5">
        <div className="lg:h-1/2 lg:w-1/2">
          <img src="/assets/images/404.png" alt="" className="" />
        </div>

        <div className="absolute bottom-0 mb-3 drop-shadow-[0_1.2px_1.6px_rgba(0,0,0,0.8)]">
          <Link to="/">
            <button className="px-10 py-3 text-xl font-bold text-black rounded-full bg-green-500 border-[3px] border-black ">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
