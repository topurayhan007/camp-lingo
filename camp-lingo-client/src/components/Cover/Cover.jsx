import { Parallax } from "react-parallax";
import { Slide } from "react-awesome-reveal";

const Cover = ({ img, title }) => {
  return (
    <Parallax
      blur={{ min: -10, max: 13 }}
      bgImage={img}
      bgImageAlt="the menu"
      strength={500}
    >
      <div className="h-96 relative">
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <h2 className="text-4xl md:text-7xl pb-6 md:pb-12 text-green-400 font-extrabold text-center">
            <Slide triggerOnce>{title}</Slide>
          </h2>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
