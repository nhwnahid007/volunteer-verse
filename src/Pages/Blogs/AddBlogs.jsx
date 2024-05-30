import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTIN_KEY;

const AddBlogs = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const title = formData.get("title");
    const content = formData.get("content");
    const imageFile = formData.get("thumbnail");
    const date = new Date().toLocaleDateString();
    const authorName = user ? user.displayName : "Anonymous"; // Get author's name from user context or set as "Anonymous" if not available

    setLoading(true);
    const loadingToastId = toast.loading("Please wait, it will take some time...");

    try {
      let imageUrl = "";
      if (imageFile) {
        // Upload image to imgbb
        const imgbbFormData = new FormData();
        imgbbFormData.append("image", imageFile);

        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
          imgbbFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = imgbbResponse.data.data.url;
      }

      if (!imageUrl) {
        toast.error("Image upload failed. Please try again.");
        setLoading(false);
        toast.dismiss(loadingToastId);
        return;
      }

      const blogData = { title, content, imageUrl, date, authorName }; // Include authorName in blog data
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        blogData,
        { withCredentials: true }
      );

      if (response.data.insertedId) {
        toast.success("Blog added successfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.error("Error submitting the blog:", error);
      toast.error("Error submitting the blog. Please try again.");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div
      data-aos="fade-left"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-anchor-placement="top-center"
    >
      <Helmet>
        <title>Write Blog</title>
      </Helmet>
      <section className="max-w-4xl mt-10 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl text-center font-merriweather font-semibold text-gray-700 capitalize dark:text-white">
          Write Blog
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="title"
              >
                Title
              </label>
              <input
                required
                id="title"
                type="text"
                name="title"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="thumbnail"
              >
                Thumbnail
              </label>
              <input
                required
                id="thumbnail"
                type="file"
                name="thumbnail"
                accept="image/*"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="name"
              >
                Author Name
              </label>
              <input
                required
                defaultValue={user?.displayName || "Anonymous"}
                readOnly
                id="name"
                type="text"
                name="name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="date"
              >
                Date
              </label>
              <input
                required
                readOnly
                id="date"
                type="text"
                name="date"
                value={new Date().toLocaleDateString()}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="w-full mt-5">
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="content"
            >
              Blog Post
            </label>
            <textarea
              required
              id="content"
              name="content"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            ></textarea>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="px-8 w-full block py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddBlogs;
