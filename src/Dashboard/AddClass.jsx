import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/UseAxoisSecure';
import { useNavigate } from 'react-router';

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate=useNavigate()

  const onSubmit = async (data) => {
    const classData = {
      title: data.title,
      instructorName: user.displayName,
      email: user.email,
      price: parseFloat(data.price),
      image: data.image,
      description: data.description,
      status: 'pending',
      totalEnrolled: 0,
    };

    try {
      const res = await axiosSecure.post('/classes', classData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Class Added',
          text: 'Your class has been submitted for review.',
        });
        navigate('/dashboard/myClasses')
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 bg-base-100 text-base-content">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Class</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5  p-6 rounded-xl shadow">

        {/* Class Title */}
        <div>
          <label className="block mb-1 font-medium">Class Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            type="text"
            placeholder="Enter class title"
            className="w-full border px-4 py-2 rounded"
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Instructor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Instructor Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full border px-4 py-2 rounded "
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full border px-4 py-2 rounded "
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price (USD)</label>
          <input
            {...register('price', {
              required: 'Price is required',
              min: { value: 1, message: 'Minimum price is $1' },
            })}
            type="number"
            step="0.01"
            placeholder="Price"
            className="w-full border px-4 py-2 rounded"
          />
          {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            {...register('image', { required: 'Image URL is required' })}
            type="text"
            placeholder="Enter image link"
            className="w-full border px-4 py-2 rounded"
          />
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            placeholder="Short description of the class"
            className="w-full border px-4 py-2 rounded h-28 resize-none"
          ></textarea>
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Class
        </button>
      </form>
    </section>
  );
};

export default AddClass;
