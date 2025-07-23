// src/pages/AllClasses.jsx
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import useAxiosPublic from "../../../hooks/UseAxoisPublic";
import Loading from "../../shared/Loading/Loading";
import { motion } from "framer-motion";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['approvedClasses'],
    queryFn: async () => {
      const res = await axiosPublic.get('/classes?status=approved');
      return res.data;
    }
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="px-4 md:px-10 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">All Approved Classes</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(singleClass => (
          <div key={singleClass._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={singleClass.image} alt={singleClass.title} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{singleClass.title}</h2>
              <p className="text-gray-600">Instructor: {singleClass.instructorName}</p>
              <p className="text-gray-500">Price: ${singleClass.price}</p>
              <p className="text-sm text-gray-600">{singleClass.description?.slice(0, 100)}...</p>
              <p>Total Enrolled: {singleClass.totalEnrolled || 0}</p>

              <div className="mt-4">
                <Link to={`/classDetails/${singleClass._id}`}>
                     <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="btn btn-primary w-full"
>
  Enroll
</motion.button>
                </Link>
              </div>
           
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
