import React, { useEffect, useState } from "react";
import { getBalance } from "./getBalance"; // Adjust path if needed
import { useZKLogin } from "react-sui-zk-login-kit";

const DisplayBalance: React.FC = () => {
  const { address } = useZKLogin();
  const storedAddress = localStorage.getItem("userAddress");
  const isAuthenticated = !!storedAddress;

  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address || !isAuthenticated) return;

      setLoading(true);
      try {
        const bal = await getBalance(address);
        setBalance(bal);
      } catch (err) {
        setError("Failed to fetch balance:" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [address, isAuthenticated]);

  if (!isAuthenticated) return <p>Please login to see your balance.</p>;
  if (loading) return <p>Loading balance...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 rounded bg-gray-100 shadow">
      <h3 className="font-semibold text-lg">Your SUI Balance</h3>
      <p className="text-xl">
        {balance !== null ? balance / 1e9 + " SUI" : "0 SUI"}
      </p>
    </div>
  );
};

export default DisplayBalance;
