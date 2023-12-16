import { Fade } from "react-awesome-reveal";
import LazyLoad from "react-lazy-load";

const InstructorCard = ({ instructor }) => {
  const { name, photo, email } = instructor;
  return (
    <Fade>
      <div>
        <div
          className={`card card-compact md:w-96 w-full shadow-md drop-shadow-md`}
        >
          <LazyLoad height={350} offset={200} threshold={0.95} className="">
            <figure className="h-[350px] rounded-tr-2xl rounded-tl-2xl relative">
              <img
                src={photo}
                alt={`${name}'s Image`}
                className="w-full h-full object-cover"
              />
            </figure>
          </LazyLoad>

          <div className={`card-body p-0 bg-[#f3fff1]`}>
            <p className=" text-xl font-bold text-center">
              <span className="text-black text-2xl">{name}</span>
            </p>
            <div className="text-center flex justify-center">
              <h2 className="text-lg text-slate-500 text-center">{email}</h2>
            </div>
          </div>
          <button className=" btn border-0 md:text-xl md:h-14 normal-case text-black bg-green-400 hover:bg-green-500 disabled:bg-slate-300 rounded-br-2xl rounded-bl-2xl rounded-tr-none rounded-tl-none">
            See Classes
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default InstructorCard;
