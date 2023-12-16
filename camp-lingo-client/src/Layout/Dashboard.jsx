import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeProvider";
import { MdMenuOpen, MdMenu } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { FaUserEdit, FaChalkboardTeacher } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { BsBuildingFillAdd, BsFillCreditCardFill } from "react-icons/bs";
import SideActiveLink from "../pages/Shared/SideActiveLink/SideActiveLink";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(true);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <div className="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Main content */}

          <Outlet></Outlet>

          {/* Main content */}
        </div>
        <div
          className="drawer-side px-0 mx-0"
          data-theme={theme ? "night" : "light"}
        >
          <ul
            className={`menu md:p-4 py-1 px-1 gap-1 ${
              open ? "md:w-80 w-64" : "md:w-max w-[100px]"
            }`}
          >
            {/* Sidebar content here */}
            <li className="mb-4 border-b-2 md:pb-3">
              <div className="flex justify-between items-center">
                <h4
                  className={`cursor-pointer font-extrabold text-xl lg:text-3xl flex justify-between items-center gap-0 md:gap-1 ${
                    open ? "" : "hidden"
                  }`}
                >
                  <span className="">Dashboard</span>
                </h4>
                <p
                  className="btn btn-outline text-2xl border-2"
                  onClick={handleOpen}
                >
                  {open ? <MdMenuOpen /> : <MdMenu />}
                </p>
              </div>
            </li>

            {/* All SIDE BAR OPTIONS DEPENDING ON USER */}
            {isAdmin && (
              <>
                <li>
                  <SideActiveLink to="/dashboard/adminhome">
                    {" "}
                    <p className="btn btn-outline text-2xl border-2">
                      <HiHome className="" />
                    </p>{" "}
                    <span
                      className={`md:text-xl text-base font-semibold ${
                        open ? "ms-2" : "hidden"
                      }`}
                    >
                      Admin Home
                    </span>
                  </SideActiveLink>
                </li>

                <li>
                  <SideActiveLink to="/dashboard/manage-users">
                    {" "}
                    <p className="btn btn-outline text-2xl border-2 ">
                      <FaUserEdit className="" />
                    </p>{" "}
                    <span
                      className={`md:text-xl text-base font-semibold ${
                        open ? "ms-2" : "hidden"
                      }`}
                    >
                      Manage Users
                    </span>
                  </SideActiveLink>
                </li>

                <li>
                  <SideActiveLink to="/dashboard/manage-classes">
                    {" "}
                    <p className="btn btn-outline text-2xl border-2">
                      <FaChalkboardTeacher className="" />
                    </p>{" "}
                    <span
                      className={`md:text-xl text-base font-semibold ${
                        open ? "ms-2" : "hidden"
                      }`}
                    >
                      Manage Classes
                    </span>
                  </SideActiveLink>
                </li>
              </>
            )}

            {isInstructor && (
              <>
                <li>
                  <SideActiveLink to="/dashboard/instructorhome">
                    {" "}
                    <p className="btn btn-outline text-2xl border-2">
                      <HiHome className="" />
                    </p>{" "}
                    <span
                      className={`md:text-xl text-base font-semibold ${
                        open ? "ms-2" : "hidden"
                      }`}
                    >
                      Instructor Home
                    </span>
                  </SideActiveLink>
                </li>

                <li>
                  <SideActiveLink to="/dashboard/addclass">
                    {" "}
                    <p className="btn btn-outline text-2xl border-2 ">
                      <BsBuildingFillAdd className="" />
                    </p>{" "}
                    <span
                      className={`md:text-xl text-base font-semibold ${
                        open ? "ms-2" : "hidden"
                      }`}
                    >
                      Add A Class
                    </span>
                  </SideActiveLink>
                </li>

                <li>
                  <SideActiveLink to="/dashboard/instructor-classes">
                    {" "}
                    <p className="btn btn-outline text-2xl border-2">
                      <GiTeacher className="" />
                    </p>{" "}
                    <span
                      className={`md:text-xl text-base font-semibold ${
                        open ? "ms-2" : "hidden"
                      }`}
                    >
                      My Classes
                    </span>
                  </SideActiveLink>
                </li>
              </>
            )}

            {!isInstructor && !isAdmin && (
              <>
                <li>
                  <SideActiveLink to="/dashboard/studenthome">
                    {" "}
                    <p className="btn btn-outline text-2xl border-2">
                      <HiHome className="" />
                    </p>{" "}
                    <span
                      className={`md:text-xl text-base font-semibold ${
                        open ? "ms-2" : "hidden"
                      }`}
                    >
                      Student Home
                    </span>
                  </SideActiveLink>
                </li>

                <li>
                  <SideActiveLink to="/dashboard/selected-classes">
                    {" "}
                    <p className="btn btn-outline text-2xl border-2 ">
                      <BsBuildingFillAdd className="" />
                    </p>{" "}
                    <span
                      className={`md:text-xl text-base font-semibold ${
                        open ? "ms-2" : "hidden"
                      }`}
                    >
                      Selected Classes
                    </span>
                  </SideActiveLink>
                </li>

                <li>
                  <SideActiveLink to="/dashboard/enrolled-classes">
                    {" "}
                    <p className="btn btn-outline text-2xl border-2">
                      <GiTeacher className="" />
                    </p>{" "}
                    <span
                      className={`md:text-xl text-base font-semibold ${
                        open ? "ms-2" : "hidden"
                      }`}
                    >
                      Enrolled Classes
                    </span>
                  </SideActiveLink>
                </li>

                <li>
                  <SideActiveLink to="/dashboard/payment-history">
                    {" "}
                    <p className="btn btn-outline text-2xl border-2">
                      <BsFillCreditCardFill className="" />
                    </p>{" "}
                    <span
                      className={`md:text-xl text-base font-semibold ${
                        open ? "ms-2" : "hidden"
                      }`}
                    >
                      Payment History
                    </span>
                  </SideActiveLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
