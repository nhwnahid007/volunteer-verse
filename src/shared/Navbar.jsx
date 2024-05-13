import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import swal from "sweetalert";

const Navbar = () => {
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme || "light");
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  console.log(user?.photoURL);
  const handleToggle = (e) => {
    const selectedTheme = e.target.checked ? "retro" : "light";
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleSignOut = () => {
    logOut().then(() => {
      console.log("logged out");
      swal("Good job!", "Successfully Logged Out!", "success");
    });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " font-black bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"
              : "font-bold hover:bg-gray-200 hover:text-gray-500 hover:underline hover:underline-offset-2"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn p-0 btn-ghost text-xl flex items-center">
          <img
            className="w-12 h-12"
            src="https://i.postimg.cc/Tw9h3ZhY/volunteerverse.png"
            alt="Volunteerverse Logo"
          />
          <span className="text-2xl hidden z-0 md:flex font-bold dark:text-gray-800">
            Volunteerverse
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <label className="flex mr-5 cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === "retro"}
            value="synthwave"
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        {user ? (
          <>
            <div
              data-tip={user?.displayName}
              className="z-50 tooltip tooltip-left dropdown dropdown-end"
            >
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className=" w-10 rounded-full">
                  <img
                    alt="userPhoto"
                    src={user?.photoURL ||
                      "https://i.ibb.co/FHfFTWX/User-Profile-PNG-Free-Download.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Add Volunteer Post</a>
                </li>
                <li>
                  <a>Manage My Post</a>
                </li>
                <li>
                  <button onClick={handleSignOut} className="font-bold">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link to="/login" className="btn p-1 md:p-3">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
