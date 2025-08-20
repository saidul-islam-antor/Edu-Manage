import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import logo from '../../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-20 text-base-content pt-10 pb-5 px-4 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        {/* Logo & About */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <img src={logo} alt="EduManage Logo" className="w-12 rounded-full" />
            <span className="font-bold text-lg">EduManage</span>
          </div>
          <p className="text-sm mb-2">
            EduManage is your trusted platform for managing and learning new skills. Join us to explore, teach, and grow together!
          </p>
          <div className="flex gap-3 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <FaFacebook size={22} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <FaTwitter size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <FaInstagram size={22} />
            </a>
            <a href="mailto:support@edumanage.com" className="hover:text-primary">
              <FaEnvelope size={22} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/allClasses" className="hover:text-primary">All Classes</a></li>
            <li><a href="/teachForm" className="hover:text-primary">Teach on EduManage</a></li>
            <li><a href="/dashboard" className="hover:text-primary">Dashboard</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1">
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Email: <a href="mailto:support@edumanage.com" className="hover:text-primary">support@edumanage.com</a></p>
          <p className="text-sm">Phone: <a href="tel:+1234567890" className="hover:text-primary">+1 234 567 890</a></p>
          <p className="text-sm">Address: 123 Main Street, City, Country</p>
        </div>
      </div>
      <div className="border-t border-base-300 mt-8 pt-4 text-center text-xs">
        &copy; {new Date().getFullYear()} EduManage. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;