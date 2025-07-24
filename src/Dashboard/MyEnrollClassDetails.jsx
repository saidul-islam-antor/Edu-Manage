import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState, useContext } from "react";
import useAxiosSecure from "../hooks/UseAxoisSecure";
import { AuthContext } from "../context/AuthContext";
import ReactStars from "react-rating-stars-component";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [ratingValue, setRatingValue] = useState(0);

  const { data: assignments = [], refetch, isLoading } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments?classId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const onSubmit = async (formData, assignmentId) => {
    try {
      const submissionText = formData[`submission-${assignmentId}`];
      const res = await axiosSecure.post("/assignment-submit", {
        assignmentId,
        studentEmail: user?.email,
        submissionText,
        

      });

      if (res.data.success) {
        await axiosSecure.patch(`/assignments/increment/${assignmentId}`);
        Swal.fire("✅ Submitted", res.data.message, "success");
        reset();
        refetch();
      }
    } catch (error) {
      Swal.fire("❌ Error", error?.response?.data?.message || "Submission failed", "error");
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const description = e.target.description.value;
    try {
      const res = await axiosSecure.post("/feedback", {
        classId: id,
        email: user?.email,
        name:user?.displayName,
        photo:user?.photoURL,
        
        description,
        rating: ratingValue,
      });

      if (res.data.insertedId) {
        Swal.fire("✅ Feedback Sent", "Thank you for your feedback!", "success");
        e.target.reset();
        setRatingValue(0);
        setOpenModal(false);
      }
    } catch (err) {
      Swal.fire("❌ Error", "Feedback failed to submit", "error");
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading assignments...</div>;

  return (
    <div className="p-6">
      {/* Feedback Button under Navbar */}
      <div className="mb-6 text-end">
        <button onClick={() => setOpenModal(true)} className="btn btn-info btn-sm rounded-full">
          Teaching Evaluation Report (TER)
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-primary">Assignments for This Class</h2>

      {assignments.length === 0 && (
        <p className="text-center text-gray-500">No assignments found.</p>
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Submission</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment._id}>
                <td>{index + 1}</td>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{new Date(assignment.deadline).toLocaleDateString()}</td>
                <td>
                  <textarea
                    placeholder="Your submission"
                    {...register(`submission-${assignment._id}`, { required: true })}
                    className="textarea textarea-bordered textarea-sm w-56"
                  />
                </td>
                <td>
                  <button
                    onClick={handleSubmit((data) => onSubmit(data, assignment._id))}
                    className="btn btn-success btn-sm rounded-full"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleFeedbackSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
          >
            <h3 className="text-xl font-semibold mb-2">Teaching Evaluation Report</h3>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              placeholder="Write your feedback"
              required
            ></textarea>

            <div className="flex items-center gap-2">
              <span className="font-medium">Your Rating:</span>
              <ReactStars
                count={5}
                onChange={(newRating) => setRatingValue(newRating)}
                size={28}
                activeColor="#ffd700"
                value={ratingValue}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setOpenModal(false)} className="btn btn-sm">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
