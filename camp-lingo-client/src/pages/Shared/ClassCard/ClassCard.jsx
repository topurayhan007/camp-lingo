import LazyLoad from "react-lazy-load";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineChair } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

const ClassCard = ({ cls }) => {
  const {
    _id,
    name,
    image,
    instructorName,
    instructorEmail,
    availableSeat,
    enrolled,
    price,
  } = cls;
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSelectClass = (cls) => {
    console.log(cls);
    if (user && user.email) {
      const cartItem = {
        classItemId: _id,
        name,
        image,
        price,
        instructorName,
        instructorEmail,
        enrolled,
        email: user.email,
      };

      axiosSecure.post("/carts", cartItem).then((data) => {
        console.log(data.data);
        if (data.data.insertedId) {
          // disable the button
          setIsDisabled((prev) => !prev);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "The class added to your selected class",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please login to add class!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <Fade>
      <div>
        <div
          className={`card card-compact md:w-96 w-full shadow-md drop-shadow-md ${
            availableSeat === 0 ? "bg-red-300" : ""
          }`}
        >
          <LazyLoad height={350} offset={200} threshold={0.95} className="">
            <figure className="h-[350px] rounded-tr-2xl rounded-tl-2xl relative">
              <img
                src={image}
                alt={`${name}'s Image`}
                className="w-full h-full object-cover"
              />
            </figure>
          </LazyLoad>
          <div className="absolute top-0 right-0 m-4 ">
            <div className="bg-[#e6fae3] px-4 py-1 rounded-full">
              <h2 className="card-title text-3xl text-black font-[Roboto]">
                ${price}
              </h2>
            </div>
          </div>

          <div
            className={`card-body p-0 ${
              availableSeat === 0 ? "bg-red-300" : "bg-[#f7fdf6]"
            }`}
          >
            <p className=" text-xl font-bold">
              <span className="text-black text-2xl">{name}</span>
            </p>
            <div className="flex justify-between items-center gap-8">
              <div
                className="flex-grow w-max  tooltip tooltip-bottom"
                data-tip="Instructor"
              >
                <h2 className="card-title text-lg text-slate-500">
                  <GiTeacher />
                  {instructorName}
                </h2>
              </div>
              <div
                data-tip="Available Seats"
                className="flex items-center gap-1 text-lg font-bold text-green-600 tooltip tooltip-bottom"
              >
                <MdOutlineChair /> {availableSeat}
              </div>
              <div
                data-tip="Enrolled"
                className="flex items-center gap-1 text-lg font-bold text-green-600 tooltip tooltip-bottom"
              >
                <BsPeopleFill /> {enrolled}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleSelectClass(cls)}
            disabled={
              availableSeat === 0 || isAdmin || isInstructor || isDisabled
            }
            className=" btn border-0 md:text-xl md:h-14 normal-case text-black bg-green-400 hover:bg-green-500 disabled:bg-slate-300 rounded-br-2xl rounded-bl-2xl rounded-tr-none rounded-tl-none"
          >
            Select
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default ClassCard;
