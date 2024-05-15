import { Link, useLoaderData } from "react-router-dom";
import Carousel from "../../components/Carousel";
import VolunteerCard from "../../components/VolunteerCard";
import { MdChevronRight } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const volunteers = useLoaderData();
  console.log(volunteers);
  const limitedVolunteers = volunteers.slice(0, 6);
  console.log(limitedVolunteers);
  return (
    <div className="">
      <Helmet>
        <title>Volunteer verse</title>
      </Helmet>
      <div className="z-0">
        {" "}
        <Carousel></Carousel>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {limitedVolunteers.map((volunteer) => (
          <VolunteerCard
            volunteer={volunteer}
            key={volunteer._id}
          ></VolunteerCard>
        ))}
      </div>
      <div className="flex justify-center items-center">
          <Link to='/needvolunteer' className="flex my-5 justify-center mx-auto flex-row items-center rounded-xl bg-orange-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-orange-600 active:bg-orange-700 dark:bg-orange-400 dark:text-white dark:hover:bg-orange-300 dark:active:bg-orange-200">
            See ALL <MdChevronRight className="text-lg" />
          </Link>
      </div>
    </div>
  );
};

export default Home;
