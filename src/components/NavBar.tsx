import { Link, useLocation } from "react-router-dom";
import { useZKLogin } from "react-sui-zk-login-kit";
import { motion } from "framer-motion";
import "../index.css";


const navLinks = [
  { name: "Dashboard", path: "/" },
  { name: "Products", path: "/product" },
  { name: "Customer", path: "/customer" },
  { name: "Profile", path: "/profile" },
];

const NavBar = () => {
  const { logout } = useZKLogin();
  const location = useLocation();

  return (
    <>
    <nav className=" items-center justify-center">
      <div className="flex bg-white justify-center items-center px-6 py-2 shadow-lg">
        <h1 className="text-2xl font-bold text-black">Admin</h1>
        <div className="w-full flex px-12 items-center justify-center">
          <ul className="flex items-center justify-center space-x-6 py-3">
            {navLinks.map((link) => (
              <motion.li
                key={link.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-black"
                      : "text-gray-500 hover:text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          onClick={() => {
            logout();
            localStorage.removeItem("userAddress");
          }}
        >
          Logout
        </motion.button>
      </div>
    </nav>
    </>
  );
};

export default NavBar;
