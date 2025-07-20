import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/UseAxoisSecure';

const AdminAllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all classes
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['all-classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('admin/classes');
      return res.data;
    },
  });

  // Mutation to update class status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`admin/classes/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-classes'] });
    },
  });

  const handleUpdateStatus = (id, status) => {
    updateStatusMutation.mutate({ id, status });
  };

  if (isLoading) return <p className="text-center text-lg font-medium py-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Manage All Classes</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full table-auto border border-gray-300 bg-white">
          <thead className="bg-blue-50">
            <tr className="text-left text-gray-700">
              <th className="px-6 py-3 border-b font-semibold">Title</th>
              <th className="px-6 py-3 border-b font-semibold">Image</th>
              <th className="px-6 py-3 border-b font-semibold">Email</th>
              <th className="px-6 py-3 border-b font-semibold">Description</th>
              <th className="px-6 py-3 border-b font-semibold">Status</th>
              <th className="px-6 py-3 border-b font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 border-b">{cls.title}</td>
                <td className="px-6 py-4 border-b">
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-16 h-16 object-cover rounded-md shadow"
                  />
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">{cls.email}</td>
                <td className="px-6 py-4 border-b text-sm text-gray-600">
                  {cls.description?.slice(0, 50)}...
                </td>
                <td className="px-6 py-4 border-b capitalize font-semibold text-gray-800">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      cls.status === 'accepted'
                        ? 'bg-green-100 text-green-700'
                        : cls.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {cls.status || 'pending'}
                  </span>
                </td>
                <td className="px-6 py-4 border-b text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => handleUpdateStatus(cls._id, 'accepted')}
                      disabled={cls.status === 'accepted'}
                      className={`px-4 py-1 text-sm rounded-lg font-semibold transition ${
                        cls.status === 'accepted'
                          ? 'bg-green-200 text-green-800 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(cls._id, 'rejected')}
                      disabled={cls.status === 'rejected'}
                      className={`px-4 py-1 text-sm rounded-lg font-semibold transition ${
                        cls.status === 'rejected'
                          ? 'bg-red-200 text-red-800 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      Reject
                    </button>
                    <button
                      disabled={cls.status !== 'accepted'}
                      className={`px-4 py-1 text-sm rounded-lg font-semibold transition ${
                        cls.status === 'accepted'
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Progress
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {classes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No classes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllClasses;
