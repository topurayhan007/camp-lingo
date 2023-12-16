import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useContext } from "react";
import { ThemeContext } from "../../../providers/ThemeProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddAClass = () => {
  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
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
          const newClass = {
            name: classname,
            image: imgURL,
            instructorName: name,
            instructorEmail: email,
            price: parseFloat(price),
            availableSeat: parseInt(availableSeat),
            enrolled: 0,
            status: "pending",
            feedback: "",
          };
          console.log(newClass);

          axiosSecure.post("/classes", newClass).then((data) => {
            console.log("after posting new class", data.data);
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };

  return (
    <div className="mt-10 mb-10 px-3 md:px-0">
      <Helmet>
        <title>CampLingo | Add A Class</title>
      </Helmet>

      <div
        data-theme={theme ? "night" : "light"}
        className="max-w-7xl md:px-6 card border-slate-100 border drop-shadow-sm shadow-xl"
      >
        <div className="card w-full">
          <p className="text-3xl font-bold text-center card-body pb-5">
            Add Your Class
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
                    {...register("classname", { required: true })}
                    required
                    placeholder="Your class name"
                    className="input input-bordered border-[1.8px] rounded-full border-green-500 text-lg"
                  />
                  {errors.classname && (
                    <span className="text-red-600">Name is required</span>
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
                    <span className="text-red-600">Image is required</span>
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
                    <span className="text-red-600">Name is required</span>
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
                    <span className="text-red-600">Email is required</span>
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
                    name="availableSeat"
                    {...register("availableSeat", { required: true })}
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
                    name="price"
                    {...register("price", { required: true })}
                    pattern="^\d+(?:\.\d{1,2})?$"
                    required
                    placeholder="Your class price"
                    className="input input-bordered border-[1.8px] rounded-full border-green-500 text-lg"
                  />
                  {errors.price && (
                    <span className="text-red-600">Price is required</span>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAClass;
