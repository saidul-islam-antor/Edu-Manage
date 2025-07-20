import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/UseAxoisPublic';
import Loading from '../../shared/Loading/Loading';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: classInfo = {}, isLoading } = useQuery({
    queryKey: ['classDetails', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/classes/${id}`);
      return res.data;
    },
  });

  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [checkingEnroll, setCheckingEnroll] = useState(true);

  useEffect(() => {
    if (user?.email && id) {
      setCheckingEnroll(true);
      axiosPublic.get(`/enrolled-check?email=${user.email}&classId=${id}`)
        .then(res => {
          setAlreadyEnrolled(res.data.enrolled);
          setCheckingEnroll(false);
        })
        .catch(() => {
          setAlreadyEnrolled(false);
          setCheckingEnroll(false);
        });
    } else {
      setAlreadyEnrolled(false);
      setCheckingEnroll(false);
    }
  }, [user?.email, id, axiosPublic]);

  if (isLoading || checkingEnroll) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2">
          <img
            src={classInfo.image}
            alt={classInfo.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{classInfo.title}</h2>
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-semibold text-gray-800">Instructor:</span> {classInfo.instructorName}
            </p>
            <p className="text-gray-700 mb-4">{classInfo.description}</p>
            <p className="text-2xl font-bold text-blue-600">Price: ${classInfo.price}</p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate(`/paymentPage/${classInfo._id}`)}
              className={`w-full py-3 rounded-lg text-lg font-semibold transition duration-300 ${
                alreadyEnrolled
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={alreadyEnrolled}
            >
              {alreadyEnrolled ? 'Already Enrolled' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
