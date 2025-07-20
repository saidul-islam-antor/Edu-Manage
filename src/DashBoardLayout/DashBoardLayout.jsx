import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import {
  FaHome,
  FaPlusCircle,
  FaChalkboardTeacher,
  FaUserCircle,
} from 'react-icons/fa';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r shadow-lg hidden lg:block">
        <div className="p-6">
        <Link to='/'>  <h2 className="text-2xl font-bold mb-8 text-center">EduManage</h2></Link>
          <nav className="space-y-3">
            <NavItem to="/dashboard/" icon={<FaHome />}>Home</NavItem>
            <NavItem to="/dashboard/addClasses" icon={<FaPlusCircle />}>Add Class</NavItem>
            <NavItem to="/dashboard/myClasses" icon={<FaChalkboardTeacher />}>My Class</NavItem>
            <NavItem to="/dashboard/profile" icon={<FaUserCircle />}>Profile</NavItem>
            <NavItem to="/dashboard/my-enroll-class" icon={<FaUserCircle />}>my Enroll Class</NavItem>
            <NavItem to="/dashboard/payment-history" >Payment History</NavItem>
            <NavItem to="/dashboard/teacher-requests" >Teacher Request</NavItem>
            <NavItem to="/dashboard/admin-all-classes" >All Class</NavItem>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-base-200 shadow z-50 flex justify-between items-center px-4 py-3">
        <label htmlFor="drawer-toggle" className="btn btn-sm btn-outline">☰</label>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>

      <input id="drawer-toggle" type="checkbox" className="hidden peer" />
      <div className="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r shadow-lg transform -translate-x-full peer-checked:translate-x-0 transition-transform lg:hidden">
        <div className="p-6 space-y-3">
          <h2 className="text-2xl font-bold text-center">EduManage</h2>
          <NavItem to="/dashboard/" icon={<FaHome />}>Home</NavItem>
          <NavItem to="/dashboard/addClasses" icon={<FaPlusCircle />}>Add Class</NavItem>
          <NavItem to="/dashboard/myClasses" icon={<FaChalkboardTeacher />}>My Class</NavItem>
          <NavItem to="/dashboard/profile" icon={<FaUserCircle />}>Profile</NavItem>
          <NavItem to="/dashboard/my-enroll-class" >my Enroll class</NavItem>
          <NavItem to="/dashboard/payment-history" >Payment History</NavItem>
            <NavItem to="/dashboard/teacher-requests" >Teacher Request</NavItem>
            <NavItem to="/dashboard/admin-all-classes" >All Class</NavItem>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 pt-16 lg:pt-6">
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-blue-100 ${
        isActive ? 'bg-blue-200 text-blue-800 font-semibold' : 'text-gray-700'
      }`
    }
  >
    {icon} {children}
  </NavLink>
);

export default DashboardLayout;
