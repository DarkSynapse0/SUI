import React, { useEffect, useState } from "react";
import { useZKLogin } from "react-sui-zk-login-kit";
import DisplayBalance from "../components/DisplayBalance";

const Profile: React.FC = () => {
  const { address } = useZKLogin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (address) {
      setIsAuthenticated(true);
    }
  }, [address]);

  const storedAddress = localStorage.getItem("userAddress");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-background">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">
          User Profile
        </h1>

        {storedAddress ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <strong className="text-gray-700 font-semibold">
                Wallet Address:
              </strong>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg break-all">
                {storedAddress}
              </p>
            </div>
            <div className="bg-gradient-to-r from-deepskyblue to-darkviolet p-4 rounded-lg shadow-inner">
              <DisplayBalance />
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-center font-medium">
            Not authenticated.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
