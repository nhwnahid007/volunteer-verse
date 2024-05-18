import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { Helmet } from "react-helmet-async";

const MangeMyPost = () => {
    const { user } = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/managemypost/${user?.email}`,{
        
          credentials: 'include'
        
      })
        .then((res) => res.json())
        .then((data) => {
          setList(data);
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); 
        });
    }, [user]);

    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`${import.meta.env.VITE_API_URL}/volunteer/${_id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.deletedCount > 0) {
                  toast.success('Deleted Successfully')
                  const remaining = list.filter(
                    (remainingList) => remainingList._id !== _id
                  );
                  setList(remaining);
                }
              });
          }
        });
      };

    if (loading) {
        return null;
    }

    if(list.length<1){
        return <h1 data-aos="flip-left"

        data-aos-delay="50"
        data-aos-duration="1000"
        
        data-aos-anchor-placement="top-center" className="text-2xl mt-10 font-black text-red-600 text-center">You have not added any volunteer yet</h1>
    }

    return (
        <div data-aos="zoom-in-down"

        data-aos-delay="50"
        data-aos-duration="1000"
        
        data-aos-anchor-placement="top-center" >
          <Helmet>
        <title>Manage My post</title>
      </Helmet>
            <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th className="hidden lg:flex">location</th>
              <th className="hidden lg:flex">Deadline</th>
              
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {list.map((singleList, index) => (
              <tr key={index} className="bg-base-200">
                <td>{singleList.post_title}</td>
                <td className="hidden md:flex">{singleList.location}</td>
                <td className="hidden md:flex">{singleList.deadline}</td>
                
                <td>
                  <Link to={`/Update/${singleList._id}`} className="btn bg-orange-400">
                 <span className="flex items-center gap-1"> <GrUpdate />   Update</span>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(singleList._id)}
                    className="btn text-white bg-red-500"
                  >
                    {" "}
                    <span className="flex items-center gap-1"><FaDeleteLeft></FaDeleteLeft> Delete{" "}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    );
};

export default MangeMyPost;
