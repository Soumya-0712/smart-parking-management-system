import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

function Payments() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==================================================
  // FETCH LOGGED-IN USER'S PAYMENTS
  // ==================================================

  useEffect(() => {
    async function fetchPayments() {
      try {
        setLoading(true);
        setError("");

        /*
         * We fetch the logged-in user's bookings.
         *
         * The backend already filters bookings using the
         * authenticated user's userId.
         *
         * Each booking contains its payment records.
         */
        const response = await api.get("/bookings", {
          params: {
            page: 1,
            limit: 100,
            sort: "desc",
          },
        });

        console.log("User bookings for payment history:", response.data);

        const bookings = response.data.data?.filteredRecords || [];

        // Extract payments from the user's bookings
        const userPayments = bookings.flatMap((booking) =>
          (booking.payments || []).map((payment) => ({
            ...payment,
            bookingReference: booking.bookingReference,
          })),
        );

        // Sort newest payments first
        userPayments.sort((a, b) => {
          const dateA = new Date(a.paidAt || a.createdAt).getTime();

          const dateB = new Date(b.paidAt || b.createdAt).getTime();

          return dateB - dateA;
        });

        console.log("User payment records:", userPayments);

        setPayments(userPayments);
      } catch (error) {
        console.error("Failed to fetch payment history:", error);

        if (error.response?.status === 401) {
          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Unable to fetch your payment history.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, [navigate]);

  // ==================================================
  // FORMAT DATE
  // ==================================================

  function formatDate(dateString) {
    if (!dateString) {
      return "—";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // ==================================================
  // FORMAT PAYMENT TYPE
  // ==================================================

  function formatPaymentType(type) {
    if (!type) {
      return "Unknown";
    }

    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  }

  // ==================================================
  // FORMAT PAYMENT STATUS
  // ==================================================

  function formatPaymentStatus(status) {
    if (!status) {
      return "Unknown";
    }

    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }

  // ==================================================
  // PAYMENT TYPE STYLE
  // ==================================================

  function getPaymentTypeClass(type) {
    switch (type) {
      case "OVERSTAY":
        return "border-orange-500/30 bg-orange-500/10 text-orange-400";

      case "REFUND":
        return "border-purple-500/30 bg-purple-500/10 text-purple-400";

      default:
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";
    }
  }

  // ==================================================
  // PAYMENT STATUS STYLE
  // ==================================================

  function getPaymentStatusClass(status) {
    switch (status) {
      case "SUCCESS":
        return "border-green-500/30 bg-green-500/10 text-green-400";

      case "FAILED":
        return "border-red-500/30 bg-red-500/10 text-red-400";

      case "REFUNDED":
        return "border-purple-500/30 bg-purple-500/10 text-purple-400";

      case "PENDING":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";

      default:
        return "border-gray-500/30 bg-gray-500/10 text-gray-400";
    }
  }

  // ==================================================
  // MAIN UI
  // ==================================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070B14] px-4 py-10 font-sans text-white sm:px-6 lg:px-8">
      {/* Architectural Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Ambient Glows */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-cyan-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl space-y-8">
        {/* ================================================== */}
        {/* PAGE HEADING */}
        {/* ================================================== */}

        <section>
          <h1 className="text-3xl font-bold text-white">Payments</h1>

          <p className="mt-2 text-gray-400">
            View your parking payment history.
          </p>
        </section>

        {/* ================================================== */}
        {/* PAYMENT HISTORY */}
        {/* ================================================== */}

        <section className="rounded-2xl border border-gray-800/80 bg-[#0a0f1c] p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white">Payment History</h2>

          {/* ================================================== */}
          {/* LOADING */}
          {/* ================================================== */}

          {loading && (
            <div className="mt-6 rounded-xl border border-gray-800 bg-[#070B14] p-10 text-center">
              <p className="font-semibold text-cyan-400">
                Loading your payments...
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Fetching your payment history.
              </p>
            </div>
          )}

          {/* ================================================== */}
          {/* ERROR */}
          {/* ================================================== */}

          {!loading && error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-10 text-center">
              <p className="font-semibold text-red-400">
                Unable to load payments
              </p>

              <p className="mt-2 text-sm text-gray-500">{error}</p>
            </div>
          )}

          {/* ================================================== */}
          {/* EMPTY STATE */}
          {/* ================================================== */}

          {!loading && !error && payments.length === 0 && (
            <div className="mt-6 rounded-xl border border-gray-800 bg-[#070B14] p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gray-800 bg-white/5">
                <span className="text-2xl text-gray-500">₹</span>
              </div>

              <p className="mt-4 text-gray-400">No payment records found.</p>

              <p className="mt-2 text-sm text-gray-600">
                Your payment history will appear here after you make a payment.
              </p>

              <Link
                to="/find-parking"
                className="mt-4 inline-block text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300 hover:underline"
              >
                Find Parking
              </Link>
            </div>
          )}

          {/* ================================================== */}
          {/* PAYMENT TABLE */}
          {/* ================================================== */}

          {!loading && !error && payments.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-200">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-sm text-gray-500">
                    <th className="px-4 py-3 font-medium">Payment ID</th>

                    <th className="px-4 py-3 font-medium">Booking ID</th>

                    <th className="px-4 py-3 font-medium">Date</th>

                    <th className="px-4 py-3 font-medium">Payment Type</th>

                    <th className="px-4 py-3 font-medium">Amount</th>

                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-800/70 transition last:border-b-0 hover:bg-white/2"
                    >
                      {/* Payment ID */}
                      <td className="px-4 py-4 font-medium text-cyan-400">
                        {payment.id}
                      </td>

                      {/* Booking ID */}
                      <td className="px-4 py-4 text-gray-300">
                        {payment.bookingReference || payment.bookingId}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 text-gray-400">
                        {formatDate(payment.paidAt || payment.createdAt)}
                      </td>

                      {/* Payment Type */}
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${getPaymentTypeClass(
                            payment.paymentType,
                          )}`}
                        >
                          {formatPaymentType(payment.paymentType)}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-4 font-medium text-gray-200">
                        ₹{Number(payment.amount || 0).toFixed(2)}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${getPaymentStatusClass(
                            payment.paymentStatus,
                          )}`}
                        >
                          {formatPaymentStatus(payment.paymentStatus)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ================================================== */}
        {/* PAYMENT INFORMATION */}
        {/* ================================================== */}

        <section className="rounded-2xl border border-cyan-500/20 bg-cyan-500/4 p-5 shadow-xl">
          <h2 className="font-semibold text-white">Payment Information</h2>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Overstay payments are associated with the original booking from
            which the additional parking time occurred.
          </p>
        </section>

        {/* ================================================== */}
        {/* BACK */}
        {/* ================================================== */}

        <div>
          <Link
            to="/dashboard"
            className="text-sm text-cyan-400 transition hover:text-cyan-300 hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Payments;
