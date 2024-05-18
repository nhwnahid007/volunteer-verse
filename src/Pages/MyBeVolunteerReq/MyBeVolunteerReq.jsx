import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { MdCancel } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const MyBeVolunteerReq = () => {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/mybevolunteerreq/${user?.email}`,{
      
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
    console.log(_id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/bevolunteer/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success("Deleted Successfully");
              const remaining = list.filter(
                (remainingList) => remainingList._id !== _id
              );
              setList(remaining);
            }
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  if (loading) {
    return null;
  }

  if (list.length < 1) {
    return (
      
      <h1 className="text-2xl mt-10 font-black text-red-600 text-center">
        You have not added any volunteer Request yet
      </h1>
    );
  }

  return (
    <div data-aos="flip-down"

    data-aos-delay="50"
    data-aos-duration="1000"
    
    data-aos-anchor-placement="top-center">
      <Helmet>
        <title>My be volunteer</title>
      </Helmet>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Title</th>
            <th className="">Location</th>
            <th className="">Deadline</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {list.map((singleList) => (
            <tr key={singleList._id} className="bg-base-200">
              <td>{singleList.post_title}</td>
              <td className="">{singleList.location}</td>
              <td className="">{singleList.deadline}</td>
              <td>
                <button
                  onClick={() => handleDelete(singleList._id)}
                  className="btn text-white bg-red-500"
                >
                  {" "}
                  <span className="flex items-center gap-1">
                    <MdCancel />{" "}
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBeVolunteerReq;
