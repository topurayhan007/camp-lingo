import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../../providers/ThemeProvider";
import useStudentCart from "../../../hooks/useStudentCart";
import useClasses from "../../../hooks/useClasses";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const StudentSelectedClasses = () => {
  const { theme } = useContext(ThemeContext);
  const [studentCart, , refetch] = useStudentCart();
  const [classes] = useClasses();
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();

  const handlePayment = (cls) => {
    const selectedClass = classes.find((clas) => clas._id === cls.classItemId);
    console.log(cls);
    console.log("hhh", selectedClass);

    if (selectedClass.availableSeat === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Seats all booked. Please remove from cart!",
        showConfirmButton: true,
      });
    } else {
      // navigating to payment page and sending the "cls" as state
      navigate("/dashboard/payment", { state: { cls } });
    }
  };

  const handleRemoveClass = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            refetch();

            Swal.fire("Deleted!", "Your class has been removed.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="absolute top-0">
      <Helmet>
        <title>CampLingo | Student Selected Classes</title>
      </Helmet>
      <h2 className="text-center text-xl md:text-4xl font-bold mt-3 md:mt-6 mb-3">
        My Selected Classes
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
                <th>Instructor Info</th>
                <th>Price</th>
                <th>Remove</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}

              {studentCart.map((cls, index) => (
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
                      <div>
                        <div className="badge badge-ghost text-blue-400">
                          {cls.instructorName}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <label className="font-bold">${cls.price}</label>
                  </td>

                  <td>
                    <button
                      onClick={() => handleRemoveClass(cls._id)}
                      className="btn bg-red-200 text-[#f65555] normal-case"
                    >
                      Remove
                    </button>
                  </td>
                  <th>
                    <button
                      onClick={() => handlePayment(cls)}
                      className="btn bg-[#ece5ff] text-[#556ff6] normal-case"
                    >
                      Pay
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

export default StudentSelectedClasses;
