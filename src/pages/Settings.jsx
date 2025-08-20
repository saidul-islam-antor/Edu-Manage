import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";


const Settings = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notif, setNotif] = useState(true);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Dummy handlers for demo
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setMessage("Profile updated ");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMessage("Password changed ");
  };

  return (
    <div className="max-w-xl mt-20 mx-auto bg-base-100 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      {message && (
        <div className="alert alert-success mb-4 py-2 px-4">{message}</div>
      )}

      {/* Profile Update */}
      <form onSubmit={handleProfileUpdate} className="mb-6">
        <h3 className="font-semibold mb-2">Profile Info</h3>
        <div className="flex items-center gap-4 mb-3">
          <img src={user?.photoURL} alt="Profile" className="w-16 h-16 rounded-full" />
          {/* You can add a photo upload button here */}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="input input-bordered w-full"
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            className="input input-bordered w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Your email"
            disabled
          />
        </div>
        <button className="btn btn-primary mt-2" type="submit">Update Profile</button>
      </form>

      {/* Password Change */}
      <form onSubmit={handlePasswordChange} className="mb-6">
        <h3 className="font-semibold mb-2">Change Password</h3>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            className="input input-bordered w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="New password"
          />
        </div>
        <button className="btn btn-secondary mt-2" type="submit">Change Password</button>
      </form>

      {/* Notification Preferences */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Notifications</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={notif}
            onChange={() => setNotif(!notif)}
          />
          <span>Enable email notifications</span>
        </label>
      </div>

      {/* Theme Toggle */}
      <div className="mb-2">
        <label className="block font-semibold mb-1">Theme</label>
        <button
          className="btn"
          onClick={() => {
            const html = document.documentElement;
            if (html.getAttribute('data-theme') === 'dark') {
              html.setAttribute('data-theme', 'light');
              localStorage.setItem('theme', 'light');
            } else {
              html.setAttribute('data-theme', 'dark');
              localStorage.setItem('theme', 'dark');
            }
          }}
        >
          Toggle Light/Dark Mode
        </button>
      </div>
    </div>
  );
};

export default Settings;