import { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import {
  Clock,
  Users,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  FileText,
  Heart,
  Info,
  BarChart3,
  PhoneCall,
} from "lucide-react";
import { useApi } from "../hooks/useApi";
import { shiftServices } from "../services/shiftServices";

type ShiftStatus =
  | "Scheduled"
  | "Medication"
  | "Overnight"
  | "NoCarer"
  | "Cancelled"
  | "Recurring";

interface Shift {
  id: string | number;
  time: string;
  staff: string;
  tags: string[];
  status: ShiftStatus;
  date: Date;
  carerId?: string | null;
  remarks?: string;
  isRecurring?: boolean;
}

const ClientDashboard = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));
  const [shifts, setShifts] = useState<Shift[]>([]);

  const { call } = useApi<any>();

  const fetchShifts = async () => {
    const currentDate = new Date();
    const month = format(currentDate, "yyyy-MM");
    const res = await call(shiftServices.getPrivateCustomerShifts(month));

    const mapped: Shift[] = res.data.map((s: any) => ({
      id: s._id,
      date: new Date(s.date),
      time: `${s.startTime} - ${s.endTime}`,
      staff: s.carerId
        ? `${s.carerId.firstName} ${s.carerId.lastName}`
        : "No Carer Entered",
      status: s.status,
      tags: s.tags || [],
      remarks: s.remarks || "",
      isRecurring: !!s.isRecurring,
      carerId: s.carerId?._id || null,
    }));

    setShifts(mapped);
  };

  useEffect(() => {
    fetchShifts();
  }, [currentMonth]);

  // Data from PDF Sources
  const stats = [
    { label: "Total Hours Completed", value: "150,000", icon: Clock }, // [cite: 3, 11]
    { label: "Hours Served", value: "4,800", icon: Heart }, // [cite: 5, 10]
    { label: "Average Calls Requested", value: "42", icon: PhoneCall }, // [cite: 14, 15]
    { label: "Profile Completion", value: "83%", icon: UserCircle }, // [cite: 9]
  ];

  const callDetails = [
    { label: "Completed calls", value: 2000, color: "bg-blue-200" }, // [cite: 29, 79]
    { label: "Client not available", value: 1600, color: "bg-blue-400" }, // [cite: 28, 78]
    { label: "On time calls", value: 1200, color: "bg-blue-600" }, // [cite: 26, 77]
    { label: "Missed calls", value: 800, color: "bg-blue-800" }, // [cite: 25, 76]
  ];

  // Calendar Logic
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  const STATUS_COLORS: Record<ShiftStatus, string> = {
    Scheduled: "bg-blue-100 text-blue-700",
    Medication: "bg-purple-100 text-purple-700",
    Overnight: "bg-indigo-100 text-indigo-700",
    NoCarer: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
    Recurring: "bg-blue-600 text-white",
  };

  return (
    <div className="min-h-screen p-6 font-sans text-slate-900">
      {/* --- HEADER --- */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            Introduce Yourself
          </h1>{" "}
          {/* [cite: 1] */}
          <p className="text-blue-600 font-medium">
            Welcome back to your We Care Dashboard
          </p>{" "}
          {/* [cite: 2] */}
        </div>
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-blue-100 items-center gap-4 px-6">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase">
              Current Month
            </p>
            <p className="text-blue-900 font-bold">
              {format(currentMonth, "MMMM yyyy")}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 hover:bg-blue-50 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 hover:bg-blue-50 rounded-lg"
            >
              <ChevronRight className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* --- TOP METRICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-blue-900 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* --- LEFT SIDE: INSIGHTS & ABOUT --- */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* About Section */}
          <div className="bg-blue-900 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-300" /> About Me
            </h3>
            <div className="space-y-4 text-blue-100 text-sm">
              <p>
                <span className="font-bold text-white">Interests:</span>{" "}
                Reading, Gardening, Classic Cinema
              </p>
              <p>
                <span className="font-bold text-white">Hobbies:</span> Chess,
                Watercolor Painting
              </p>
              <p className="italic bg-blue-800/50 p-3 rounded-xl border border-blue-700">
                "I enjoy quiet mornings in the garden room and value punctual,
                friendly care visits."
              </p>
            </div>
          </div>

          {/* Carer Visit Details Graph */}
          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm">
            <h3 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" /> Carer Visit
              Details {/* [cite: 24] */}
            </h3>
            <div className="space-y-5">
              {callDetails.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-2 text-slate-500">
                    <span>{item.label}</span>
                    <span className="text-blue-700">{item.value}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-1000`}
                      style={{ width: `${(item.value / 2000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Insight & Documents */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-blue-100 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                Carer Gender
              </p>
              <div className="flex justify-center gap-4 items-center">
                <div>
                  <p className="text-lg font-black text-blue-600">55%</p>{" "}
                  {/* [cite: 35] */}
                  <p className="text-[10px] text-slate-400">Male</p>
                </div>
                <div className="w-px h-8 bg-slate-100"></div>
                <div>
                  <p className="text-lg font-black text-pink-500">45%</p>{" "}
                  {/* [cite: 36] */}
                  <p className="text-[10px] text-slate-400">Female</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-blue-100 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors">
              <FileText className="w-6 h-6 text-blue-600 mb-1" />
              <p className="text-xs font-bold text-blue-900">Documents</p>{" "}
              {/* [cite: 84] */}
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: CALENDAR & VISITS --- */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Calendar View */}
          <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm">
            <div className="grid grid-cols-7 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div
                  key={d}
                  className="text-center text-xs font-bold text-slate-400 uppercase"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
              {days.map((day, i) => {
                const dayVisits = shifts.filter((v) => isSameDay(v.date, day));
                const isHoliday = day.getMonth() === 11 && day.getDate() === 25; // Dec 25th mock holiday [cite: 14, 116]

                return (
                  <div
                    key={i}
                    className={`min-h-[100px] p-2 bg-white ${!isSameMonth(day, currentMonth) ? "bg-slate-50 opacity-40" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`text-sm font-bold ${isSameDay(day, new Date()) ? "bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full" : "text-slate-400"}`}
                      >
                        {format(day, "d")}
                      </span>
                      {isHoliday && (
                        <span className="text-[8px] font-bold text-red-500 uppercase">
                          Holiday
                        </span>
                      )}
                    </div>
                    <div className="mt-2 space-y-1">
                      {dayVisits.slice(0, 2).map((s) => (
                        <div
                          key={s.id}
                          className={`rounded-md p-1.5 text-[9px] leading-tight border 
        ${STATUS_COLORS[s.status]}`}
                          title={`${s.staff} | ${s.time}`}
                        >
                          {/* Time */}
                          <div className="font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {s.time}
                          </div>

                          {/* Carer */}
                          <div className="truncate">👤 {s.staff}</div>

                          {/* Tags */}
                          {s.tags.length > 0 && (
                            <div className="truncate opacity-80">
                              🏷 {s.tags.join(", ")}
                            </div>
                          )}

                          {/* Recurring badge */}
                          {s.isRecurring && (
                            <div className="mt-0.5 inline-block px-1 rounded bg-blue-600 text-white text-[8px] font-bold">
                              Recurring
                            </div>
                          )}
                        </div>
                      ))}

                      {dayVisits.length > 2 && (
                        <p className="text-[9px] text-slate-400 font-bold">
                          +{dayVisits.length - 2} more
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Schedule List */}
          <div className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-blue-50 flex justify-between items-center bg-blue-50/30">
              <h3 className="font-bold text-blue-900 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" /> Visit Schedule{" "}
                {/* [cite: 37] */}
              </h3>
              <span className="text-xs font-bold text-blue-600 bg-white px-3 py-1 rounded-full border border-blue-100">
                {shifts.length} Upcoming
              </span>
            </div>
            <div className="max-h-[400px] overflow-y-auto divide-y divide-blue-50">
              <div className="max-h-[400px] overflow-y-auto divide-y divide-blue-50">
                {shifts.map((visit) => (
                  <div
                    key={visit.id}
                    className="p-6 hover:bg-blue-50/50 transition-colors group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                          <Users className="w-5 h-5" />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-blue-900">
                            {visit.staff}
                          </p>

                          <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {visit.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-3 h-3" />
                              {format(visit.date, "dd MMM yyyy")}
                            </span>
                          </div>

                          {visit.remarks && (
                            <p className="mt-2 text-xs italic text-blue-500 bg-blue-50 p-2 rounded-lg border border-blue-100">
                              "{visit.remarks}"
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
              ${
                visit.status === "Medication"
                  ? "bg-purple-100 text-purple-700"
                  : visit.status === "Overnight"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-blue-100 text-blue-700"
              }`}
                        >
                          {visit.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
