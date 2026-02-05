import { useState, useMemo } from "react";
import {
  Plus,
  FileText,
  CalendarCheck,
  Palmtree,
  Stethoscope,
  MoreVertical,
  Hourglass,
} from "lucide-react";
import { format, differenceInDays, parseISO } from "date-fns";

const CustomerRequestLeave = () => {
  type LeaveType = "Annual Leave" | "Sick Leave" | "Personal Leave";
  // --- INITIAL DATA & BALANCES ---
  const initialBalances: Record<LeaveType, any> = {
    "Annual Leave": {
      total: 28,
      used: 12,
      icon: Palmtree,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    "Sick Leave": {
      total: 10,
      used: 2,
      icon: Stethoscope,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    "Personal Leave": {
      total: 8,
      used: 3,
      icon: CalendarCheck,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  };

  const [leaveHistory, setLeaveHistory] = useState([
    {
      id: 1,
      type: "Annual Leave",
      dates: "Jan 15 - Jan 18",
      days: 4,
      status: "Approved",
      appliedOn: "Jan 02, 2026",
      reason: "Family vacation",
    },
    {
      id: 2,
      type: "Sick Leave",
      dates: "Dec 20 - Dec 21",
      days: 2,
      status: "Completed",
      appliedOn: "Dec 20, 2025",
      reason: "Seasonal flu",
    },
    {
      id: 3,
      type: "Personal Leave",
      dates: "Feb 05 - Feb 05",
      days: 1,
      status: "Pending",
      appliedOn: "Today",
      reason: "Home maintenance",
    },
  ]);

  const [formData, setFormData] = useState({
    leaveType: "Annual Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  // --- DYNAMIC CALCULATIONS ---
  // This hook recalculates your summary cards whenever leaveHistory changes
  const dynamicBalances = useMemo(() => {
    // Cast keys to LeaveType so indexing works
    return (Object.keys(initialBalances) as LeaveType[]).map((type) => {
      const config = initialBalances[type]; // No more TS error here!

      const pendingDays = leaveHistory
        .filter((l) => l.type === type && l.status === "Pending")
        .reduce((acc, curr) => acc + curr.days, 0);

      const approvedDays = leaveHistory
        .filter(
          (l) =>
            l.type === type &&
            (l.status === "Approved" || l.status === "Completed")
        )
        .reduce((acc, curr) => acc + curr.days, 0);

      const available =
        config.total - (config.used + approvedDays + pendingDays);

      return {
        title: type,
        ...config,
        available: Math.max(0, available),
        pending: pendingDays,
        used: config.used + approvedDays,
      };
    });
  }, [leaveHistory]);

  // --- HANDLERS ---
  const handleApplyLeave = (e: any) => {
    e.preventDefault();
    if (!formData.fromDate || !formData.toDate || !formData.reason) {
      alert("Please fill in all fields, including the reason.");
      return;
    }

    const start = parseISO(formData.fromDate);
    const end = parseISO(formData.toDate);
    const dayCount = differenceInDays(end, start) + 1;

    if (dayCount <= 0) {
      alert("End date must be after start date");
      return;
    }

    const newLeave = {
      id: Date.now(),
      type: formData.leaveType,
      dates: `${format(start, "MMM dd")} - ${format(end, "MMM dd")}`,
      days: dayCount,
      status: "Pending",
      appliedOn: "Today",
      reason: formData.reason,
    };

    setLeaveHistory([newLeave, ...leaveHistory]);
    setFormData({
      leaveType: "Annual Leave",
      fromDate: "",
      toDate: "",
      reason: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      {/* Header */}
      <div className="mb-8 text-left">
        <h1 className="text-2xl font-bold text-slate-800">Leave Management</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your time off and monitor live balances.
        </p>
      </div>

      {/* DYNAMIC SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {dynamicBalances.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm group transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${item.bg} ${item.color} p-3 rounded-2xl`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full flex items-center mb-1">
                  <Hourglass className="w-2.5 h-2.5 mr-1" /> {item.pending}{" "}
                  Pending
                </span>
              </div>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left">
              {item.title}
            </p>
            <div className="flex items-baseline space-x-2 mt-1">
              <p className="text-2xl font-black text-slate-800">
                {item.available}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                Days Available
              </p>
            </div>

            <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-tighter mb-1">
              <span className="text-slate-400">Used: {item.used}d</span>
              <span className="text-slate-400">Total: {item.total}d</span>
            </div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color.replace("text", "bg")}`}
                style={{
                  width: `${((item.used + item.pending) / item.total) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* FORM */}
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-blue-600" /> Request Time Off
            </h2>
            <form className="space-y-5" onSubmit={handleApplyLeave}>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block text-left">
                  Leave Type
                </label>
                <select
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold outline-none"
                  value={formData.leaveType}
                  onChange={(e) =>
                    setFormData({ ...formData, leaveType: e.target.value })
                  }
                >
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block text-left">
                    From
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none cursor-pointer"
                    value={formData.fromDate}
                    onChange={(e) =>
                      setFormData({ ...formData, fromDate: e.target.value })
                    }
                    // This line forces the calendar to open on click
                    onClick={(e) =>
                      (e.currentTarget as HTMLInputElement).showPicker()
                    }
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block text-left">
                    To
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none cursor-pointer"
                    value={formData.toDate}
                    onChange={(e) =>
                      setFormData({ ...formData, toDate: e.target.value })
                    }
                    // This line forces the calendar to open on click
                    onClick={(e) =>
                      (e.currentTarget as HTMLInputElement).showPicker()
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block text-left">
                  Reason for Leave
                </label>
                <textarea
                  placeholder="Provide a brief explanation..."
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none min-h-[100px]"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>

        {/* TABLE */}
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-slate-800">My Leave History</h2>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold uppercase tracking-tight">
                {leaveHistory.length} Records
              </span>
            </div>

            <div className="overflow-x-auto flex-grow">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Type & Reason
                    </th>
                    <th className="px-6 py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {leaveHistory.map((leave) => (
                    <tr
                      key={leave.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${
                              leave.type === "Sick Leave"
                                ? "bg-red-50 text-red-500"
                                : "bg-blue-50 text-blue-500"
                            }`}
                          >
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="text-left max-w-[200px]">
                            <p className="text-sm font-bold text-slate-700 truncate">
                              {leave.type}
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium italic truncate">
                              "{leave.reason}"
                            </p>
                            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter mt-0.5">
                              {leave.dates}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-slate-700">
                          {leave.days} Days
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center text-[11px] font-bold px-3 py-1 rounded-full ${
                            leave.status === "Approved" ||
                            leave.status === "Completed"
                              ? "text-green-600 bg-green-50"
                              : leave.status === "Pending"
                              ? "text-orange-600 bg-orange-50"
                              : "text-slate-500 bg-slate-50"
                          }`}
                        >
                          {leave.status === "Pending" && (
                            <Hourglass className="w-3 h-3 mr-1.5" />
                          )}
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-300 hover:text-slate-600">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRequestLeave;
