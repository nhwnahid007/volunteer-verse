import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import NeedVolunteerPageCard from "./NeedVolunteerPageCard";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { CiViewTable } from "react-icons/ci";
import { Helmet } from "react-helmet-async";

const NeedVolunteerPage = () => {
  const allVolunteers = useLoaderData();
  console.log(allVolunteers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVolunteers, setFilteredVolunteers] = useState(allVolunteers);
  const [isTableLayout, setIsTableLayout] = useState(false); // Track layout type

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = () => {
    const filtered = allVolunteers.filter(
      (volunteer) =>
        volunteer.post_title &&
        volunteer.post_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVolunteers(filtered);
  };

  const toggleLayout = (layoutType) => {
    setIsTableLayout(layoutType); // Set layout type
  };

  return (
    <div data-aos="flip-up"

    data-aos-delay="50"
    data-aos-duration="1000"
    
    data-aos-anchor-placement="top-center">
      <Helmet>
        <title>Need volunteer</title>
      </Helmet>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by Post Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border w-44 border-gray-300 rounded-md px-3 py-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
        <button
  onClick={() => toggleLayout(false)}
  className={`bg-green-500 text-white px-4 py-2 rounded-md ml-2 ${!isTableLayout ? 'bg-green-500' : 'bg-slate-400'}`}
>
  <TfiLayoutGrid3 className="font-bold text-2xl " />
</button>
<button
  onClick={() => toggleLayout(true)}
  className={`bg-green-500 text-white px-4 py-2 rounded-md ml-2 ${isTableLayout ? 'bg-green-500' : 'bg-slate-400'}`}
>
  <CiViewTable className="font-bold text-2xl " />
</button>


      </div>

      {/* Grid or Table to display volunteers */}
      {isTableLayout ? (
       <table className="table-auto w-full overflow-x-auto">
       <thead>
         <tr>
           <th className="px-2 py-2 md:px-4 md:py-2 font-bold">Title</th>
           <th className="hidden md:flex px-2 py-2 md:px-4 md:py-2 font-bold">Category</th>
           <th className="  hidden md:flex px-2 py-2 md:px-4 md:py-2 font-bold">Location</th>
           <th className="px-2 py-2 md:px-4 md:py-2 font-bold">Deadline</th>
           <th className="px-2 py-2 md:px-4 md:py-2 font-bold">Details</th>
         </tr>
       </thead>
       <tbody>
         {filteredVolunteers.map((volunteer) => (
           <tr key={volunteer._id}>
             <td className="border px-2 py-2 md:px-4 md:py-2">{volunteer.post_title}</td>
             <td className="hidden md:flex border px-2 py-2 md:px-4 md:py-2">{volunteer.category}</td>
             <td className="  hidden md:flex border px-2 py-2 md:px-4 md:py-2">{volunteer.location}</td>
             <td className="border px-2 py-2 md:px-4 md:py-2">{volunteer.deadline}</td>
             <td className="border px-2 py-2 md:px-4 md:py-2">
               <Link to={`/volunteer/${volunteer._id}`} className="btn text-blue-500 hover:underline">
                 View Details
               </Link>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
     
      ) : (
        <div className="grid lg:grid-cols-3 gap-5">
          {filteredVolunteers.map((volunteer) => (
            <NeedVolunteerPageCard volunteer={volunteer} key={volunteer._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NeedVolunteerPage;
