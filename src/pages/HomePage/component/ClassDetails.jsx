import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/UseAxoisPublic';


const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { data: classInfo = {}, isLoading } = useQuery({
    queryKey: ['classDetails', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/classes/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10">
      <img src={classInfo.image} alt={classInfo.title} className="w-full  rounded mb-6" />
      <h2 className="text-3xl font-bold mb-2">{classInfo.title}</h2>
      <p className="mb-2 text-lg font-semibold">Teacher: {classInfo.instructorName}</p>
      <p className="mb-2 text-gray-600">{classInfo.description}</p>
      <p className="text-xl font-bold">Price: ${classInfo.price}</p>

      <button
        onClick={() => navigate(`/paymentPage/${classInfo._id}`)}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default ClassDetails;
