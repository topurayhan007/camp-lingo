import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserInfo, logOut } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2((prevVisible) => !prevVisible);
  };
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // SignUp func of Firebase
    createUser(data.email, data.password)
      .then((result) => {
        const createdUser = result.user;
        console.log(createdUser);

        // Updates the User info after User is created
        updateUserInfo(data.name, data.photoURL)
          .then(() => {
            const saveUser = {
              name: data.name,
              email: data.email,
              photo: data.photoURL,
              role: "student",
            };
            console.log(saveUser);

            fetch("https://camp-lingo-server-topurayhan007.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  // Calling LogOut otherwise logs in User upon account creation
                  logOut()
                    .then((result) => {
                      console.log(result);

                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User created successfully.",
                        showConfirmButton: false,
                        timer: 1500,
                      });

                      navigate("/login");
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });
                }
              });

            reset();
          })
          .catch((error2) => {
            console.log(error2.message);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error2.message,
            });
          });

        // Catch any user creation error
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  return (
    <div className="mt-10 mb-10 px-3 md:px-0  flex justify-center">
      <Helmet>
        <title>CampLingo | Sign Up</title>
      </Helmet>
      <div
        data-theme={theme === false ? "light" : "night"}
        className="max-w-5xl md:px-10 card border-slate-100 border drop-shadow-sm shadow-xl"
      >
        <div className="md:flex justify-evenly items-center md:gap-8 gap-3">
          <div className="card flex-1">
            <img src="/assets/images/register.png" className="" alt="" />
          </div>

          <div className="divider lg:divider-horizontal"></div>

          <div className="card w-full max-w-md flex-1">
            <p className="text-3xl font-bold text-center card-body pb-5">
              Sign Up
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-body pb-5 pt-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-semibold">
                      Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    {...register("name", { required: true })}
                    placeholder="Your name"
                    className="input input-bordered border-[1.8px] rounded-full border-green-500"
                  />
                  {errors.name && (
                    <span className="text-red-600 mt-1">Name is required.</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-semibold">
                      Photo URL
                    </span>
                  </label>
                  <input
                    type="text"
                    name="photoURL"
                    {...register("photoURL", { required: true })}
                    placeholder="Your photo URL"
                    className="input input-bordered border-[1.8px] rounded-full border-green-500"
                  />
                  {errors.photoURL && (
                    <p className="text-red-600 mt-1">Photo URL is required.</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-semibold">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email", { required: true })}
                    placeholder="Your email"
                    className="input input-bordered border-[1.8px] rounded-full border-green-500"
                  />
                  {errors.email && (
                    <span className="text-red-600 mt-1">
                      Email is required.
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label ">
                    <span className="label-text text-base font-semibold">
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                      })}
                      placeholder="Your password"
                      className="w-full border-[1.8px] border-green-500 input rounded-full pe-12"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute top-0 bottom-0 right-0 text-2xl px-2 pe-4 focus:outline-none"
                    >
                      {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                  </div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-600 mt-1">Password is required.</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600 mt-1">
                      Password must be 6 characters.
                    </p>
                  )}

                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600 mt-1">
                      Password must have one Uppercase, one number and one
                      special character.
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label ">
                    <span className="label-text text-base font-semibold">
                      Confirm Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible2 ? "text" : "password"}
                      name="confirmpassword"
                      {...register("confirmpassword", {
                        required: true,
                        minLength: 6,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                        validate: (val) => {
                          if (watch("password") !== val) {
                            return "Your passwords do not match!";
                          }
                        },
                      })}
                      placeholder="Your confirm password"
                      className="w-full border-[1.8px] border-green-500 input rounded-full pe-12"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility2}
                      className="absolute top-0 bottom-0 right-0 text-2xl px-2 pe-4 focus:outline-none"
                    >
                      {passwordVisible2 ? (
                        <AiFillEyeInvisible />
                      ) : (
                        <AiFillEye />
                      )}
                    </button>
                  </div>
                  {errors.confirmpassword?.type === "required" && (
                    <p className="text-red-600 mt-1">
                      Confirm password is required.
                    </p>
                  )}
                  {errors.confirmpassword?.type === "minLength" && (
                    <p className="text-red-600 mt-1">
                      Confirm password must be 6 characters.
                    </p>
                  )}

                  {errors.confirmpassword?.type === "pattern" && (
                    <p className="text-red-600 mt-1">
                      Confirm password must have one Uppercase, one number and
                      one special character.
                    </p>
                  )}

                  {errors.confirmpassword && (
                    <p className="text-red-600 mt-1">
                      {errors.confirmpassword.message}
                    </p>
                  )}
                </div>

                <div className="form-control mt-8">
                  <button
                    type="submit"
                    className="btn hover:bg-green-500 bg-green-400 text-black rounded-full font-bold px-6 normal-case text-lg border-0"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="px-8 mt-0 flex flex-col gap-4">
              <div className="flex items-center px-2">
                <hr className="flex-1 border-gray-300 border-[1px]" />
                <div className="mx-4 label-text text-base font-medium">Or</div>
                <hr className="flex-1 border-gray-300 border-[1px]" />
              </div>
              <SocialLogin>{"Sign Up"}</SocialLogin>
            </div>

            <p className="text-center px-8 pt-0 mt-4 pb-8">
              <span className="label-text text-base font-semibold">
                Already have an account?
                <Link
                  to="/login"
                  className="label-text-alt font-bold text-base link link-hover ps-2 text-green-500"
                >
                  Login!
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
