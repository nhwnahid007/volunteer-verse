
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { useEffect, useState } from "react";



const MyBeVolunteerReq = () => {
    const lists = useLoaderData()
   const {volunteer_email} = lists

    console.log(lists);
   
    const [list, setList] = useState([]);
    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/mybevolunteerreq/${volunteer_email}`)
        .then((res) => res.json())
        .then((data) => {
          setList(data);
        });
    }, [volunteer_email]);

   


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
    
    return (
        <div>
            <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>location</th>
              <th>Deadline</th>
              
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {list.map((singleList, index) => (
              <tr key={index} className="bg-base-200">
                <td>{singleList.post_title}</td>
                <td>{singleList.location}</td>
                <td>{singleList.deadline}</td>
                
                <td>
                  <Link to={`/Update/${singleList._id}`} className="btn bg-slate-200">
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

export default MyBeVolunteerReq;