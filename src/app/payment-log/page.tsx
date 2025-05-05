"use client";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "@/api/API";

interface PaymentLog {
  id: string;
  payment: string;
  createdAt: string;
  updated: string;
  userInfo: {
    name: string;
  };
}

function PaymentLogs() {
  const [paymentLogs, setPaymentLogs] = useState<PaymentLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPaymentLogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/records/orders`, {
          headers: { api_key: API_KEY },
        });
        setPaymentLogs(res.data.records || []);
      } catch (err) {
        setError("Failed to fetch payment logs");
        console.error("Error fetching payment logs:", err);
      } finally {
        setLoading(false);
      }
    };
    getPaymentLogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 flex items-center justify-center">
        <div className="text-red-500 bg-red-500/10 border border-red-500/50 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }
  console.log(paymentLogs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 p-8 mt-28">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">
          سوابق پرداخت
        </h1>
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800/70">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  نام خریدار
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  شناسه پرداخت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  وضعیت پرداخت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  تاریخ ایجاد
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/30 divide-y divide-gray-700">
              {paymentLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {log.userInfo.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {log.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        log.payment === "paid"
                          ? "bg-green-500/10 text-green-400 border border-green-500/50"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/50"
                      }`}
                    >
                      {log.payment === "paid"
                        ? "پرداخت شده"
                        : "در انتظار پرداخت"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(log.createdAt).toLocaleDateString("fa-IR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PaymentLogs;
