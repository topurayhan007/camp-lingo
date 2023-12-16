import { useContext, useState } from "react";
import useClasses from "../../../hooks/useClasses";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../../providers/ThemeProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [classes, , refetch] = useClasses();
  const { theme } = useContext(ThemeContext);
  const [modalState, setModalState] = useState(false);
  const [selectedClass, setSelectedClass] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleApprove = (cls) => {
    axiosSecure
      .patch(`/classes/approve/${cls._id}`)
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (data.modifiedCount) {
          refetch();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${cls.name} is Approved!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please try again!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleDeny = (cls) => {
    axiosSecure
      .patch(`/classes/deny/${cls._id}`)
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (data.modifiedCount) {
          refetch();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${cls.name} is Denied!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please try again!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const onSubmit = (data) => {
    const feedback = data.feedback;
    axiosSecure
      .patch(`/classes/feedback/${selectedClass._id}`, { feedback })
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (data.modifiedCount) {
          refetch();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Feedback sent to ${selectedClass.instructorName}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please try again!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleOpenModal = (cls) => {
    console.log("cls", cls.feedback);
    setSelectedClass(cls);
    setModalState(true);
  };

  const handleCloseModal = () => {
    // setSelectedClass(null);
    setModalState(false);
  };

  return (
    <div className="absolute top-0">
      <Helmet>
        <title>CampLingo | Manage Classes</title>
      </Helmet>
      <h2 className="text-center text-xl md:text-4xl font-bold mt-3 md:mt-6 mb-3">
        All Class Info
      </h2>
      <div className="flex justify-center mb-8">
        <hr className="border-2 rounded w-40 border-green-400 flex justify-center text-center" />
      </div>

      <div className="w-full md:px-2 px-3">
        <div
          data-theme={theme ? "night" : "light"}
          className="overflow-x-auto max-h-96 md:max-h-[450px] rounded-xl border-2 shadow-sm drop-shadow-sm"
        >
          <table className="table rounded-xl table-pin-rows">
            {/* head */}
            <thead className="border-b-2">
              <tr className="font-bold text-base">
                <th>
                  <label>#</label>
                </th>
                <th>Class Info</th>
                <th>Instructor Info</th>
                <th>Available Seats</th>
                <th>Price</th>
                <th>Status</th>
                <th>Approve</th>
                <th>Deny</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}

              {classes.map((cls, index) => (
                <tr key={cls._id} className="border-t-[1.18px]">
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-circle w-14 h-14">
                          <img src={cls.image} alt={`${cls.name} photo`} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base">{cls.name}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="font-bold">
                        <h4>{cls.instructorName}</h4>
                      </div>
                      <div>
                        <div className="badge badge-ghost text-blue-400">
                          {cls.instructorEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <label className="font-bold"> {cls.availableSeat}</label>
                  </td>
                  <td>
                    <label className="font-bold">${cls.price}</label>
                  </td>

                  <td>
                    <span
                      className={`badge badge-ghost rounded-md w-full py-3 px-4 ${
                        cls.status === "approved"
                          ? "bg-[#e9fbf7] text-[#1fd6aa]"
                          : cls.status === "denied"
                          ? "bg-[#fde9e9] text-[#f65555]"
                          : "bg-[#fffbe7] text-[#f6db55]"
                      }`}
                    >
                      {cls.status}
                    </span>
                  </td>

                  <td>
                    <button
                      disabled={
                        cls.status === "approved" || cls.status === "denied"
                      }
                      onClick={() => handleApprove(cls)}
                      className="btn bg-green-200 text-[#359e80] normal-case"
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      disabled={
                        cls.status === "approved" || cls.status === "denied"
                      }
                      onClick={() => handleDeny(cls)}
                      className="btn bg-red-200 text-[#f65555] normal-case"
                    >
                      Deny
                    </button>
                  </td>
                  <th>
                    <button
                      onClick={() => handleOpenModal(cls)}
                      className="btn bg-[#ece5ff] text-[#556ff6] normal-case"
                    >
                      Send Feedback
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div>
        {modalState && (
          <>
            <div
              className={
                modalState === true
                  ? "fixed z-50 md:overflow-y-auto top-0 w-full left-0 overflow-y-scroll h-screen"
                  : "hidden"
              }
              id="modal"
            >
              <div className="relative">
                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-900 opacity-75" />
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                    &#8203;
                  </span>
                  <div
                    className="inline-block align-center bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-3xl md:h-[550px]"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="card md:card-side bg-[#f5fdf4] shadow-xl h-full">
                      <figure className="relative flex-1 order-1 md:order-1 h-full w-full rounded-bl-none rounded-br-none md:rounded-bl-none md:rounded-br-">
                        <img
                          src={selectedClass.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </figure>
                      <div className="card-body p-0 order-2 md:order-1 flex-1">
                        <div className="card-body p-2 justify-center">
                          <div className="flex justify-center items-center">
                            <h2 className="card-title md:text-2xl text-center text-black">
                              Give Feedback to {selectedClass.instructorName}
                              &apos;s Class
                            </h2>
                          </div>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=" card-body pb-9 pt-5">
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text font-semibold text-lg">
                                    Feedback
                                  </span>
                                </label>
                                <textarea
                                  type="text"
                                  name="feedback"
                                  {...register("feedback", { required: true })}
                                  required
                                  // defaultValue={selectedClass.feedback}
                                  placeholder="Your feedback"
                                  className="input input-bordered border-[1.8px] h-[105px] py-1 no-scrollbar rounded-3xl border-green-400 text-base"
                                ></textarea>
                                {errors.feedback && (
                                  <span className="text-red-600">
                                    Feedback is required
                                  </span>
                                )}
                              </div>

                              <div className="card-actions justify-end mt-3">
                                <button className="btn normal-case rounded-full py-3 h-14 text-black w-full bg-green-400 hover:bg-green-500 text-xl">
                                  Send Feedback
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>

                        <IoMdClose
                          onClick={handleCloseModal}
                          className="absolute top-0 right-0 w-8 h-8 m-2 rounded-full text-black hover:bg-transparent hover:text-[#2F0743]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageClasses;
