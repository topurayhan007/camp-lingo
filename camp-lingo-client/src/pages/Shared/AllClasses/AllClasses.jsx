import { Helmet } from "react-helmet-async";
import useApprovedClasses from "../../../hooks/useApprovedClasses";
import ClassCard from "../ClassCard/ClassCard";
import Cover from "../../../components/Cover/Cover";

const AllClasses = () => {
  const [approvedClasses, loading] = useApprovedClasses();
  return (
    <div className="mb-24">
      <Helmet>
        <title>CampLingo | All Classes</title>
      </Helmet>

      <div className="md:mb-24 mb-12">
        <Cover img="/assets/images/classes-bg.jpg" title="Our Classes"></Cover>
        <div className="max-w-screen-xl mx-auto px-3 justify-center items-center mt-3">
          {loading ? (
            <div className="my-14 flex justify-center">
              <span className="loading loading-spinner text-green-500"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {/* Cards Here */}
              {approvedClasses.map((cls) => (
                <ClassCard key={cls._id} cls={cls}></ClassCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
