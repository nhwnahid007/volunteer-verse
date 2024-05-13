import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../Provider/AuthProvider";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const { createUser, updateUserProfile, setUser, googleLogin } = useContext(
    AuthContext
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    return;
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photo.value;
    console.log({ email, password, photoUrl, name });
    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      swal(
        "Oops!",
        "Password should be at least 6 characters or longer. Please try again.",
        "error"
      );
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Your password should contain a  uppercase letter");
      swal(
        "Oops!",
        "Your password should contain a  uppercase letter",
        "error"
      );
      return;
    } else if (!/[a-z]/.test(password)) {
      setRegisterError("Your password should contain a  lowercase letter");
      swal(
        "Oops!",
        "Your password should contain a  lowercase letter",
        "error"
      );
      return;
    }
    setRegisterError("");
    createUser(email, password)
    .then(() => {

      updateUserProfile(name,photoUrl)
  .then(()=>{
    setUser({displayName : name, photoURL : photoUrl})
      navigate(from)

  })

      swal("Good job!", "Successfully Registered!","success");
      
    })


      .catch((error) => {
        console.error(error);
        swal(
          "Oops!",
          "An error occurred during registration. Please try again.",
          "error"
        );
      });
  };
  const handleSocialLogin = (socialProvider) => {
    socialProvider().then((result) => {
      if (result.user) {
        swal("Good job!", "Successfully Logged In!", "success");
        navigate(from);
      }
    });
  };
  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 object-cover bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://i.postimg.cc/dQ5vqg83/people-5179001-1280.png)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl font-bold font-merriweather text-gray-600 text-center">
            Register Now!
          </p>
          <form onSubmit={handleRegister}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="input text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-700 border border-gray-300 dark:border-gray-700 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="name"
                name="name"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="input text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-700 border border-gray-300 dark:border-gray-700 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Photo Url
              </label>
              <input
                className="input text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-700 border border-gray-300 dark:border-gray-700 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="text"
                name="photo"
                required
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <div className="relative form-control">
                <input
                  className="input text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="h-6 w-6 text-gray-500" />
                  ) : (
                    <AiFillEye className="h-6 w-6 text-gray-500" />
                  )}
                </div>
              </div>

              {registerError && <p className="text-red-700">{registerError}</p>}
            </div>
            <div className="mt-8">
              <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                Register
              </button>
            </div>
          </form>
          <Link
            to="#"
            onClick={() => handleSocialLogin(googleLogin)}
            className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 w-full"
          >
            <div className="flex px-5 justify-center w-full py-3">
              <div className="min-w-[30px]">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <div className="flex w-full justify-center">
                <span className="whitespace-nowrap text-gray-600 font-bold">
                  Sign in with Google
                </span>
              </div>
            </div>
          </Link>
          <div className="mt-4 flex items-center w-full text-center">
            <span className="text-xs text-gray-500 capitalize text-center w-full">
              Don&apos;t have any account yet?
              <Link to="/login" className="text-blue-700">
                {" "}
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

