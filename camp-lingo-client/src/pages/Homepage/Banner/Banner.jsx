/* import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; */
import { Zoom } from "react-awesome-reveal";

const Banner = () => {
  return (
    <div>
      <div className="carousel h-[400px] md:h-[470px] lg:h-[750px] w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <div
            className="hero w-full"
            style={{
              backgroundImage: `url("/assets/images/bg-8.jpg")`,
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
              <Zoom>
                <div className="max-w-[45rem]">
                  <h1 className="lg:text-7xl md:text-[43px] text-4xl  font-extrabold leading-tight">
                    Unlock{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                      Languages
                    </span>
                    <br />
                    and Explore{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                      Cultures
                    </span>{" "}
                    <br />
                    with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                      CampLingo!
                    </span>
                  </h1>
                  <p className="md:text-base text-sm font-medium leading-relaxed py-6">
                    Embark on a linguistic journey of
                    <br /> discovery and adventure at CampLingo,
                    <br /> where language comes alive.
                  </p>
                  <button className="text-base text-black font-bold bg-gradient-to-r from-[#47ff19] to-green-500 rounded-lg px-6 py-3">
                    Enroll Now!
                  </button>
                </div>
              </Zoom>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 md:left-5 md:right-5 left-1 right-1 top-1/2">
            <a href="#slide3" className="btn btn-circle ">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div
            className="hero w-full"
            style={{
              backgroundImage: `url("/assets/images/bg-6.jpg")`,
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-50"></div>
            <div className="hero-content text-center text-neutral-content">
              <Zoom>
                <div className="max-w-[45rem]">
                  <h1 className="lg:text-7xl md:text-[43px] text-4xl  font-extrabold leading-tight">
                    Unlock{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                      Languages
                    </span>
                    <br />
                    and Explore{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                      Cultures
                    </span>{" "}
                    <br />
                    with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                      CampLingo!
                    </span>
                  </h1>
                  <p className="md:text-base text-sm font-medium leading-relaxed py-6">
                    Embark on a linguistic journey of
                    <br /> discovery and adventure at CampLingo,
                    <br /> where language comes alive.
                  </p>
                  <button className="text-base text-black font-bold bg-gradient-to-r from-[#47ff19] to-green-500 rounded-lg px-6 py-3">
                    Enroll Now!
                  </button>
                </div>
              </Zoom>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 md:left-5 md:right-5 left-1 right-1 top-1/2">
            <a href="#slide1" className="btn btn-circle ">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle ">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <div
            className="hero w-full"
            style={{
              backgroundImage: `url("/assets/images/bg-2.jpg")`,
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-50"></div>
            <div className="hero-content text-center text-neutral-content">
              <Zoom>
                <div className="max-w-[45rem]">
                  <h1 className="lg:text-7xl md:text-[43px] text-4xl  font-extrabold leading-tight">
                    Unlock{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                      Languages
                    </span>
                    <br />
                    and Explore{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                      Cultures
                    </span>{" "}
                    <br />
                    with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                      CampLingo!
                    </span>
                  </h1>
                  <p className="md:text-base text-sm font-medium leading-relaxed py-6">
                    Embark on a linguistic journey of
                    <br /> discovery and adventure at CampLingo,
                    <br /> where language comes alive.
                  </p>
                  <button className="text-base text-black font-bold bg-gradient-to-r from-[#47ff19] to-green-500 rounded-lg px-6 py-3">
                    Enroll Now!
                  </button>
                </div>
              </Zoom>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 md:left-5 md:right-5 left-1 right-1 top-1/2">
            <a href="#slide2" className="btn btn-circle ">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle ">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
