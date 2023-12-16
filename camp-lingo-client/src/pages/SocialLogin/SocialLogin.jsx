import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const SocialLogin = ({ children }) => {
  const { signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Handle Google PopUp Login
  const handleGoogleSignIn = () => {
    signInWithGoogle().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        photo: loggedInUser.photoURL,
        role: "student",
      };

      fetch("https://camp-lingo-server-topurayhan007.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Logged in successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          }

          navigate(from, { replace: true });
        });
    });
  };

  return (
    <div className="form-control mb-4 ">
      <div className="">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-ghost w-full bg-transparent rounded-full border-green-500 border-2 font-bold px-8 normal-case text-base"
        >
          <FcGoogle className="me-3 text-2xl" /> {children} with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
