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
  
const activeClass = ({ isActive }) =>
    isActive
      ? "hover:text-blue-600 font-semibold "
      : "";

  const navLinks = <>
    <li><NavLink to='/' className={activeClass}>Home</NavLink></li>
    <li><NavLink to='/allClasses'className={activeClass}>All Class</NavLink></li>
    <li><NavLink to='/teachForm'className={activeClass}>Teach on EduManage</NavLink></li>
    {user &&
     <>
     <li><NavLink to='/dashboard'className={activeClass}>Dashboard</NavLink></li>
     <li><NavLink to='/settings'className={activeClass}>Settings</NavLink></li>
     
     </>
    
     }
    
 
  </>;
  
  

  return (
    <div className="navbar w-full fixed top-0 left-0 z-50 px-4 lg:px-20 text-base-content shadow-md bg-base-100 ">
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
       
        <img src={logo} className='w-16 rounded-full' alt="Site Logo" />
        <p className='font-bold ml-2'> EduManage</p>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">
          {navLinks}
        </ul>
       
      </div>

      <div className="navbar-end relative">
     
<div className="">
  <label className="swap swap-rotate mr-2">
    <input
      type="checkbox"
      onChange={() => {
        const html = document.documentElement;
        if (html.getAttribute('data-theme') === 'dark') {
          html.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
        } else {
          html.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        }
      }}
      checked={document.documentElement.getAttribute('data-theme') === 'dark'}
      readOnly
    />
    {/* sun icon */}
    <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M5.64 17.657l-1.414 1.414-1.414-1.414 1.414-1.414zm12.02 0l1.414 1.414-1.414 1.414-1.414-1.414zm1.414-12.02l1.414 1.414-1.414 1.414-1.414-1.414zm-12.02 0l-1.414-1.414 1.414-1.414 1.414 1.414zm6.364-2.121V1h-2v2.121zm0 18.364V23h-2v-2.121zm7.778-7.778h2.121v2h-2.121zm-18.364 0H1v2h2.121zm9.192-4.95a5 5 0 1 1 0 7.07 5 5 0 0 1 0-7.07z"/>
    </svg>
    {/* moon icon */}
    <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M21.64 13.64a9 9 0 1 1-11.31-11.31 1 1 0 0 1 1.05.24 1 1 0 0 1 .24 1.05A7 7 0 1 0 20.35 12.35a1 1 0 0 1 1.29-1.29z"/>
    </svg>
  </label>
  {/* ...rest of your navbar-end code... */}
</div>

       
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
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-base-200 shadow-lg border rounded-lg z-20">
                  <div className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 border-b">
                    {user.displayName || 'User'}
                  </div>
                  <NavLink
                    to="/dashboard"
                    className=" block px-4 py-2 hover:bg-gray-100 dark:hover:bg-base-300 text-sm text-gray-700 dark:text-gray-200"
                    onClick={() => setOpenDropdown(false)}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-base-300 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Mobile: Only Login */}
              <NavLink to="/login" className="btn inline-flex lg:hidden">Login</NavLink>
              {/* Desktop: Login and Register */}
              <NavLink to="/login" className="btn hidden lg:inline-flex">Login</NavLink>
              <NavLink to="/register" className="btn ml-2 hidden lg:inline-flex">Register</NavLink>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
