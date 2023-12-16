import { BsStarFill } from "react-icons/bs";

const ReviewCard = ({ review }) => {
  return (
    <div data-aos="flip-left">
      <div className=" bg-[#f7fdf6] h-full shadow-md rounded-xl flex flex-col justify-between">
        <div className="card-body flex-row justify-between items-center text-lg pb-0">
          <div className="avatar">
            <div className="w-20 rounded-full">
              <img src={review.image} />
            </div>
          </div>
          <h2 className="text-xl font-bold text-green-600">{review.name}</h2>
        </div>

        <div className="card-body text-left text-lg h-full py-1">
          <div className=" flex items-center">
            <p className="py-3 text-black ">{review.review}</p>
          </div>
        </div>

        <div className="card-body pt-0">
          <div className=" flex justify-center items-center">
            <div className="w-full px-7 py-2 bg-green-300 border-2 border-black rounded-full text-black text-lg font-bold">
              <p className="flex justify-center items-center">
                <BsStarFill className="me-2" />
                {review.rating}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
