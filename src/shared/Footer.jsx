import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="bg-gray-100">
  <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
    <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
      <a
        className="inline-block rounded-full bg-teal-600 p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4"
        href=""
      >
        <span className="sr-only">Back to top</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>

    <div className="lg:flex lg:items-end lg:justify-between">
      <div>
       
      <Link to='/' className="btn p-0 btn-ghost text-xl flex items-center">
          <img
            className="w-12 h-12"
            src="https://i.postimg.cc/Tw9h3ZhY/volunteerverse.png"
            alt="Volunteerverse Logo"
          />
          <span className="text-2xl hidden z-0 md:flex font-bold text-gray-800">
            Volunteerverse
          </span>
        </Link>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
        &quot;Join VolunteerVerse, where every act of kindness creates ripples of change. Together, we empower communities, uplift spirits, and build a brighter world through volunteering. Let&apos;s make a difference, one volunteer at a time.&quot;
        </p>
      </div>

      <ul
        className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
      >
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> About </a>
        </li>

        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Services </a>
        </li>

        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Projects </a>
        </li>

        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Blog </a>
        </li>
      </ul>
    </div>

    <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
    &copy; {new Date().getFullYear()} VolunteerVerse . All rights reserved.
    </p>
  </div>
</footer>
    );
};

export default Footer;