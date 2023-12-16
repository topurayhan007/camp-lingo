import Cover from "../../../components/Cover/Cover";
import useTopClasses from "../../../hooks/useTopClasses";
import ClassCard from "../../Shared/ClassCard/ClassCard";

const PopularClasses = () => {
  const [topClasses, loading] = useTopClasses();
  return (
    <div className="my-24">
      {/* <Helmet>
        <title>CampLingo | All Classes</title>
      </Helmet> */}

      <div className="md:mb-24 mb-12">
        <Cover
          img="/assets/images/classes-bg.jpg"
          title="Our Popular Classes"
        ></Cover>
        <div className="max-w-screen-xl mx-auto px-3 justify-center items-center mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* Cards Here */}
            {loading ? (
              <div className="my-14 flex justify-center">
                <span className="loading loading-spinner text-green-500"></span>
              </div>
            ) : (
              topClasses.map((cls) => (
                <ClassCard key={cls._id} cls={cls}></ClassCard>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularClasses;
