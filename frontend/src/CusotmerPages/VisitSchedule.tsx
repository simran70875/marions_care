import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  User,
  MapPin,
  Calendar as CalendarIcon,
  Search,
  X,
  Clock,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  startOfDay,
} from "date-fns";

const TIME_SLOTS = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
];

interface visit {
  id: number;
  resident: string;
  visitor: string;
  time: string;
  date: Date;
  type: string;
  status: string;
  location: string;
  remarks?: string;
}

const CustomerVisitSchedule = () => {
  // --- State ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("Month"); // Month, Week, Day
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visits, setVisits] = useState<visit[]>([
    {
      id: 1,
      resident: "Arthur Morgan",
      visitor: "Mary Linton",
      time: "10:00 AM - 11:00 AM",
      date: new Date(2026, 0, 6),
      type: "In-Person",
      status: "Approved",
      location: "Garden Room",
    },
    {
      id: 2,
      resident: "John Marston",
      visitor: "Abigail Marston",
      time: "09:00 AM - 10:00 AM",
      date: new Date(2026, 0, 6),
      type: "In-Person",
      status: "Pending",
      location: "Lounge A",
    },
    {
      id: 3,
      resident: "Dutch van der Linde",
      visitor: "Hosea Matthews",
      time: "01:00 PM - 02:00 PM",
      date: new Date(2026, 0, 7),
      type: "Video Call",
      status: "Approved",
      location: "Virtual Room 1",
    },
    {
      id: 4,
      resident: "Sadie Adler",
      visitor: "Jake Adler",
      time: "03:00 PM - 04:00 PM",
      date: new Date(2026, 0, 8),
      type: "In-Person",
      status: "Completed",
      location: "Dining Hall",
      remarks: "all is okay , just need to check BP again",
    },
    {
      id: 5,
      resident: "Charles Smith",
      visitor: "Eagle Flies",
      time: "11:00 AM - 12:00 PM",
      date: new Date(2026, 0, 9),
      type: "In-Person",
      status: "Approved",
      location: "Library",
    },
    {
      id: 6,
      resident: "Arthur Morgan", // Testing multiple visits for one resident
      visitor: "Jack Marston",
      time: "02:00 PM - 03:00 PM",
      date: new Date(2026, 0, 12),
      type: "In-Person",
      status: "Pending",
      location: "Garden Room",
    },
    {
      id: 7,
      resident: "Lenny Summers",
      visitor: "Jenny Summers",
      time: "09:00 AM - 10:00 AM",
      date: new Date(2026, 0, 13),
      type: "Video Call",
      status: "Approved",
      location: "Virtual Room 2",
    },
    {
      id: 8,
      resident: "Bill Williamson",
      visitor: "Phil the Crab",
      time: "04:00 PM - 05:00 PM",
      date: new Date(2026, 0, 14),
      type: "In-Person",
      status: "Pending",
      location: "Lounge B",
    },
  ]);

  // --- New Visit Form State ---
  const [newVisit, setNewVisit] = useState({
    resident: "",
    visitor: "",
    time: TIME_SLOTS[0],
    type: "In-Person",
    location: "",
    remarks: "",
  });

  // --- Navigation Logic ---
  const handlePrev = () => {
    if (view === "Month") setCurrentDate(subMonths(currentDate, 1));
    else if (view === "Week") setCurrentDate(subWeeks(currentDate, 1));
    else setCurrentDate(subDays(currentDate, 1));
  };

  const handleNext = () => {
    if (view === "Month") setCurrentDate(addMonths(currentDate, 1));
    else if (view === "Week") setCurrentDate(addWeeks(currentDate, 7));
    else setCurrentDate(addDays(currentDate, 1));
  };

  // --- Grid Calculation ---
  const gridDays = useMemo(() => {
    if (view === "Month") {
      const start = startOfWeek(startOfMonth(currentDate));
      const end = endOfWeek(endOfMonth(currentDate));
      return eachDayOfInterval({ start, end });
    } else if (view === "Week") {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      return eachDayOfInterval({ start, end });
    } else {
      return [startOfDay(currentDate)];
    }
  }, [currentDate, view]);

  // --- Search & Filter Logic ---
  // This filters both the Calendar highlights and the Sidebar list
  const filteredVisits = useMemo(() => {
    return visits.filter((v) => {
      const matchesSearch =
        v.resident.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.visitor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [visits, searchQuery]);

  const sidebarVisits = filteredVisits.filter((v) =>
    isSameDay(v.date, currentDate)
  );

  const addVisitAction = (e: any) => {
    e.preventDefault();
    const visit = {
      ...newVisit,
      id: Date.now(),
      date: currentDate,
      status: "Pending",
    };
    setVisits([...visits, visit]);
    setIsModalOpen(false);
  };

  // --- Status Change Logic ---
  const handleStatusChange = (visitId: any, newStatus: any) => {
    setVisits((prevVisits) =>
      prevVisits.map((v) =>
        v.id === visitId ? { ...v, status: newStatus } : v
      )
    );
  };

  // 1. Add handleRemarksUpdate function to your component logic
  const handleRemarksUpdate = (visitId: any) => {
    const remark = prompt("Enter customer remarks for this completed visit:");
    if (remark !== null) {
      setVisits((prev) =>
        prev.map((v) => (v.id === visitId ? { ...v, remarks: remark } : v))
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Visit Schedule</h1>
          <p className="text-slate-500 text-sm mt-1">
            Search or book visits for residents.
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search resident or visitor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-72 shadow-sm"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <Plus className="w-4 h-4 mr-2" /> Book Visit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left: Calendar View */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-bold text-slate-800 min-w-[180px]">
                  {view === "Day"
                    ? format(currentDate, "MMM dd, yyyy")
                    : format(currentDate, "MMMM yyyy")}
                </h2>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={handlePrev}
                    className="p-1 hover:bg-white rounded-md transition-all text-slate-500"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1 hover:bg-white rounded-md transition-all text-slate-500"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex bg-slate-50 p-1 rounded-xl">
                {["Month", "Week", "Day"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      view === v
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4">
              <div
                className={`grid ${
                  view === "Day" ? "grid-cols-1" : "grid-cols-7"
                } mb-2`}
              >
                {view !== "Day" &&
                  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest"
                      >
                        {day}
                      </div>
                    )
                  )}
              </div>

              <div
                className={`grid ${
                  view === "Day" ? "grid-cols-1" : "grid-cols-7"
                } gap-px bg-slate-100 border border-slate-100 rounded-lg overflow-hidden`}
              >
                {gridDays.map((day, idx) => {
                  const dayVisits = filteredVisits.filter((v) =>
                    isSameDay(v.date, day)
                  );
                  const isCurrentMonth = isSameMonth(day, currentDate);

                  return (
                    <div
                      key={idx}
                      onClick={() => setCurrentDate(day)}
                      className={`min-h-[120px] bg-white p-3 transition-colors hover:bg-slate-50 cursor-pointer relative 
                ${!isCurrentMonth && view === "Month" ? "opacity-30" : ""}
                ${isSameDay(day, currentDate) ? "bg-blue-50/40" : ""}
              `}
                    >
                      <div className="flex justify-between items-start">
                        <span
                          className={`text-sm font-bold ${
                            isSameDay(day, currentDate)
                              ? "text-blue-600 px-2 py-0.5 bg-blue-100 rounded-md"
                              : "text-slate-700"
                          }`}
                        >
                          {format(day, "d")}
                        </span>
                        {view === "Week" && (
                          <span className="text-[10px] text-slate-400 font-medium">
                            {format(day, "EEE")}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 space-y-1">
                        {dayVisits.map((v) => {
                          const statusColors: { [key: string]: string } = {
                            Approved: "bg-blue-500 shadow-blue-100",
                            Pending: "bg-yellow-600 shadow-yellow-600",
                            Completed: "bg-slate-400 shadow-slate-100",
                          };
                          return (
                            <div
                              key={v.id}
                              className={`text-[10px] text-white p-1.5 rounded-lg font-bold shadow-sm truncate border-l-2 border-black/10 ${
                                statusColors[v.status] || "bg-blue-600"
                              }`}
                            >
                              {v.time.split(" - ")[0]} - {v.resident}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sidebar Agenda */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
            {/* Agenda Header */}
            <div className="p-5 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800">Agenda</h3>
                <p className="text-xs text-slate-400">
                  {format(currentDate, "eeee, MMMM dd")}
                </p>
              </div>
              <CalendarIcon className="w-5 h-5 text-blue-500" />
            </div>

            {/* Scrollable Agenda List */}
            <div className="p-5 space-y-4 flex-grow overflow-y-auto max-h-[500px]">
              {sidebarVisits.length > 0 ? (
                sidebarVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="p-4 border border-slate-100 rounded-2xl hover:border-blue-200 transition-all bg-slate-50/30"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                        {visit.time}
                      </span>
                      <select
                        value={visit.status}
                        onChange={(e) =>
                          handleStatusChange(visit.id, e.target.value)
                        }
                        className={`text-[10px] font-bold px-2 py-1 rounded-md border-none cursor-pointer focus:ring-0 ${
                          visit.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : visit.status === "Completed"
                            ? "bg-slate-200 text-slate-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <h4 className="text-sm font-bold text-slate-800 mb-1">
                      {visit.resident}
                    </h4>

                    <div className="flex items-center text-xs text-slate-500 space-x-3 mb-3">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" /> {visit.visitor}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />{" "}
                        {visit.location || "N/A"}
                      </span>
                    </div>

                    {/* REMARKS SECTION */}
                    {visit.status === "Completed" && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        {visit.remarks ? (
                          <div className="bg-blue-50/50 p-2 rounded-lg">
                            <p className="text-[11px] font-bold text-blue-600 uppercase mb-1 flex justify-between">
                              Customer Remarks
                              <button
                                onClick={() => handleRemarksUpdate(visit.id)}
                                className="text-[10px] underline normal-case font-normal"
                              >
                                Edit
                              </button>
                            </p>
                            <p className="text-xs text-slate-600 italic">
                              "{visit.remarks}"
                            </p>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRemarksUpdate(visit.id)}
                            className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:border-blue-200 hover:text-blue-500 transition-all flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3 mr-1" /> Add Remarks
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-400">No visits found</p>
                </div>
              )}
            </div>

            {/* SUMMARY SECTION AT BOTTOM */}
            <div className="p-5 border-t border-slate-50 bg-slate-50/20 rounded-b-2xl">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Daily Summary
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-lg font-bold text-slate-800">
                    {sidebarVisits.length}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    Total
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-lg font-bold text-green-600">
                    {
                      sidebarVisits.filter((v) => v.status === "Approved")
                        .length
                    }
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    Approved
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {
                      sidebarVisits.filter((v) => v.status === "Completed")
                        .length
                    }
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    Done
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Add Visit Modal with Time Slots --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-999999 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">
                Book Visit for {format(currentDate, "MMM dd")}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={addVisitAction} className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    Resident
                  </label>
                  <input
                    required
                    placeholder="Enter resident name"
                    className="w-full mt-1.5 p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20"
                    onChange={(e) =>
                      setNewVisit({ ...newVisit, resident: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    Visitor
                  </label>
                  <input
                    required
                    placeholder="Enter visitor name"
                    className="w-full mt-1.5 p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20"
                    onChange={(e) =>
                      setNewVisit({ ...newVisit, visitor: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setNewVisit({ ...newVisit, time: slot })}
                      className={`p-2.5 text-[11px] font-bold rounded-xl border transition-all ${
                        newVisit.time === slot
                          ? "bg-blue-600 border-blue-600 text-white shadow-md"
                          : "bg-white border-slate-100 text-slate-600 hover:border-blue-200"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    Type
                  </label>
                  <select
                    className="w-full mt-1.5 p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20"
                    onChange={(e) =>
                      setNewVisit({ ...newVisit, type: e.target.value })
                    }
                  >
                    <option>In-Person</option>
                    <option>Video Call</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    Location / Room
                  </label>
                  <input
                    placeholder="e.g. Room 402"
                    className="w-full mt-1.5 p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20"
                    onChange={(e) =>
                      setNewVisit({ ...newVisit, location: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98]"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerVisitSchedule;
