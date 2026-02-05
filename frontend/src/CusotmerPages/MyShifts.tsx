import React, { useState, useMemo, useRef } from "react";
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
  isToday,
  parseISO,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Timer,
  Coffee,
  CheckCircle2,
  Download,
  X,
  FileText,
  MapPin,
  User,
  Clock,
} from "lucide-react";

// --- UPDATED TYPES ---
type ShiftStatus = "Completed" | "Active" | "Upcoming";
type ShiftType = "Day Shift" | "Night Shift";

interface Shift {
  id: string;
  date: string;
  type: ShiftType;
  hours: string;
  status: ShiftStatus;
  location: string; // New Detail
  client: string; // New Detail
  rate: string; // Extra Context
}

const CustomerTimesheet: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));
  const [currentView, setCurrentView] = useState("Calendar");
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);

  // New state to track which shift is selected for the detail panel
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);

  // Expanded mock data
  const [shifts] = useState<Shift[]>([
    {
      id: "1",
      date: "2026-01-05",
      type: "Day Shift",
      hours: "08:00 - 20:00",
      status: "Completed",
      location: "Wing A - St. Marys",
      client: "NHS Trust",
      rate: "£18.50/hr",
    },
    {
      id: "2",
      date: "2026-01-06",
      type: "Day Shift",
      hours: "08:00 - 20:00",
      status: "Active",
      location: "Wing B - General Hall",
      client: "NHS Trust",
      rate: "£18.50/hr",
    },
    {
      id: "3",
      date: "2026-01-07",
      type: "Night Shift",
      hours: "20:00 - 08:00",
      status: "Upcoming",
      location: "Critical Care Unit",
      client: "Bupa Health",
      rate: "£22.00/hr",
    },
    {
      id: "4",
      date: "2026-01-10",
      type: "Day Shift",
      hours: "08:00 - 20:00",
      status: "Upcoming",
      location: "Wing A - St. Marys",
      client: "NHS Trust",
      rate: "£18.50/hr",
    },
  ]);

  const selectedShift = useMemo(
    () => shifts.find((s) => s.id === selectedShiftId),
    [selectedShiftId, shifts]
  );

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Inside your component...
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => {
    // This programmatically triggers the native picker
    dateInputRef.current?.showPicker();
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      {/* --- ADJUSTMENT MODAL --- */}
      {isAdjustmentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-999999 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl animate-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50 rounded-t-[2.5rem]">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">
                  Raise Adjustment
                </h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                  Shift Correction Request
                </p>
              </div>
              <button
                onClick={() => setIsAdjustmentModalOpen(false)}
                className="p-2 hover:bg-white rounded-full transition-all shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Select Shift Date
                </label>

                <input
                  ref={dateInputRef}
                  type="date"
                  onClick={handleInputClick}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Reason for Adjustment
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none"
                  placeholder="e.g., Forgot to clock out..."
                />
              </div>
              <button className="w-full py-4 bg-blue-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            My Attendance & Shifts
          </h1>
          <p className="text-slate-500 text-sm mt-1 text-left">
            Manage your rotation and view specific shift details.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Download Payslip
          </button>
          <button
            onClick={() => setIsAdjustmentModalOpen(true)}
            className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            Raise Adjustment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Calendar/List */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  {["Calendar", "List View"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setCurrentView(v)}
                      className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        currentView === v
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-slate-500"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <div className="h-6 w-[1px] bg-slate-200" />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevMonth}
                    className="p-1 hover:bg-slate-50 rounded-lg"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </button>
                  <span className="text-sm font-bold text-slate-700 min-w-[110px] text-center">
                    {format(currentMonth, "MMMM yyyy")}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-1 hover:bg-slate-50 rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {currentView === "Calendar" ? (
                <div className="grid grid-cols-7 gap-3">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (d) => (
                      <div
                        key={d}
                        className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2"
                      >
                        {d}
                      </div>
                    )
                  )}
                  {calendarDays.map((day, idx) => {
                    const shift = shifts.find((s) =>
                      isSameDay(parseISO(s.date), day)
                    );
                    const isSelected =
                      selectedShift &&
                      isSameDay(parseISO(selectedShift.date), day);

                    return (
                      <div
                        key={idx}
                        onClick={() => shift && setSelectedShiftId(shift.id)}
                        className={`min-h-[100px] p-3 rounded-2xl border transition-all cursor-pointer relative 
                          ${
                            isToday(day)
                              ? "bg-blue-50/50 border-blue-200"
                              : "bg-slate-50/30 border-slate-100"
                          } 
                          ${
                            isSelected
                              ? "ring-2 ring-blue-500 shadow-md border-transparent"
                              : "hover:shadow-md"
                          }
                          ${
                            !isSameMonth(day, currentMonth)
                              ? "opacity-20"
                              : "opacity-100"
                          }`}
                      >
                        <span
                          className={`text-sm font-bold ${
                            isToday(day) ? "text-blue-600" : "text-slate-400"
                          }`}
                        >
                          {format(day, "d")}
                        </span>
                        {shift && (
                          <div
                            className={`mt-2 p-1.5 rounded-lg text-[10px] font-bold flex flex-col shadow-sm ${
                              shift.type === "Day Shift"
                                ? "bg-white border-l-4 border-blue-500 text-blue-700"
                                : "bg-white border-l-4 border-indigo-800 text-indigo-900"
                            }`}
                          >
                            <span className="truncate">{shift.type}</span>
                            <span className="opacity-70 mt-0.5 text-[9px]">
                              {shift.hours}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* --- LIST VIEW --- */
                <div className="space-y-4">
                  {shifts
                    .filter((s) => isSameMonth(parseISO(s.date), currentMonth))
                    .map((s) => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedShiftId(s.id)}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-300 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-white p-3 rounded-xl shadow-sm min-w-[60px] text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                              {format(parseISO(s.date), "EEE")}
                            </p>
                            <p className="text-xl font-black text-slate-800">
                              {format(parseISO(s.date), "dd")}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              {s.type}
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium">
                              {s.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-700">
                            {s.hours}
                          </p>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                              s.status === "Completed"
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {s.status}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Clocking & Fixed Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* --- DYNAMIC SHIFT DETAIL WIDGET --- */}
          {selectedShift && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-lg font-black text-slate-800">
                      Shift Details
                    </h3>
                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        selectedShift.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : selectedShift.status === "Active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {selectedShift.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium text-left">
                    {format(parseISO(selectedShift.date), "EEEE, do MMMM yyyy")}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedShiftId(null)}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Location
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {selectedShift.location}
                    </p>
                  </div>
                </div>

                {/* Client */}
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-50 p-2.5 rounded-xl text-orange-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Client
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {selectedShift.client}
                    </p>
                  </div>
                </div>

                {/* Status Change Selector */}
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="text-left w-full">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Update Status
                    </p>
                    <select
                      value={selectedShift.status}
                     
                      className="mt-1 block w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Earnings */}
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Est. Earnings
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {selectedShift.rate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TODAY'S SHIFT WIDGET (REMAIN SAME) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Today's Shift</h3>
            <p className="text-xs text-slate-400 mb-6">
              {format(new Date(), "EEEE, dd MMM yyyy")}
            </p>
            <div className="text-center mb-6">
              <p className="text-4xl font-black text-slate-800 tracking-tight">
                04:22:15
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Logged Hours
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-50 p-3 rounded-2xl text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                  Clock In
                </p>
                <p className="text-sm font-bold text-slate-700">08:02 AM</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl text-center border-2 border-dashed border-slate-100">
                <p className="text-[10px] font-bold text-slate-300 uppercase mb-1">
                  Clock Out
                </p>
                <p className="text-sm font-bold text-slate-300">-- : --</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full py-4 bg-red-50 text-red-600 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center hover:bg-red-100 transition-all">
                <Timer className="w-4 h-4 mr-2" /> Clock Out
              </button>
              <button className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center hover:bg-slate-100 transition-all">
                <Coffee className="w-4 h-4 mr-2" /> Start Break
              </button>
            </div>
          </div>

          {/* Snapshot & Policy remain... */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-left">
                Earnings Snapshot
              </h3>
              <FileText className="w-4 h-4 text-slate-300" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <div className="text-left">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter text-left">
                    Regular Hours
                  </p>
                  <p className="text-lg font-black text-slate-800">
                    144.5{" "}
                    <span className="text-xs font-medium text-slate-400">
                      hrs
                    </span>
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 bg-white/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
            <div className="flex items-center justify-between mb-6">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full hover:bg-white/10">
                View Policy
              </button>
            </div>
            <h4 className="font-bold text-lg leading-tight text-left">
              Next Roster Release
            </h4>
            <p className="text-indigo-200 text-xs mt-2 leading-relaxed opacity-80 text-left">
              The roster for Feb 2026 will be released on Jan 15. Ensure
              availability is updated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTimesheet;
