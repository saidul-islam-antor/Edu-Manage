import React from "react";
import useMyProfile from "../hooks/UseMyProfile";
import Loading from "../pages/shared/Loading/Loading";



const MyProfile = () => {
  const { profile, isLoading } = useMyProfile();

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  const { displayName, email, role, photoURL, phone } = profile;
  console.log(profile)

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-300">
      <div className="flex flex-col items-center text-center">
        <img
          src={photoURL}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-blue-400 object-cover"
        />
        <h2 className="text-2xl font-semibold mt-4">{displayName}</h2>
        <p className="text-gray-500 text-sm">{email}</p>
        <p className="mt-1 text-sm bg-blue-100 px-3 py-1 rounded-full text-blue-800 font-medium">
          {role?.toUpperCase()}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {role === "admin" && (
          <div className="text-left">
            <p>🛡️ <strong>Admin Dashboard Access Enabled</strong></p>
            <p>Can manage users, approve classes, and view analytics.</p>
          </div>
        )}

        {role === "teacher" && (
          <div className="text-left">
            <p>📚 <strong>Teacher Privileges:</strong></p>
            <ul className="list-disc ml-5 text-gray-700">
              <li>Manage your classes</li>
              <li>View student submissions</li>
              <li>Create assignments</li>
            </ul>
          </div>
        )}

        {role === "student" && (
          <div className="text-left">
            <p>🎓 <strong>Student Info:</strong></p>
            <ul className="list-disc ml-5 text-gray-700">
              <li>View enrolled classes</li>
              <li>Submit assignments</li>
              <li>Leave feedback</li>
            </ul>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200 text-gray-700">
          <p><strong>📞 Phone:</strong> {phone || "Not Provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
