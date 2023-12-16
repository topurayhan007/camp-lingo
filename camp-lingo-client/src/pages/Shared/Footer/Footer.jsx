import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer footer-center p-10 bg-gradient-to-b from-green-100 to-green-500 text-neutral">
        <div>
          <img src="/logo-dark.png" alt="" />
          <p className="font-bold text-2xl">CampLingo</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 footer text-base">
          <div>
            <span className="footer-title">Company</span>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>

          <div>
            <span className="footer-title">Explore</span>
            <a className="link link-hover">Features</a>
            <a className="link link-hover">Security</a>
            <a className="link link-hover">Pricing</a>
          </div>
        </div>
      </footer>
      <footer className="footer items-center py-5 px-10 bg-green-500 text-black border-t border-black">
        <div className="items-center grid-flow-col text-base font-extrabold">
          <p>
            {" "}
            <span>Copyright © 2023 - All right reserved by </span>{" "}
            <a
              href="https://www.linkedin.com/in/topurayhan007/"
              className="font-extrabold text-slate-700"
            >
              @topurayhan007
            </a>
          </p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-2xl">
          <a href="https://facebook.com/topurayhan007">
            <FaFacebook />
          </a>
          <a href="https://www.linkedin.com/in/topurayhan007/">
            <FaLinkedin />
          </a>
          <a href="https://github.com/topurayhan007">
            <FaGithub />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
