import { NavLink } from 'react-router';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.jpg';
import { FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log('Logged out');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const navLinks = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/allClasses'>All Class</NavLink></li>
    <li><NavLink to='/teachForm'>Teach on EduManage</NavLink></li>
    {user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>}
  </>;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {navLinks}
          </ul>
        </div>
        <img src={logo} className='w-16' alt="Site Logo" />
        <p className='font-bold ml-2'> EduManage</p>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end relative">
        {
          user ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                <img
                  src={user.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border"
                />
                <FaChevronDown className="text-gray-500 text-sm" />
              </div>

              {openDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg z-20">
                  <div className="px-4 py-2 text-sm font-medium text-gray-800 border-b">
                    {user.displayName || 'User'}
                  </div>
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                    onClick={() => setOpenDropdown(false)}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className="btn">Login</NavLink>
              <NavLink to="/register" className="btn ml-2">Register</NavLink>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
