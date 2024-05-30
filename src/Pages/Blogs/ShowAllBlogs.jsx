import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const ShowAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/blogs`
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const toggleFullContent = (index) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index].showFullContent = !updatedBlogs[index].showFullContent;
    setBlogs(updatedBlogs);
  };

  return (
    <div
      data-aos="fade-left"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-anchor-placement="top-center"
    >
      <Helmet>
        <title>All Blogs</title>
      </Helmet>
      <section className="max-w-4xl mt-10 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-5xl text-center font-merriweather font-semibold capitalize dark:text-white">
          <span
            style={{
              background: "linear-gradient(to right, #ff7e5f, #feb47b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            All Blogs
          </span>
        </h2>

        {blogs.map((blog, index) => (
          <div key={blog._id} className="mt-6">
            <h3 className="text-3xl font-bold text-gray-700 dark:text-white">
              <span className="font-black">Title:</span> {blog.title}
            </h3>
            <p className="text-sm text-gray-400">
                <span className="font-bold">By:</span> {blog.
authorName}
            </p>
            <div className="mt-3">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="blog-image w-full h-[600px] rounded-md"
              />
            </div>
            <div className="mt-3">
              <p className="text-gray-700 opacity-70 dark:text-gray-300">
                {blog.showFullContent
                  ? blog.content
                  : `${blog.content.slice(0, 150)}...`}
              </p>
              {!blog.showFullContent && (
                <button
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  onClick={() => toggleFullContent(index)}
                >
                  Read More
                </button>
              )}
            </div>
            <div className="mt-3">
              <p className="text-gray-500 font-semibold dark:text-gray-400">
                Published on: {blog.date}
              </p>
            </div>
            {index !== blogs.length - 1 && (
              <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ShowAllBlogs;
