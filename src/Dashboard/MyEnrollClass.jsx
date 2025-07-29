import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';



import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/UseAxoisSecure';
import Loading from '../pages/shared/Loading/Loading';

const MyEnrollClasses = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: enrolledClasses = [], isLoading, error } = useQuery({
    queryKey: ['enrolledClasses', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolled-classes?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading enrolled classes</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Enrolled Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.length === 0 && (
          <p className="text-center col-span-full">No enrolled classes found.</p>
        )}

        {enrolledClasses.map((cls) => (
          <div
            key={cls._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{cls.title}</h3>
           

              <button
                onClick={() => navigate(`/dashboard/my-enroll-class/${cls.classId}`)} 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClasses;
