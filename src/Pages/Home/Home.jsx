import { Link, useLoaderData } from "react-router-dom";
import Carousel from "../../components/Carousel";
import VolunteerCard from "../../components/VolunteerCard";
import { MdChevronRight } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import Faq from "../../components/Faq";
import { TypeAnimation } from "react-type-animation";
import Features from "../../components/Features";

const Home = () => {
  const volunteers = useLoaderData();
  console.log(volunteers);
  const limitedVolunteers = volunteers.slice(0, 6);
  console.log(limitedVolunteers);
  return (
    <div data-aos="fade-up"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-anchor-placement="top-center" className="">
      <Helmet>
        <title>Volunteer verse</title>
      </Helmet>

<p className="flex justify-center">
<TypeAnimation
      sequence={[
       
        'We produce service for Hoomeless',
        1000, 
        'We produce service for Social ',
        1000,
        'We produce service for Youth',
        1000,
        'We produce service for education',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
</p>

      <div className="z-0">
        {" "}
        <Carousel></Carousel>
      </div>

      <p className="font-merriweather mx-auto animate-pulse my-5 mt-20 text-5xl text-center bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">Join Us</p>


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

      <div className="mt-5"><Faq></Faq></div>
      <div className="">
        <Features></Features>
      </div>
    </div>
  );
};

export default Home;
