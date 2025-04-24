import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import React from "react";

interface Order {
  id: string;
  orderItem: {
    product: {
      productName: string;
      imageUrl: string;
    };
    id: string;
    quantity: string;
    price: string | number;
    size: string[];
  }[];
  customer: {
    fullName: string;
  };
  status: string;
  suiDigest: string;
  paymentMethod: string;
  total_amount: string;
  createdAt: string;
}

const getStatusColor = (status: string | undefined) => {
  if (!status) return "text-gray-500";
  return status.toLowerCase() === "completed"
    ? "text-green-500"
    : "text-red-500";
};

const fetchDigestData = async (digest: string) => {
  if (!digest) return;
  const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });

  try {
    const txnData = await suiClient.getTransactionBlock({
      digest,
      options: {
        showEffects: true,
        showInput: true,
        showEvents: true,
        showObjectChanges: true,
      },
    });
    const coinsSpent =
      txnData.effects?.mutated?.filter(
        (item) =>
          typeof item.owner === "object" &&
          item.owner !== null &&
          "AddressOwner" in item.owner
      ) || [];
    console.log("Coins Spent:", coinsSpent);
    console.log(txnData);
  } catch (error) {
    console.error("Error fetching digest data:", error);
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}order`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setOrders(data);
          console.log("Orders:", data);
        } else if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          console.warn("Unexpected API response:", data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="min-h-screen p-6 gradient-background rounded-2xl">
      {/* <h1 className="text-3xl font-extrabold text-black mb-6">Orders</h1> */}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-black backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-950">
              <thead className="bg-gradient-to-r from-deepskyblue to-darkviolet text-white  uppercase text-xs">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Payment Status</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Sui Digest</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr
                        onClick={() => toggleExpandOrder(order.id)}
                        className="cursor-pointer bg-white hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 shadow-sm"
                      >
                        <td className="p-4 font-medium text-gray-800">
                          {order.id}
                        </td>
                        <td className="p-4 text-gray-600">
                          {order.customer.fullName}
                        </td>
                        <td className="p-4 text-gray-800">
                          Rs. {Number(order.total_amount).toFixed(2)}
                        </td>
                        <td
                          className={`${getStatusColor(
                            order.status
                          )} p-4 font-semibold`}
                        >
                          {order.status}
                        </td>
                        <td className="p-4 text-gray-600">
                          {order.paymentMethod || "N/A"}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">
                              {order.suiDigest || "N/A"}
                            </span>
                            {order.suiDigest && (
                              <button
                                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  fetchDigestData(order.suiDigest);
                                }}
                              >
                                Fetch Digest
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">
                          {new Date(order.createdAt).toLocaleString()}
                        </td>
                      </tr>
                      {expandedOrderId === order.id && (
                        <tr>
                          <td colSpan={7} className="p-4 bg-gray-50">
                            <table className="min-w-full text-sm text-left">
                              <thead className="bg-darkviolet text-black uppercase text-xs">
                                <tr>
                                  <th className="p-3">Item ID</th>
                                  <th className="p-3">Product Image</th>
                                  <th className="p-3">Product Name</th>
                                  <th className="p-3">Quantity</th>
                                  <th className="p-3">Price</th>
                                  <th className="p-3">Size</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.orderItem.map((item, index) => (
                                  <tr
                                    key={item.id}
                                    className={`${
                                      index % 2 === 0
                                        ? "bg-white"
                                        : "bg-gray-50"
                                    } hover:bg-blue-50 transition-colors duration-200`}
                                  >
                                    <td className="p-3 text-gray-800">
                                      {item.id}
                                    </td>
                                    <td className="p-3">
                                      <img
                                        src={item.product.imageUrl}
                                        alt={item.product.productName}
                                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                      />
                                    </td>
                                    <td className="p-3 text-gray-800">
                                      {item.product.productName}
                                    </td>
                                    <td className="p-3 text-gray-600">
                                      {item.quantity}
                                    </td>
                                    <td className="p-3 text-gray-800">
                                      Rs. {Number(item.price).toFixed(2)}
                                    </td>
                                    <td className="p-3 text-gray-600">
                                      {Array.isArray(item.size) ? item.size.join(", ") : "N/A"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
