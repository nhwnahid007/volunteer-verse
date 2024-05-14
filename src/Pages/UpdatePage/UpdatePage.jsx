import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdatePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const volunteer = useLoaderData()
const {_id,post_title,thumbnail,description,category,location,volunteers_needed,deadline} =volunteer

  console.log(user);
  const [startDate, setStartDate] = useState(deadline);


  const handleUpdateNewVolunteer = async (event) => {
    event.preventDefault();
    const form = event.target;
    const post_title = form.title.value;
    const thumbnail = form.thumbnail.value;
    const description = form.description.value;
    const category = form.category.value;
    const location = form.location.value;
    const deadline = new Date(startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    console.log(deadline)
    const volunteers_needed = parseFloat(form.volunteerneed.value);
    const organizer_name = form.name.value;
    const organizer_email = form.email.value;
    
    const needVolunteerData = {
      post_title,
      thumbnail,
      description,
      category,
      deadline,
      location,
      volunteers_needed,
      organizer_name,
      organizer_email,
    };
    
    console.table(needVolunteerData);
    
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/volunteer/${_id}`, 
        needVolunteerData
      );
      console.log(data);
      toast.success("Updated successfully");
      navigate("/needvolunteer");
    } catch (err) {
      console.error(err);
    }
    
  };
  return (
    <div>
      <section className="max-w-4xl mt-10 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl text-center font-merriweather font-semibold text-gray-700 capitalize dark:text-white">
          Add Volunteer Post
        </h2>
        <form onSubmit={handleUpdateNewVolunteer}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Post Title
              </label>
              <input
              defaultValue={post_title}
                id="username"
                type="text"
                name="title"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Thumbnail
              </label>
              <input
              defaultValue={thumbnail}
                id="username"
                type="text"
                name="thumbnail"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Description
              </label>
              <input
              defaultValue={description}
                id="username"
                type="text"
                name="description"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Category
              </label>
              <input
                id="username"
                defaultValue={category}
                type="text"
                name="category"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Location
              </label>
              <input
              defaultValue={location}
                id="username"
                type="text"
                name="location"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                No. of volunteer Needed
              </label>
              <input
              defaultValue={volunteers_needed}
                id="username"
                type="text"
                name="volunteerneed"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div className="flex  flex-col gap-2">
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Deadline
              </label>
              
              <DatePicker
              
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Organizer Name
              </label>
              <input
                defaultValue={user?.displayName}
                readOnly
                id="username"
                type="text"
                name="name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="mt-3">
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="emailAddress"
            >
              Organizer Email Address
            </label>
            <input
              defaultValue={user?.email}
              readOnly
              id="emailAddress"
              type="email"
              name="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>
          <div className="mt-6">
            <button className="px-8 w-full block py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdatePage;
