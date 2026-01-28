import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Users,
  Pill,
  TrendingUp,
  CheckCircle2,
  Heart,
  AlertCircle,
  MapPin,
  ChevronRight,
  Play,
  ExternalLink,
  X,
  MessageSquare,
  ClipboardCheck,
  CheckCircle,
} from "lucide-react";

// --- TYPES ---
interface Task {
  id: number;
  task: string;
  sub: string;
  category: "Clinical" | "Physical" | "Admin";
  status: "Pending" | "In Progress" | "Completed";
  details: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "info";
}

const CarerDashboard = () => {
  const navigate = useNavigate();
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // --- TASK STATE MANAGEMENT ---
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      task: "Morning Vitals Check",
      sub: "All residents in Wing A",
      category: "Clinical",
      status: "Pending",
      details:
        "Routine check of blood pressure, SPO2, and temperature for all residents in Wing A. Ensure results are logged in the Daily Care Logs.",
    },
    {
      id: 2,
      task: "Post-Breakfast Mobility Walk",
      sub: "Mr. Henderson & Mrs. Gable",
      category: "Physical",
      status: "In Progress",
      details:
        "Assistance required for a 15-minute walk. Mr. Henderson uses a frame; Mrs. Gable requires one-to-one supervision.",
    },
    {
      id: 3,
      task: "Inventory Update",
      sub: "Medical supplies storage room 2",
      category: "Admin",
      status: "Completed",
      details:
        "Check stock levels for incontinence pads, gloves, and clinical wipes. Report any low stock to the Head Nurse.",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Navigation Helper
  const handleNav = (path: string) => navigate(path);

  // --- HELPERS ---
  const addToast = (message: string, type: "success" | "info" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleClockToggle = () => {
    const newStatus = !isClockedIn;
    setIsClockedIn(newStatus);
    addToast(
      newStatus ? "Successfully Clocked-In" : "Successfully Clocked-Out",
      "info"
    );
  };

  // Status Update Logic
  const updateTaskStatus = (id: number, newStatus: Task["status"]) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      {/* --- TOAST NOTIFICATIONS --- */}
      <div className="fixed top-20 right-0 left-[50%] z-999999 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 bg-blue-800 border border-slate-100 shadow-xl rounded-2xl p-4 min-w-[280px] w-[280px] animate-in slide-in-from-right duration-300"
          >
            <div
              className={`p-2 rounded-full text-white`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Clock className="w-5 h-5" />
              )}
            </div>
            <p className="text-sm font-bold text-white">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* --- TASK DETAIL MODAL --- */}
      {selectedTask && (
        <div className="fixed inset-0 z-999999 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <ClipboardCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-800">
                  Update Care Task
                </h3>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {selectedTask.category}
                </span>
                <h4 className="text-lg font-bold text-slate-800 mt-2">
                  {selectedTask.task}
                </h4>
                <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                  {selectedTask.details}
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">
                  Current Progress
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Pending", "In Progress", "Completed"].map((s: any) => (
                    <button
                      key={s}
                      onClick={() => updateTaskStatus(selectedTask.id, s)}
                      className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all ${
                        selectedTask.status === s
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                          : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Clinical Observations
                </label>
                <textarea
                  className="w-full mt-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="e.g. Resident was reluctant to walk today..."
                  rows={3}
                ></textarea>
              </div>
            </div>

            <div className="p-6 bg-slate-50 flex space-x-3">
              <button
                onClick={() => setSelectedTask(null)}
                className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => setSelectedTask(null)}
                className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors"
              >
                Save & Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PROFILE BANNER --- */}
      <div className="relative rounded-2xl overflow-hidden mb-8 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-900 opacity-90 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 mix-blend-overlay"></div>
        </div>
        <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Sarah"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-white">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold">Sarah Thompson</h1>
                <ExternalLink
                  className="w-5 h-5 text-blue-200 cursor-pointer hover:text-white"
                  onClick={() => handleNav("/carer/me/profile")}
                />
              </div>
              <p className="text-blue-100 font-medium mt-1">
                Senior Carer - Wing A • Maple Residency, London
              </p>
            </div>
          </div>
          <div className="flex items-center mt-6 md:mt-0 space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-blue-900/30"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-green-400"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">100%</span>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold">Profile complete!</p>
              <button
                onClick={() => handleNav("/carer/me/profile")}
                className="flex items-center text-sm text-blue-200 hover:text-white font-medium mt-1 group"
              >
                Go to My Profile{" "}
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- DASHBOARD SUMMARY --- */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Good Morning, Sarah!
        </h1>
        <p className="text-slate-500">
          Here is what's happening at Maple Residency today.
        </p>
      </div>

      {/* --- STAT CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Active Clients",
            value: "12",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
            path: "/carer/residents/my-list",
          },
          {
            label: "Medication Alerts",
            value: "04",
            icon: Pill,
            color: "text-red-500",
            bg: "bg-red-50",
            path: "/carer/residents/medication",
          },
          {
            label: "Completed Tasks",
            value: `${tasks.filter((t) => t.status === "Completed").length}/${
              tasks.length
            }`,
            icon: CheckCircle2,
            color: "text-green-600",
            bg: "bg-green-50",
            path: "/carer/residents/logs",
          },
          {
            label: "Avg. Ward Mood",
            value: "Stable",
            icon: Heart,
            color: "text-purple-600",
            bg: "bg-purple-50",
            path: "/carer/residents/reports/summary",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            onClick={() => handleNav(stat.path)}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4 cursor-pointer hover:shadow-md hover:border-blue-100 transition-all"
          >
            <div className={`${stat.bg} p-3 rounded-xl`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* CLOCK SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-blue-600 p-4 text-white">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium opacity-90">
                  Morning Shift
                </span>
                <Clock className="w-5 h-5 opacity-80" />
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold">08:42 AM</p>
                <p className="text-xs opacity-80">Tuesday, 6th Jan 2026</p>
              </div>
            </div>
            <div className="p-5">
              <button
                onClick={handleClockToggle}
                className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                  isClockedIn
                    ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                }`}
              >
                <Play
                  className={`w-4 h-4 ${
                    isClockedIn ? "fill-red-600 rotate-90" : "fill-white"
                  }`}
                />
                <span>{isClockedIn ? "Web Clock-Out" : "Web Clock-In"}</span>
              </button>
              <div
                className="mt-4 grid grid-cols-2 gap-2 text-center"
                onClick={() => handleNav("/carer/me/hours/upcoming")}
              >
                <div className="p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Start
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    08:00 AM
                  </p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    End
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    04:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CRITICAL MEDS */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Critical Med-Pass</h3>
              <span
                onClick={() => handleNav("/carer/residents/medication")}
                className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                View All
              </span>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "Arthur Morgan",
                  med: "Donepezil (5mg)",
                  time: "09:00 AM",
                  room: "Room 204",
                },
                {
                  name: "Martha Stewart",
                  med: "Lisinopril (10mg)",
                  time: "09:30 AM",
                  room: "Room 102",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleNav("/carer/residents/medication")}
                  className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-white hover:border-blue-200 transition-all"
                >
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Pill className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-700">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">{item.med}</p>
                    <div className="flex items-center mt-1 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3 h-3 mr-1" /> {item.time} •{" "}
                      <MapPin className="w-3 h-3 mx-1" /> {item.room}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* PRIORITY TASKS SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800">
                  Priority Care Tasks
                </h3>
                <p className="text-xs text-slate-400">
                  Essential duties for your current shift
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                {tasks.filter((t) => t.status !== "Completed").length} Pending
              </span>
            </div>
            <div className="p-5 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-2 h-10 rounded-full transition-colors ${
                        task.status === "Completed"
                          ? "bg-green-400"
                          : task.status === "In Progress"
                          ? "bg-orange-400"
                          : "bg-blue-400"
                      }`}
                    />
                    <div>
                      <p className="font-bold text-slate-700 text-sm">
                        {task.task}
                      </p>
                      <p className="text-xs text-slate-500">{task.sub}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                      <p
                        className={`text-[10px] font-bold uppercase ${
                          task.status === "Completed"
                            ? "text-green-600"
                            : task.status === "In Progress"
                            ? "text-orange-600"
                            : "text-blue-600"
                        }`}
                      >
                        {task.status}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">
                        {task.category}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FEED SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Resident Status Feed</h3>
              <MessageSquare className="w-4 h-4 text-slate-400" />
            </div>
            <div className="p-5 space-y-6">
              <div className="flex space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                    JD
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <div
                    className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 cursor-pointer hover:bg-white transition-all"
                    onClick={() =>
                      handleNav("/carer/residents/reports/daily-logs")
                    }
                  >
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-bold text-slate-800">
                        John Doe{" "}
                        <span className="font-normal text-slate-500 ml-1">
                          vitals updated
                        </span>
                      </p>
                      <span className="text-[10px] text-slate-400">
                        14m ago
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white p-2 rounded-lg text-center shadow-sm">
                        <p className="text-[9px] text-slate-400 uppercase font-bold">
                          BP
                        </p>
                        <p className="text-sm font-bold text-slate-700">
                          120/80
                        </p>
                      </div>
                      <div className="bg-white p-2 rounded-lg text-center shadow-sm">
                        <p className="text-[9px] text-slate-400 uppercase font-bold">
                          SPO2
                        </p>
                        <p className="text-sm font-bold text-slate-700">98%</p>
                      </div>
                      <div className="bg-white p-2 rounded-lg text-center shadow-sm border-l-2 border-orange-400">
                        <p className="text-[9px] text-slate-400 uppercase font-bold">
                          Temp
                        </p>
                        <p className="text-sm font-bold text-slate-700">
                          99.1°F
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div
                    className="bg-blue-50/50 p-4 rounded-2xl rounded-tl-none border border-blue-100 cursor-pointer hover:bg-blue-50 transition-all"
                    onClick={() =>
                      handleNav("/carer/residents/reports/incidents")
                    }
                  >
                    <p className="text-sm font-bold text-blue-800 mb-1">
                      Incident Report: Alice Cooper
                    </p>
                    <p className="text-sm text-blue-700 leading-relaxed italic">
                      "Alice had a slight fall during lunch. No visible
                      bruising..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50/50 text-center border-t border-slate-50">
              <button
                className="text-sm font-semibold text-slate-500 hover:text-blue-600"
                onClick={() => handleNav("/carer/me/handover")}
              >
                View All Handover Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarerDashboard;
