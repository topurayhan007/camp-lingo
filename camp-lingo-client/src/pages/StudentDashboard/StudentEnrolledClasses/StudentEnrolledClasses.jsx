import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../../providers/ThemeProvider";
import useStudentEnrolled from "../../../hooks/useStudentEnrolled";

const StudentEnrolledClasses = () => {
  const { theme } = useContext(ThemeContext);
  const [studentEnrolledClasses] = useStudentEnrolled();
  return (
    <div className="absolute top-0">
      <Helmet>
        <title>CampLingo | Enrolled Classes</title>
      </Helmet>
      <h2 className="text-center text-xl md:text-4xl font-bold mt-3 md:mt-6 mb-3">
        All Enrolled Classes
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
                <th>Instructor Name</th>
                <th>Instructor Email</th>
                <th>Enrolled</th>
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
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="font-bold">
                        <h4>{cls.instructorName}</h4>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="badge badge-ghost text-blue-400">
                      {cls.instructorEmail}
                    </div>
                  </td>
                  <td>
                    <label className="font-bold"> {cls.enrolled}</label>
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

export default StudentEnrolledClasses;
