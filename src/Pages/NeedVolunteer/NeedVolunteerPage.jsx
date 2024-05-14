import { useLoaderData } from "react-router-dom";
import NeedVolunteerPageCard from "./NeedVolunteerPageCard";


const NeedVolunteerPage = () => {
    const volunteers = useLoaderData()
    console.log(volunteers)
    
    return (
        <div className="grid lg:grid-cols-2 gap-5">
           {
            volunteers.map(volunteer => <NeedVolunteerPageCard volunteer={volunteer} key={volunteer._id}></NeedVolunteerPageCard>)
           }
        </div>
    );
};

export default NeedVolunteerPage;