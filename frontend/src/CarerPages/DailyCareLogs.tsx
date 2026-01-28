import { useState } from "react";
import {
  Plus,
  Droplets,
  UtensilsCrossed,
  Wind,
  History,
  Clock,
  User,
  Moon,
  X,
  CheckCircle2,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  Download,
} from "lucide-react";

const DailyCareLogs = () => {
  // --- STATE MANAGEMENT ---
  const [selectedResident, setSelectedResident] = useState({
    id: 1,
    name: "Arthur Morgan",
    room: "204-A",
    risk: "High Fall Risk",
  });

  const [logs, setLogs] = useState([
    {
      id: 1,
      type: "Hydration",
      detail: "200ml",
      time: "11:30 AM",
      carer: "Sarah T.",
      status: "Completed",
      icon: Droplets,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      id: 2,
      type: "Reposition",
      detail: "Left side to Back",
      time: "10:00 AM",
      carer: "Sarah T.",
      status: "Pending",
      icon: History,
      color: "text-slate-500",
      bg: "bg-slate-50",
    },
    {
      id: 3,
      type: "Nutrition",
      detail: "Breakfast - 100%",
      time: "08:30 AM",
      carer: "Sarah T.",
      status: "Completed",
      icon: UtensilsCrossed,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ]);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);
  const [isFullChartOpen, setIsFullChartOpen] = useState(false);
  const [fallProtocolRemarks, setFallProtocolRemarks] = useState("");
  const [showFallInput, setShowFallInput] = useState(false);

  // --- HANDLERS ---
  const residents = [
    { id: 1, name: "Arthur Morgan", room: "204-A", risk: "High Fall Risk" },
    { id: 2, name: "Martha Stewart", room: "102-B", risk: "Standard Risk" },
    { id: 3, name: "John Marston", room: "305-C", risk: "Mobility Assist" },
  ];

  const addNewLog = (
    type: string,
    detail: string,
    icon: any,
    color: string,
    bg: string
  ) => {
    const newEntry = {
      id: Date.now(),
      type,
      detail,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      carer: "Current User",
      status: "Completed",
      icon,
      color,
      bg,
    };
    setLogs([newEntry, ...logs]);
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      {/* --- MODAL: CARE LOGGING (HYDRATION/NUTRITION ETC) --- */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-999999 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                Log {activeModal}
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-4">
              <p className="text-sm font-medium text-slate-500">
                Record activity for{" "}
                <span className="text-blue-600 font-bold">
                  {selectedResident.name}
                </span>
              </p>
              {activeModal === "Hydration" && (
                <div className="grid grid-cols-3 gap-2">
                  {["100ml", "200ml", "300ml"].map((vol) => (
                    <button
                      key={vol}
                      onClick={() =>
                        addNewLog(
                          "Hydration",
                          vol,
                          Droplets,
                          "text-blue-500",
                          "bg-blue-50"
                        )
                      }
                      className="py-3 bg-blue-50 text-blue-600 font-bold rounded-xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              )}
              {activeModal === "Sleep" && (
                <div className="grid grid-cols-2 gap-2">
                  {["Resting", "Deep Sleep"].map((state) => (
                    <button
                      key={state}
                      onClick={() =>
                        addNewLog(
                          "Sleep",
                          state,
                          Moon,
                          "text-indigo-500",
                          "bg-indigo-50"
                        )
                      }
                      className="py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      {state}
                    </button>
                  ))}
                </div>
              )}
              {/* --- NUTRITION LOGGING --- */}
              {activeModal === "Nutrition" && (
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Meal Intake Amount
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Full Meal (100%)", val: "100% Intake" },
                      { label: "Partial (75%)", val: "75% Intake" },
                      { label: "Half (50%)", val: "50% Intake" },
                      { label: "Refused / Minimal", val: "Minimal Intake" },
                    ].map((item) => (
                      <button
                        key={item.val}
                        onClick={() =>
                          addNewLog(
                            "Nutrition",
                            item.val,
                            UtensilsCrossed,
                            "text-orange-600",
                            "bg-orange-50"
                          )
                        }
                        className="py-4 px-2 bg-orange-50 text-orange-700 text-xs font-bold rounded-2xl border border-orange-100 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TOILETING LOGGING --- */}
              {activeModal === "Toileting" && (
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                      Elimination Type
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() =>
                          addNewLog(
                            "Toileting",
                            "Urination - Normal",
                            Wind,
                            "text-purple-600",
                            "bg-purple-50"
                          )
                        }
                        className="flex items-center justify-center space-x-2 py-4 bg-purple-50 text-purple-700 text-xs font-bold rounded-2xl border border-purple-100 hover:bg-purple-600 hover:text-white transition-all"
                      >
                        <span>Urination</span>
                      </button>
                      <button
                        onClick={() =>
                          addNewLog(
                            "Toileting",
                            "Bowel Movement (Type 4)",
                            Wind,
                            "text-purple-600",
                            "bg-purple-50"
                          )
                        }
                        className="flex items-center justify-center space-x-2 py-4 bg-purple-50 text-purple-700 text-xs font-bold rounded-2xl border border-purple-100 hover:bg-purple-600 hover:text-white transition-all"
                      >
                        <span>Bowel Movement</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tight mb-2">
                      Clinical Note
                    </p>
                    <p className="text-[11px] text-slate-500 leading-relaxed italic">
                      Recording Bowel Movements will automatically update the
                      monthly elimination chart for clinical review.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* --- MODAL: SWITCH RESIDENT --- */}
      {isSwitchOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-999999 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-8 border-b border-slate-50">
              <h2 className="text-2xl font-black text-slate-800">
                Switch Resident
              </h2>
            </div>
            <div className="p-4 space-y-2">
              {residents.map((res) => (
                <button
                  key={res.id}
                  onClick={() => {
                    setSelectedResident(res);
                    setIsSwitchOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white">
                      <User />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-800">{res.name}</p>
                      <p className="text-xs text-slate-400">
                        {res.room} • {res.risk}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* --- MODAL: FULL CLINICAL CHART --- */}
      {isFullChartOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xl z-999999 flex items-center justify-end">
          <div className="bg-[#f8fafc] w-full max-w-5xl h-full shadow-2xl overflow-hidden animate-in slide-in-from-right duration-500 flex flex-col">
            {/* Header */}
            <div className="bg-white p-8 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center space-x-5">
                <div className="p-4 bg-blue-600 rounded-3xl text-white shadow-lg shadow-blue-100">
                  <History className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                    Full Clinical Chart
                  </h2>
                  <p className="text-slate-500 font-bold text-sm flex items-center mt-1">
                    <User className="w-4 h-4 mr-2 text-blue-500" />{" "}
                    {selectedResident.name} • Room {selectedResident.room}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-5 py-3 bg-slate-100 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-200 transition-all">
                  <Download className="w-4 h-4 mr-2" /> Export PDF
                </button>
                <button
                  onClick={() => setIsFullChartOpen(false)}
                  className="p-3 bg-slate-800 text-white rounded-2xl hover:bg-black transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* 1. Vital Trends Summary (Keka Style Analytics) */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    label: "Avg Hydration",
                    value: "1,450ml",
                    trend: "+12%",
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                  },
                  {
                    label: "Sleep Quality",
                    value: "7.5 hrs",
                    trend: "Stable",
                    color: "text-indigo-600",
                    bg: "bg-indigo-50",
                  },
                  {
                    label: "Nutrition Avg",
                    value: "85%",
                    trend: "+5%",
                    color: "text-orange-600",
                    bg: "bg-orange-50",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
                  >
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      {stat.label}
                    </p>
                    <div className="flex items-end justify-between">
                      <h4 className="text-2xl font-black text-slate-800">
                        {stat.value}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg ${stat.bg} ${stat.color}`}
                      >
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. 24-Hour Clinical Timeline */}
              <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" /> 24-Hour
                    Observation Log
                  </h3>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Date: Jan 06, 2026
                  </span>
                </div>

                <div className="p-0">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-50">
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Time
                        </th>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Category
                        </th>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Details / Values
                        </th>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Signature
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {/* Sample Chart Data */}
                      {[
                        {
                          time: "14:00",
                          cat: "Repositioning",
                          detail: "Moved to Right Side - Skin Intact",
                          carer: "Sarah Thompson",
                          status: "Routine",
                        },
                        {
                          time: "13:30",
                          cat: "Nutrition",
                          detail: "Lunch: 100% Intake - Soft Diet",
                          carer: "Sarah Thompson",
                          status: "Routine",
                        },
                        {
                          time: "12:45",
                          cat: "Clinical",
                          detail: "Temp: 36.8°C | BP: 120/80",
                          carer: "Nurse Roberts",
                          status: "Vitals",
                        },
                        {
                          time: "11:15",
                          cat: "Hydration",
                          detail: "250ml Water - Assisted",
                          carer: "Sarah Thompson",
                          status: "Routine",
                        },
                        {
                          time: "09:00",
                          cat: "Toileting",
                          detail: "Self-void - Small amount",
                          carer: "Sarah Thompson",
                          status: "Routine",
                        },
                      ].map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-8 py-5 font-bold text-slate-700 text-sm">
                            {row.time}
                          </td>
                          <td className="px-8 py-5">
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                              {row.cat}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-sm font-medium text-slate-600">
                            {row.detail}
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                                {row.carer.charAt(0)}
                              </div>
                              <span className="text-xs font-bold text-slate-500">
                                {row.carer}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. Safety Warning Footer */}
              <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start space-x-4">
                <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest mb-1">
                    Audit Notice
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    This chart is a legal medical record. All entries are
                    timestamped and digitally signed. Any corrections made after
                    24 hours must be marked as 'Late Entries' per CQC 2026
                    guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {selectedResident.name}
            </h1>
            <p className="text-slate-500 text-sm">
              Room {selectedResident.room} • {selectedResident.risk}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <button
            onClick={() => setIsSwitchOpen(true)}
            className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
          >
            Switch Resident
          </button>
          <button
            onClick={() => setIsFullChartOpen(true)}
            className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-xl flex items-center"
          >
            <History className="w-4 h-4 mr-2" /> Full Chart
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Quick Log Buttons */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Hydration",
                icon: Droplets,
                color: "text-blue-600",
                bg: "bg-blue-50",
                border: "border-blue-100",
              },
              {
                label: "Nutrition",
                icon: UtensilsCrossed,
                color: "text-orange-600",
                bg: "bg-orange-50",
                border: "border-orange-100",
              },
              {
                label: "Toileting",
                icon: Wind,
                color: "text-purple-600",
                bg: "bg-purple-50",
                border: "border-purple-100",
              },
              {
                label: "Sleep",
                icon: Moon,
                color: "text-indigo-600",
                bg: "bg-indigo-50",
                border: "border-indigo-100",
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveModal(item.label)}
                className={`flex flex-col items-center justify-center p-6 bg-white rounded-3xl border-2 border-transparent hover:${item.border} hover:${item.bg} transition-all shadow-sm group active:scale-95`}
              >
                <div
                  className={`p-3 rounded-2xl ${item.bg} ${item.color} mb-3 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-700 text-sm">
                  {item.label}
                </span>
                <Plus className="w-4 h-4 mt-2 text-slate-300" />
              </button>
            ))}
          </div>

          {/* Activity Log Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">
                Today's Activity Log
              </h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-blue-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody className="divide-y divide-slate-50">
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-xl ${
                              log.bg || "bg-slate-100"
                            } ${log.color || "text-slate-500"}`}
                          >
                            {log.icon ? (
                              <log.icon className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              {log.type}
                            </p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                              {log.carer}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-600 italic">
                        "{log.detail}"
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-bold text-slate-800">
                            {log.time}
                          </span>

                          {/* INTERACTIVE STATUS BADGE */}
                          <button
                            onClick={() => {
                             
                              const updatedLogs = logs.map((l) =>
                                l.id === log.id
                                  ? {
                                      ...l,
                                      status: "Completed",
                                      time: new Date().toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      }),
                                    }
                                  : l
                              );
                              setLogs(updatedLogs);
                            }}
                            disabled={log.status === "Completed"}
                            className={`text-[9px] font-black uppercase tracking-widest flex items-center mt-1 px-2 py-1 rounded-lg transition-all ${
                              log.status === "Completed"
                                ? "text-green-500 bg-green-50 cursor-default"
                                : "text-amber-500 bg-amber-50 hover:bg-amber-500 hover:text-white cursor-pointer"
                            }`}
                          >
                            {log.status === "Completed" ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                {log.status}
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                Mark Done
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Daily Targets & Reminders */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Progress Targets */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">Intake Targets</h3>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <Droplets className="w-3 h-3 mr-1 text-blue-500" />{" "}
                    Hydration
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    1400 / 2000ml
                  </span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Safety Notice (Fall Risk Protocol) */}
          <div className="p-6 bg-red-50 rounded-3xl border border-red-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
              <ShieldAlert className="w-20 h-20 text-red-600" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-red-700 mb-3">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">
                  Fall Risk Protocol
                </span>
              </div>
              <p className="text-xs text-red-800 leading-relaxed font-bold mb-4">
                {fallProtocolRemarks ||
                  "Ensure 2-person assistance for all mobility tasks and bed rails are secured."}
              </p>

              {showFallInput ? (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                  <textarea
                    value={fallProtocolRemarks}
                    onChange={(e) => setFallProtocolRemarks(e.target.value)}
                    placeholder="Enter urgent warning remarks..."
                    className="w-full p-3 bg-white border border-red-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-red-500/20 resize-none"
                    rows={2}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowFallInput(false)}
                      className="flex-1 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-red-200"
                    >
                      Save Remark
                    </button>
                    <button
                      onClick={() => setShowFallInput(false)}
                      className="px-3 py-2 bg-white text-red-400 rounded-lg"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowFallInput(true)}
                  className="w-full py-2.5 bg-white border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-100 transition-colors"
                >
                  Edit Protocol Remarks
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCareLogs;
