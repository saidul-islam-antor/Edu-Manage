// path: src/pages/Dashboard/Admin/Users.jsx

import {  useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hooks/UseAxoisSecure";
import Loading from "../pages/shared/Loading/Loading";


const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // per page

  const {
    data: userData = { users: [], total: 0 },
    refetch,
    isLoading
  } = useQuery({
    queryKey: ["users", searchText, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?q=${searchText}&page=${currentPage}&limit=${limit}`
      );
      return res.data;
    }
  });

  const { users, total } = userData;
  const totalPages = Math.ceil(total / limit);

  const handleMakeAdmin = async (id) => {
    try {
      await axiosSecure.patch(`/users/admin/${id}`);
      toast.success("User promoted to admin");
      refetch();
    } catch (err) {
      toast.error("Failed to promote user",(err));
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <input
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setCurrentPage(1); // reset to first page on new search
        }}
        placeholder="Search by name or email..."
        className="input input-bordered w-full max-w-xs mb-4"
      />

      {/* Table */}
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="overflow-x-auto bg-base-100 text-base-content">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id}>
                    <td>{(currentPage - 1) * limit + idx + 1}</td>
                    <td>
                      <img
                        src={user.photoURL}
                        alt="user"
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role || "student"}</td>
                    <td>
                      {user.role === "admin" ? (
                        <button className="btn btn-sm btn-disabled">Admin</button>
                      ) : (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleMakeAdmin(user._id)}
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center gap-4 font-bold text-base-500 ">
            <button
              className="btn btn-outline btn-sm bg-base-100"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="font-semibold bg-base-100">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline btn-sm bg-base-100"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
