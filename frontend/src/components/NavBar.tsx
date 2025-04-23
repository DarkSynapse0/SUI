import { Link } from "react-router-dom";
import { useLogin } from "../context/UserContext";

const NavBar = () => {
  const {isLoggedIn, login, logOut} = useLogin();
  // const links = [
  //   { label: "Learn", href: "/learn" },
  //   { label: "Docs", href: "/docs" },
  //   { label: "About", href: "/about" },
  // ];

  return (
    <div className="p-2 w-full flex items-center justify-around">
      <div
        className="p-5 w-full flex items-center justify-between h-full bg-blue-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-200
"
      >
        <Link to="/">
          <div className="logo italic text-white text-2xl font-extrabold ">
            <h1>ZKLogin + Enoki</h1>
          </div>
        </Link>

        {/* <nav className="flex space-x-6">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="text-white hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav> */}

        <div>
          <button
            onClick={isLoggedIn ? logOut : login}
            className="px-4 py-2 bg-transparent text-white rounded border border-white cursor-pointer"
          >
            {isLoggedIn ? "Sign Out" : "Sign in with zkLogin"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
