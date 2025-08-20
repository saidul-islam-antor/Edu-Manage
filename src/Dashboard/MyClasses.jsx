import { useContext } from "react";


import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/UseAxoisSecure";
import { AuthContext } from "../context/AuthContext";

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Load classes for the logged-in teacher
  const { data: myClasses = [], refetch } = useQuery({
    queryKey: ['myClasses', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?email=${user.email}`);
      return res.data;
    }
  });

  // DELETE handler
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to recover this class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/classes/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Class has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error", "Something went wrong!", "error",{error});
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-base-200">
      <h2 className="text-3xl font-bold mb-6 text-center">My Classes</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {myClasses.map(singleClass => (
          <div key={singleClass._id} className="bg-base-100 shadow-xl rounded-xl overflow-hidden">
            <img src={singleClass.image} alt={singleClass.title} className="w-full  h-52 object-cover" />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold">{singleClass.title}</h3>
              <p><span className="font-medium">Name:</span> {singleClass.instructorName}</p>
              <p><span className="font-medium">Email:</span> {singleClass.email}</p>
              <p><span className="font-medium">Price:</span> ${singleClass.price}</p>
              <p><span className="font-medium">Description:</span> {singleClass.description}</p>
              <p>
                <span className="font-medium">Status:</span>
                <span className={`ml-2 px-2 py-1 text-sm rounded 
                    ${singleClass.status === 'pending' && 'bg-yellow-100 text-yellow-700'}
                    ${singleClass.status === 'approved' && 'bg-green-100 text-green-700'}
                    ${singleClass.status === 'rejected' && 'bg-red-100 text-red-700'}
                `}>
                  {singleClass.status}
                </span>
              </p>

              <div className="flex justify-between items-center mt-4 gap-2">
                <Link to={`/dashboard/updateClass/${singleClass._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Update
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(singleClass._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>

                <Link to={`/dashboard/myClass/${singleClass._id}`}>
                  <button
                    disabled={singleClass.status !== "approved"}
                    className={`px-4 py-1 rounded 
                      ${singleClass.status === 'approved' ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}
                    `}
                  >
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
