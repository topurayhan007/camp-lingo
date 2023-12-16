import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../../providers/ThemeProvider";
import useStudentEnrolled from "../../../hooks/useStudentEnrolled";
import { useContext } from "react";

const PaymentHistory = () => {
  const { theme } = useContext(ThemeContext);
  const [studentEnrolledClasses] = useStudentEnrolled();
  return (
    <div className="absolute top-0">
      <Helmet>
        <title>CampLingo | Payment History</title>
      </Helmet>
      <h2 className="text-center text-xl md:text-4xl font-bold mt-3 md:mt-6 mb-3">
        Payment Details
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
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}

              {studentEnrolledClasses.map((cls, index) => (
                <tr key={cls._id} className="border-t-[1.18px]">
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-circle w-14 h-14">
                          <img src={cls.classImage} alt={`${cls.name} photo`} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base">
                          {cls.className}
                        </div>
                        <div className="badge badge-ghost text-blue-400">
                          {cls.instructorEmail}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="">
                      {new Date(cls.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </td>

                  <td>
                    <div className=" text-green-400">{cls.transactionId}</div>
                  </td>
                  <td>
                    <label className="font-bold"> ${cls.price}</label>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
