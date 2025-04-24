import React, { useEffect, useState } from "react";

interface Customer {
  CustomerId: string;
  fullName: string;
  email: string;
}

const CustomerTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(
          "https://3pqjm40r-3000.inc1.devtunnels.ms/customer"
        );
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        setError("Failed to load customers: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <p className="p-4">Loading customers...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Customer List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 border-b">Customer ID</th>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.CustomerId} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{customer.CustomerId}</td>
                <td className="py-2 px-4 border-b">{customer.fullName}</td>
                <td className="py-2 px-4 border-b">
                  {customer.email || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
