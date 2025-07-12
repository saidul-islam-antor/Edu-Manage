import { NavLink } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
  const { user ,logOut} = useContext(AuthContext);
  const handleLogOut=()=>{
logOut()
.then(result=>{
  console.log(result)
})
.then(error=>{
  console.log(error)
})
  
  }

  const navLinks = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/allClasses'>All Class</NavLink></li>
    <li><NavLink to='/coverage'>Coverage</NavLink></li>
    {user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>}
  </>;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {navLinks}
          </ul>
        </div>
        <img src={logo} className='w-16' alt="Site Logo" />
        <p className='font-bold ml-2'>Tech on Education</p>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
        {
          user ?
            <>
             <button onClick={handleLogOut} className='btn'>Logout</button>
            </>
            :
            <>
              <NavLink to="/login" className="btn">Login</NavLink>
              <NavLink to="/register" className="btn ml-2">Register</NavLink>
            </>
        }
      </div>
    </div>
  );
};

export default Navbar;
