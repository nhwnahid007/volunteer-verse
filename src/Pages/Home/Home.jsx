import { useLoaderData } from "react-router-dom";
import Carousel from "../../components/Carousel";
import VolunteerCard from "../../components/VolunteerCard";


const Home = () => {
    const volunteers= useLoaderData()
    console.log(volunteers)
    const limitedVolunteers = volunteers.slice(0,6)
    console.log(limitedVolunteers)
    return (
        <div className="">
           <div className="z-0"> <Carousel></Carousel></div>

        <div className="grid gap-5 lg:grid-cols-2">
            {
                limitedVolunteers.map(volunteer =><VolunteerCard volunteer={volunteer} key={volunteer._id}></VolunteerCard>)
            }
        </div>
        </div>
    );
};

export default Home;