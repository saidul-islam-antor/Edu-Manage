import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import {
  FaHome,
  FaPlusCircle,
  FaChalkboardTeacher,
  FaUserCircle,
  FaHistory,
  FaClipboardList,
  FaUsers,
  FaBookReader,
} from "react-icons/fa";
import useUserRole from '../hooks/useUserRole';
import Loading from '../pages/shared/Loading/Loading';

const DashboardLayout = () => {
  const { role, roleLoading, error } = useUserRole();

  if (roleLoading) return <Loading></Loading>;
  if (error) return <p className="text-center text-red-500 mt-10">Failed to load role.</p>;

  return (
  
    <div className="flex min-h-screen font-poppins">
     
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r shadow-lg hidden lg:block bg-base-100">
        <div className="p-6">
          <Link to='/'><h2 className="text-2xl font-bold text-primary mb-8 text-center">EduManage</h2></Link>
          <nav className="space-y-2">
            <SidebarNavItems role={role} />
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-base-100 shadow z-50 flex justify-between items-center px-4 py-3 border-b">
        <label htmlFor="drawer-toggle" className="btn btn-sm btn-outline">☰</label>
        <Link to="/"> <h1 className="text-xl text-primary font-bold">Dashboard</h1></Link>
      </div>

      {/* Mobile Drawer Sidebar */}
      <input id="drawer-toggle" type="checkbox" className="hidden peer" />
      <div className="fixed top-0 left-0 z-40 w-64 h-screen bg-base-100 border-r shadow-lg transform -translate-x-full peer-checked:translate-x-0 transition-transform lg:hidden">
        <div className="p-6 space-y-3">
          <Link to='/'><h2 className="text-2xl text-primary font-bold mb-4 text-center">EduManage</h2></Link>
          <SidebarNavItems role={role} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-base-100 p-6 pt-16 lg:pt-6">
        <Outlet />
      </main>
    </div>
  );
};

const SidebarNavItems = ({ role }) => {
  return (
    <>
      {/* Common */}
      <NavItem to="/dashboard" icon={<FaHome />} label="Dashboard Home" />
      

      {/* Student */}
      {role === 'student' && (
        <>
          <NavItem to="/dashboard/my-enroll-class" icon={<FaBookReader />} label="My Enrolled Classes" />
          <NavItem to="/dashboard/payment-history" icon={<FaHistory />} label="Payment History" />
        </>
      )}

      {/* Teacher */}
      {role === 'teacher' && (
        <>
          <NavItem to="/dashboard/addClasses" icon={<FaPlusCircle />} label="Add New Class" />
          <NavItem to="/dashboard/myClasses" icon={<FaChalkboardTeacher />} label="My Classes" />
        </>
      )}

      {/* Admin */}
      {role === 'admin' && (
        <>
          <NavItem to="/dashboard/teacher-requests" icon={<FaClipboardList />} label="Teacher Requests" />
          <NavItem to="/dashboard/admin-all-classes" icon={<FaChalkboardTeacher />} label="All Classes" />
          <NavItem to="/dashboard/users" icon={<FaUsers />} label="Manage Users" />
        </>
      )}

      {/* profile */}
      <NavItem to="/dashboard/profile" icon={<FaUserCircle />} label="My Profile" />
    </>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
      ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-400 hover:bg-gray-100 hover:text-blue-500'}`
    }
  >
    <span className="text-lg">{icon}</span>
    <span className="whitespace-nowrap">{label}</span>
  </NavLink>
);

export default DashboardLayout;
