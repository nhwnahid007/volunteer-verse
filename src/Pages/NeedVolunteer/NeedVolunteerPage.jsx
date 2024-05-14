import{ useState } from "react";
import { useLoaderData } from "react-router-dom";
import NeedVolunteerPageCard from "./NeedVolunteerPageCard";

const NeedVolunteerPage = () => {
    const allVolunteers = useLoaderData();
    console.log(allVolunteers)
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredVolunteers, setFilteredVolunteers] = useState(allVolunteers);
    
    // Filter volunteers based on search term
    const handleSearch = () => {
        const filtered = allVolunteers.filter(volunteer =>
            volunteer.post_title && volunteer.post_title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVolunteers(filtered);
    };

    return (
        <div>
            {/* Search Input */}
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search by Post Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 mr-2"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
            </div>
            
            {/* Grid to display volunteers */}
            <div className="grid lg:grid-cols-2 gap-5">
                {filteredVolunteers.map(volunteer => (
                    <NeedVolunteerPageCard
                        volunteer={volunteer}
                        key={volunteer._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default NeedVolunteerPage;
