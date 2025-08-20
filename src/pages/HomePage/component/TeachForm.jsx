import { useContext, useState, } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../../context/AuthContext';
import useAxiosSecure from '../../../hooks/UseAxoisSecure';
import Loading from '../../shared/Loading/Loading';

const categories = [
  'Web Development',
  'Digital Marketing',
  'Graphic Design',
  'Data Science',
  'Cybersecurity',
];

const TeachForm = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [showForm, setShowForm] = useState(false);

  // Fetch current teacher request status with react-query useQuery
  const { data: requestStatus, isLoading } = useQuery({
    queryKey: ['teacher-request', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-request?email=${user.email}`);
      return res.data?.status || null;
    },
    onSuccess: (data) => {
      if (data === null) {
        setShowForm(true); // no request, show form
      } else if (data === 'rejected') {
        setShowForm(false); // show rejected message + resubmit button, hide form initially
      } else {
        setShowForm(false); // pending or approved, no form
      }
    },
    onError: () => {
      setShowForm(true); // if error (e.g. 404), show form
    }
  });

  // Mutation for submitting new teacher request
  const submitMutation = useMutation({
    mutationFn: async (formData) => {
      const teacherData = {
        name: user.displayName,
        image: user.photoURL,
        email: user.email,
        experience: formData.experience,
        title: formData.title,
        category: formData.category,
        status: 'pending',
      };
      return await axiosSecure.post('/teacher-request', teacherData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['teacher-request', user?.email]);
      reset();
      setShowForm(false);
    },
    onError: (err) => {
      if (err.response?.status === 409) {
        alert('You have already submitted a request.');
        queryClient.invalidateQueries(['teacher-request', user?.email]);
      } else {
        console.error('Submit error:', err);
      }
    }
  });

  // Handle form submit
  const onSubmit = (data) => {
    submitMutation.mutate(data);
  };

  // Show form again when user clicks "Request to Another" button (for rejected status)
  const handleResubmit = () => {
    setShowForm(true);
  };

  if (isLoading) return <Loading />;

  // When form is hidden, show messages and/or resubmit button
  if (!showForm) {
    if (requestStatus === 'approved') {
      return (
        <div className="text-green-600 text-center text-xl font-bold mt-10">
          ✅ You are now a teacher!
        </div>
      );
    }
    if (requestStatus === 'pending') {
      return (
        <div className="text-yellow-500 text-center text-lg font-semibold mt-10">
          ⏳ Your request is under review. Please wait for admin approval.
        </div>
      );
    }
    if (requestStatus === 'rejected') {
      return (
        <div className="text-center mt-10">
          <p className="text-red-600 mb-4 text-lg font-semibold">
            ❌ Your previous request was rejected.
          </p>
          <button
            onClick={handleResubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Request to Another
          </button>
        </div>
      );
    }
  }

  // Show the form
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 mt-20  border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Teach on EduManage</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium text-gray-900">Name</label>
          <input
            value={user.displayName}
            readOnly
            className="w-full text-gray-50 px-4 py-2 border  rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-black font-medium">Email</label>
          <input
            value={user.email}
            readOnly
            className="w-full   px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium ">Profile Image</label>
          <img
            src={user.photoURL}
            alt="User"
            className="w-20 h-20 rounded-full object-cover border "
          />
        </div>

        <div>
          <label className="block mb-1  text-gray-50 font-medium">Experience</label>
          <select
            {...register('experience', { required: true })}
            className="w-full px-4 py-2 border  rounded"
          >
            <option className='text-gray-600' value="">Select experience level</option>
            <option className='text-gray-600' value="beginner">Beginner</option>
            <option className='text-gray-500' value="mid-level">Mid-level</option>
            <option className='text-gray-600' value="experienced">Experienced</option>
          </select>
          {errors.experience && <p className="text-red-500 text-sm">Experience is required.</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            {...register('title', { required: true })}
            className="w-full px-4 py-2 border rounded"
            placeholder="Your teaching title"
          />
          {errors.title && <p className="text-red-500 text-sm">Title is required.</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register('category', { required: true })}
            className="w-full px-4 py-2 border rounded"
          >
            <option className='text-gray-600' value="">Select a category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">Category is required.</p>}
        </div>

        <button
          type="submit"
          disabled={submitMutation.isLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
        >
          {submitMutation.isLoading ? 'Submitting...' : 'Submit for Review'}
        </button>
      </form>
    </div>
  );
};

export default TeachForm;
