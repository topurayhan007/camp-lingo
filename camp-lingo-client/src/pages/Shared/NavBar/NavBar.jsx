import { Link, useNavigate } from "react-router-dom";
import ActiveLink from "../ActiveLink/ActiveLink";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { BsPersonCircle } from "react-icons/bs";
import { MdModeNight, MdOutlineLightMode } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../../providers/ThemeProvider";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showAccountInfo, setAccountInfo] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { theme, handleTheme, spinning } = useContext(ThemeContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setAccountInfo(false);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged out successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li className="">
        <ActiveLink to="/">Home</ActiveLink>
      </li>
      <li className="">
        <ActiveLink to="/instructors">Instructors</ActiveLink>
      </li>
      <li className="">
        <ActiveLink to="/classes">Classes</ActiveLink>
      </li>

      {user && (
        <>
          <li className="">
            <ActiveLink
              to={
                isAdmin
                  ? "/dashboard/adminhome"
                  : isInstructor
                  ? "/dashboard/instructorhome"
                  : "/dashboard/studenthome"
              }
            >
              Dashboard
            </ActiveLink>
          </li>
        </>
      )}
    </>
  );

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className=""
      id="navBar"
      data-theme={theme === false ? "lemonade" : "night"}
    >
      <Helmet>
        <title>CampLingo | Home</title>
      </Helmet>
      <div className="navbar bg-transparent mx-auto max-w-[1320px] lg:px-0 py-3 gap-2 md:gap-0">
        <div className="navbar-start lg:hidden">
          <div className="">
            <label
              tabIndex={0}
              onClick={toggleMenu}
              className="btn btn-ghost lg:hidden text-3xl px-1"
            >
              <AiOutlineMenuUnfold />
            </label>
            <ul
              tabIndex={0}
              data-theme={theme === false ? "lemonade" : "night"}
              className={`menu menu-compact font-bold mt-5 p-2 shadow rounded-md w-52 ${
                isMenuOpen ? "absolute z-50 left-0" : "hidden"
              }`}
            >
              {navOptions}
            </ul>
          </div>
        </div>

        <div className="navbar-start hidden lg:flex">
          <ul className="menu font-bold text-xl menu-horizontal px-1">
            {navOptions}
          </ul>
        </div>

        <div className="">
          <Link to="/">
            <h4 className="w-max cursor-pointer font-extrabold text-2xl lg:text-3xl flex items-center">
              <span>
                <img
                  src={theme === false ? "/logo-dark.png" : "/logo-light.png"}
                  className="md:w-10 w-8 me-1 md:me-2 font-bold"
                  alt=""
                />
              </span>{" "}
              <span className="text-green-400">Camp</span>Lingo
            </h4>
          </Link>
        </div>

        <div className="navbar-end">
          <div
            className={`btn btn-circle text-2xl me-2 ${
              spinning ? "animate-spin transition-transform duration-500" : ""
            }`}
            onClick={() => handleTheme()}
          >
            {theme === false ? (
              <MdModeNight />
            ) : (
              <MdOutlineLightMode className="text-white" />
            )}
          </div>
          {user === null ? (
            <Link to="/login">
              <button
                data-theme={theme === false ? "dracula" : "lemonade"}
                className="btn rounded-lg bg-green-400 hover:bg-green-300 border-0 text-black md:px-8 px-4 font-bold normal-case text-xl"
              >
                Login
              </button>
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                onMouseEnter={() => setAccountInfo(true)}
                onClick={() => setAccountInfo(!showAccountInfo)}
                className="btn bg-transparent hover:bg-transparent btn-circle avatar border-0 flex justify-between items-center w-max gap-1 h-15 p-1"
              >
                <div className="w-10 rounded-full">
                  {user?.photoURL ? (
                    <>
                      <img src={user.photoURL} />
                    </>
                  ) : (
                    <>
                      <BsPersonCircle className="text-4xl" />
                    </>
                  )}
                </div>
                {showAccountInfo === false ? (
                  <VscTriangleDown className="text-xl pe-1" />
                ) : (
                  <VscTriangleUp className="text-xl pe-1" />
                )}
              </label>
              <ul
                tabIndex={0}
                onMouseLeave={() => setAccountInfo(false)}
                data-theme={theme === false ? "lemonade" : "night"}
                className={`mt-6 p-2 shadow menu menu-compact font-semibold ${
                  showAccountInfo ? "absolute z-50 right-0" : "hidden"
                }   rounded-md w-60`}
              >
                {user?.displayName ? (
                  <li onClick={() => setAccountInfo(false)}>
                    <a className="justify-between  hover:text-black rounded-md mb-1">
                      {user.displayName}
                    </a>
                  </li>
                ) : (
                  <li onClick={() => setAccountInfo(false)}>
                    <a className="justify-between  hover:text-black rounded-md mb-1">
                      Unknown
                    </a>
                  </li>
                )}
                <li onClick={handleLogOut} className="text-red-600 rounded-md">
                  <a>
                    Logout <IoMdLogOut className="font-extrabold text-lg" />
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
