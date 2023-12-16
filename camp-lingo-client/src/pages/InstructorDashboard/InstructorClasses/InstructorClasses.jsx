import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../../providers/ThemeProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";
import useInstructorClasses from "../../../hooks/useInstructorClasses";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const InstructorClasses = () => {
  const { user } = useAuth();
  const [instructorclasses, , refetch] = useInstructorClasses();
  const [axiosSecure] = useAxiosSecure();

  const { theme } = useContext(ThemeContext);
  const [modalState, setModalState] = useState(false);
  const [selectedClass, setSelectedClass] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { classname, name, email, price, availableSeat } = data;
          const updatedClass = {
            name: classname,
            image: imgURL,
            instructorName: name,
            instructorEmail: email,
            price: parseFloat(price),
            availableSeat: parseInt(availableSeat),
          };
          console.log(updatedClass);

          axiosSecure
            .patch(`/classes/instructor/${selectedClass._id}`, updatedClass)
            .then((data) => {
              console.log("after updating new class", data.data);
              if (data.data.modifiedCount) {
                refetch();

                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Class updated successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };

  const handleOpenModal = (cls) => {
    setSelectedClass(cls);
    setModalState(true);
  };

  const handleCloseModal = () => {
    setModalState(false);
  };

  return (
    <div className="absolute top-0">
      <Helmet>
        <title>CampLingo | Manage Classes</title>
      </Helmet>
      <h2 className="text-center text-xl md:text-4xl font-bold mt-3 md:mt-6 mb-3">
        My Class Info
      </h2>
      <div className="flex justify-center mb-8">
        <hr className="border-2 rounded w-40 border-green-400 flex justify-center text-center" />
      </div>

      <div className="w-full md:px-4 px-3">
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
                <th>Available Seats</th>
                <th>Enrolled</th>
                <th>Price</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}

              {instructorclasses.map((cls, index) => (
                <tr key={cls._id} className={`border-t-[1.18px]`}>
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
                    <label className="font-bold"> {cls.availableSeat}</label>
                  </td>

                  <td>
                    <label className="font-bold"> {cls.enrolled}</label>
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
                    <label className="font-medium text-blue-400">
                      {" "}
                      {cls.feedback ? cls.feedback : "-"}
                    </label>
                  </td>

                  <th>
                    <button
                      onClick={() => handleOpenModal(cls)}
                      disabled={cls.status === "denied"}
                      className="btn bg-green-200 text-[#359e80] normal-case"
                    >
                      Update
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
                    <div
                      data-theme={theme ? "night" : "light"}
                      className="max-w-7xl md:px-6 card border-slate-100 border drop-shadow-sm shadow-xl"
                    >
                      <div className="card w-full">
                        <p className="text-3xl font-bold text-center card-body pb-5">
                          Update Your Class
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="card-body pb-9 pt-5 ">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text text-lg font-semibold">
                                    Class Name
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name="classname"
                                  defaultValue={selectedClass.name}
                                  {...register("classname", { required: true })}
                                  required
                                  placeholder="Your class name"
                                  className="input input-bordered border-[1.8px] rounded-full border-green-500 text-lg"
                                />
                                {errors.classname && (
                                  <span className="text-red-600">
                                    Name is required
                                  </span>
                                )}
                              </div>

                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text text-lg font-semibold">
                                    Class Image
                                  </span>
                                </label>
                                <input
                                  type="file"
                                  {...register("image", { required: true })}
                                  className="input input-bordered border-[1.8px] rounded-full border-green-500 text-lg"
                                />
                                {errors.image && (
                                  <span className="text-red-600">
                                    Image is required
                                  </span>
                                )}
                              </div>

                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text text-lg font-semibold">
                                    Your Name
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  defaultValue={user.displayName}
                                  {...register("name", { required: true })}
                                  required
                                  placeholder="Your name"
                                  className="input input-bordered border-[1.8px] rounded-full border-green-500 text-lg"
                                />
                                {errors.name && (
                                  <span className="text-red-600">
                                    Name is required
                                  </span>
                                )}
                              </div>

                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text text-lg font-semibold">
                                    {" "}
                                    Your Email
                                  </span>
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  {...register("email", { required: true })}
                                  required
                                  defaultValue={user.email}
                                  placeholder="Your email"
                                  className="input input-bordered border-[1.8px] rounded-full border-green-500 text-lg"
                                />
                                {errors.email && (
                                  <span className="text-red-600">
                                    Email is required
                                  </span>
                                )}
                              </div>

                              <div className="form-control">
                                <label className="label ">
                                  <span className="label-text text-lg font-semibold">
                                    Available Seats
                                  </span>
                                </label>
                                <input
                                  type="number"
                                  step="1"
                                  defaultValue={selectedClass.availableSeat}
                                  name="availableSeat"
                                  {...register("availableSeat", {
                                    required: true,
                                  })}
                                  required
                                  placeholder="Type available seats"
                                  className="input input-bordered border-[1.8px] rounded-full border-green-500 text-lg"
                                />
                                {errors.availableSeat && (
                                  <span className="text-red-600">
                                    Available seats is required
                                  </span>
                                )}
                              </div>

                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text text-lg font-semibold">
                                    Class Price
                                  </span>
                                </label>
                                <input
                                  type="number"
                                  step="0.01"
                                  defaultValue={selectedClass.price}
                                  name="price"
                                  {...register("price", { required: true })}
                                  pattern="^\d+(?:\.\d{1,2})?$"
                                  required
                                  placeholder="Your class price"
                                  className="input input-bordered border-[1.8px] rounded-full border-green-500 text-lg"
                                />
                                {errors.price && (
                                  <span className="text-red-600">
                                    Price is required
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="form-control mt-8">
                              <button
                                type="submit"
                                className="btn hover:bg-green-400 bg-green-500 text-white rounded-full font-bold px-6 mb-12 normal-case text-lg border-0"
                              >
                                Sumbit
                              </button>
                            </div>

                            <IoMdClose
                              onClick={handleCloseModal}
                              className="absolute top-0 right-0 w-8 h-8 mt-2 rounded-full text-black hover:bg-transparent hover:text-black"
                            />
                          </div>
                        </form>
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

export default InstructorClasses;
