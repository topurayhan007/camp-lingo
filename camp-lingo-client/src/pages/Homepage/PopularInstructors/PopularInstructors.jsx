import Cover from "../../../components/Cover/Cover";
import useTopInstructors from "../../../hooks/useTopInstructors";
import InstructorCard from "../../Shared/InstructorCard/InstructorCard";

const PopularInstructors = () => {
  const [topInstructors, loading] = useTopInstructors();
  return (
    <div className="my-24">
      {/*  <Helmet>
        <title>CampLingo | All Classes</title>
      </Helmet> */}

      <div className="md:mb-24 mb-12">
        <Cover
          img="/assets/images/instructor-2.jpg"
          title="Our Popular Instructors"
        ></Cover>

        <div className="max-w-screen-xl mx-auto px-3 flex justify-center items-center mt-3">
          {loading ? (
            <div className="my-14 flex justify-center">
              <div className="loading loading-spinner text-green-500 w-20"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {/* Cards Here */}
              {topInstructors.map((instructor) => (
                <InstructorCard
                  key={instructor._id}
                  instructor={instructor}
                ></InstructorCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularInstructors;
