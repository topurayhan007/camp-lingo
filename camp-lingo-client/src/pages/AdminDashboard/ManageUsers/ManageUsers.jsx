import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ThemeContext } from "../../../providers/ThemeProvider";
import { useContext } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { theme } = useContext(ThemeContext);
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`)
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (data.modifiedCount) {
          refetch();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleMakeInstructor = (user) => {
    axiosSecure
      .patch(`/users/instructor/${user._id}`)
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (data.modifiedCount) {
          refetch();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Instructor Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="absolute top-0">
      <Helmet>
        <title>CampLingo | Manage Users</title>
      </Helmet>
      <h2 className="text-center text-xl md:text-4xl font-bold mt-3 md:mt-6 mb-3">
        All User Info
      </h2>
      <div className="flex justify-center mb-8">
        <hr className="border-2 rounded w-40 border-green-400 flex justify-center text-center" />
      </div>

      <div className="w-full md:px-10 px-3">
        <div
          data-theme={theme ? "night" : "light"}
          className="overflow-x-auto max-h-96 md:max-h-[450px] rounded-xl border-2 shadow-sm drop-shadow-sm "
        >
          <table className="table rounded-xl table-pin-rows">
            {/* head */}
            <thead className="border-b-2">
              <tr className="font-bold text-lg">
                <th>
                  <label>#</label>
                </th>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}

              {users.map((user, index) => (
                <tr key={user._id} className="border-t-[1.18px]">
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-circle w-14 h-14">
                          <img
                            src={user.photo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge badge-ghost rounded-md w-full py-3 px-4 ${
                        user.role === "admin"
                          ? "bg-[#e9fbf7] text-[#1fd6aa]"
                          : user.role === "instructor"
                          ? "bg-[#e9effd] text-[#556ff6]"
                          : "bg-[#feeeee] text-[#f67c55]"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      disabled={user.role === "admin"}
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-green-200 text-[#359e80] normal-case"
                    >
                      Make Admin
                    </button>
                  </td>
                  <th>
                    <button
                      onClick={() => handleMakeInstructor(user)}
                      disabled={user.role === "instructor"}
                      className="btn bg-[#ece5ff] text-[#556ff6] normal-case"
                    >
                      Make Instructor
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
