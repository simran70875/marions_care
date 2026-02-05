import { useState, useMemo } from "react";
import {
  AlertTriangle,
  FileWarning,
  ShieldAlert,
  Clock,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Send,
  Eye,
  X,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

const IncidentReports = () => {
  // --- STATE ---
  const [activeFilter, setActiveFilter] = useState("All Incidents");
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isInvestigationOpen, setIsInvestigationOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  const [incidents, setIncidents] = useState([
    {
      id: "INC-9021",
      resident: "Arthur Morgan",
      type: "Fall",
      severity: "High",
      date: "Jan 06, 2026",
      time: "10:45 AM",
      reportedBy: "Sarah Thompson",
      status: "Under Review",
      regulatory: "Pending",
      description: "Resident found on floor next to bed. Alert and oriented.",
    },
    {
      id: "INC-8994",
      resident: "Alice Cooper",
      type: "Medication Error",
      severity: "Critical",
      date: "Jan 05, 2026",
      time: "04:20 PM",
      reportedBy: "James Wilson",
      status: "Open",
      regulatory: "Reported",
      description: "Missed evening dose of Warfarin. GP notified.",
    },
    {
      id: "INC-8812",
      resident: "Martha Stewart",
      type: "Skin Tear",
      severity: "Low",
      date: "Jan 04, 2026",
      time: "09:00 AM",
      reportedBy: "Sarah Thompson",
      status: "Resolved",
      regulatory: "Not Required",
      description: "Minor skin tear on left forearm during transfer.",
    },
  ]);

  // --- FILTERS ---
  const filteredIncidents = useMemo(() => {
    if (activeFilter === "All Incidents") return incidents;
    return incidents.filter((inc) => inc.status === activeFilter);
  }, [activeFilter, incidents]);

  // --- HANDLERS ---
  const handleAddIncident = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Create the object with correct casting and date options
    const newInc = {
      id: `INC-${Math.floor(8000 + Math.random() * 1000)}`,
      // Use "as string" or "String()" to ensure TS knows it's a string
      resident: String(formData.get("resident") || ""),
      type: String(formData.get("type") || ""),
      severity: String(formData.get("severity") || "Low"),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric", // Fix: use "numeric" instead of "2026"
      }),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reportedBy: "Current User",
      status: "Open",
      regulatory: "Pending",
      description: String(formData.get("description") || ""),
    };

    setIncidents([newInc, ...incidents]);
    setIsLogModalOpen(false);
  };

  const updateStatus = (id: string, newStatus: string) => {
    setIncidents(
      incidents.map((inc) =>
        inc.id === id ? { ...inc, status: newStatus } : inc
      )
    );
    setIsInvestigationOpen(false);
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  // --- ADDITIONAL STATE FOR URGENT ACTIONS ---
  const [urgentActions, setUrgentActions] = useState([
    {
      id: 1,
      title: "Medication Audit Needed",
      detail: "Follow-up required for INC-8994.",
      type: "critical",
      relatedIncident: "Arthur Morgan - Fall",
    },
    {
      id: 2,
      title: "MDT Meeting",
      detail: "Fall prevention strategy for Arthur Morgan.",
      type: "standard",
      relatedIncident: "Martha Stewart - Skin Tear",
    },
  ]);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  // --- HANDLER TO ADD NEW ACTION ---
  const handleAddAction = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAction = {
      id: Date.now(),
      title: formData.get("title") as string,
      detail: formData.get("detail") as string,
      type: formData.get("type") as string,
      relatedIncident: formData.get("relatedIncident") as string,
    };
    setUrgentActions([newAction, ...urgentActions]);
    setIsActionModalOpen(false);
  };

  // --- HANDLER TO REMOVE/COMPLETE ACTION ---
  const completeAction = (id: number) => {
    setUrgentActions(urgentActions.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      {/* --- MODAL: LOG NEW INCIDENT --- */}
      {isLogModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-99999 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddIncident}
            className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in duration-200"
          >
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-red-50/50">
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                Log New Incident
              </h2>
              <button
                type="button"
                onClick={() => setIsLogModalOpen(false)}
                className="p-2 hover:bg-white rounded-full"
              >
                <X />
              </button>
            </div>
            <div className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Resident
                  </label>
                  <input
                    name="resident"
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Severity
                  </label>
                  <select
                    name="severity"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Incident Type
                </label>
                <input
                  name="type"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="e.g., Fall, Med Error"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Provide details..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-red-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-red-100 hover:bg-red-700 transition-all"
              >
                File Official Report
              </button>
            </div>
          </form>
        </div>
      )}
      {/* --- MODAL: VIEW INVESTIGATION --- */}
      {isInvestigationOpen && selectedIncident && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-999999 flex items-center justify-end">
          <div className="bg-white h-full w-full max-w-xl shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <span
                  className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${getSeverityStyle(
                    selectedIncident.severity
                  )}`}
                >
                  {selectedIncident.severity} Severity
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  {selectedIncident.id} Investigation
                </h2>
              </div>
              <button
                onClick={() => setIsInvestigationOpen(false)}
                className="p-2 bg-slate-100 rounded-full"
              >
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <section>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                  Incident Summary
                </h4>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                    "{selectedIncident.description}"
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Update Workflow Status
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {["Under Review", "Resolved"].map((stat) => (
                    <button
                      key={stat}
                      onClick={() => updateStatus(selectedIncident.id, stat)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border-2 transition-all ${
                        selectedIncident.status === stat
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-slate-100 text-slate-400 hover:border-slate-200"
                      }`}
                    >
                      {stat}
                    </button>
                  ))}
                </div>
              </section>

              <section className="p-6 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-100">
                <div className="flex items-center space-x-3 mb-3">
                  <ShieldCheck className="w-5 h-5" />
                  <h4 className="font-bold text-sm">Regulatory Compliance</h4>
                </div>
                <p className="text-xs text-blue-100 leading-relaxed">
                  This incident has been flagged for CQC review. Ensure all
                  witness statements are attached to the digital file before
                  resolution.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {isActionModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1100] flex items-center justify-center p-4">
          <form
            onSubmit={handleAddAction}
            className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl animate-in zoom-in duration-200 overflow-hidden"
          >
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">
                  Assign Action
                </h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                  Clinical Follow-up
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsActionModalOpen(false)}
                className="p-2 bg-white shadow-sm rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-5">
              {/* RELATE TO INCIDENT DROPDOWN */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <ShieldAlert className="w-3 h-3 mr-1 text-red-500" /> Link to
                  Incident
                </label>
                <select
                  name="relatedIncident"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
                >
                  <option value="">Select an active case...</option>
                  {incidents.map((inc) => (
                    <option
                      key={inc.id}
                      value={`${inc.resident} (${inc.type})`}
                    >
                      {inc.id}: {inc.resident} — {inc.type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Priority
                  </label>
                  <select
                    name="type"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                  >
                    <option value="critical">🔴 Critical</option>
                    <option value="standard">⚪ Standard</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Task Category
                  </label>
                  <select
                    name="title"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                  >
                    <option value="Medication Audit">Med Audit</option>
                    <option value="Witness Statement">Witness Stmt</option>
                    <option value="Family Notified">Family Sync</option>
                    <option value="GP Review">GP Review</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Instructions
                </label>
                <textarea
                  name="detail"
                  required
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all"
                  placeholder="Specific instructions for the customer..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-black hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Create Urgent Action
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <ShieldAlert className="w-7 h-7 mr-3 text-red-600" />
            Incident Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Log, track, and resolve clinical and safety incidents.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            <Eye className="w-4 h-4 mr-2" /> View Dashboard
          </button>
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="flex items-center px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 mr-2" /> Log New Incident
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: List of Incidents */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex space-x-1 bg-white p-1.5 rounded-2xl border border-slate-100 w-fit shadow-sm">
            {["All Incidents", "Open", "Under Review", "Resolved"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                    activeFilter === tab
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <div className="space-y-4">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:border-blue-200 transition-all group"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-2xl ${
                          incident.severity === "Critical"
                            ? "bg-red-50"
                            : "bg-slate-50"
                        }`}
                      >
                        <AlertTriangle
                          className={`w-6 h-6 ${
                            incident.severity === "Critical"
                              ? "text-red-500"
                              : "text-slate-400"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-bold text-slate-800">
                            {incident.resident} - {incident.type}
                          </h3>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getSeverityStyle(
                              incident.severity
                            )}`}
                          >
                            {incident.severity}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">
                          ID: {incident.id} • Reported by {incident.reportedBy}{" "}
                          • {incident.date} at {incident.time}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                    <div className="flex space-x-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          Workflow Status
                        </span>
                        <span
                          className={`text-xs font-bold flex items-center mt-1 ${
                            incident.status === "Resolved"
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        >
                          {incident.status === "Resolved" ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}{" "}
                          {incident.status}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          Regulatory
                        </span>
                        <span
                          className={`text-xs font-bold mt-1 ${
                            incident.regulatory === "Reported"
                              ? "text-green-600"
                              : "text-orange-500"
                          }`}
                        >
                          {incident.regulatory}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedIncident(incident);
                        setIsInvestigationOpen(true);
                      }}
                      className="flex items-center text-xs font-bold text-slate-700 bg-slate-50 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-xl transition-all"
                    >
                      View Investigation{" "}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center">
                <FileWarning className="w-5 h-5 mr-2 text-red-600" />
                Urgent Actions
              </h3>
              <button
                onClick={() => setIsActionModalOpen(true)}
                className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {urgentActions.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4 italic">
                  No pending urgent actions
                </p>
              ) : (
                urgentActions.map((action) => (
                  <div
                    key={action.id}
                    className={`p-4 rounded-2xl border flex items-start space-x-3 group transition-all ${
                      action.type === "critical"
                        ? "bg-red-50 border-red-100"
                        : "bg-slate-50 border-slate-100"
                    }`}
                  >
                    <AlertTriangle
                      className={`w-5 h-5 mt-0.5 ${
                        action.type === "critical"
                          ? "text-red-600"
                          : "text-slate-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-xs font-bold ${
                          action.type === "critical"
                            ? "text-red-800"
                            : "text-slate-800"
                        }`}
                      >
                        {action.title}
                      </p>
                      {/* Displaying the linked case badge */}
                      <span className="text-[9px] bg-white/50 px-1.5 py-0.5 rounded border border-black/5 font-bold">
                        {action.relatedIncident}
                      </span>
                      <p
                        className={`text-[11px] mt-1 opacity-80 ${
                          action.type === "critical"
                            ? "text-red-600"
                            : "text-slate-500"
                        }`}
                      >
                        {action.detail}
                      </p>
                      <div className="flex items-center mt-3 space-x-3">
                        <button
                          className={`text-[10px] font-black uppercase tracking-widest flex items-center ${
                            action.type === "critical"
                              ? "text-red-700"
                              : "text-blue-600"
                          }`}
                        >
                          Start <ArrowUpRight className="w-3 h-3 ml-1" />
                        </button>
                        <button
                          onClick={() => completeAction(action.id)}
                          className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-green-600 transition-colors"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-32 h-32" />
            </div>
            <h3 className="font-bold text-lg mb-2 relative z-10">
              Emergency On-Call
            </h3>
            <p className="text-slate-400 text-xs mb-4 relative z-10">
              Contact the Duty Manager for life-threatening incidents or
              immediate evacuations.
            </p>
            <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold flex items-center justify-center relative z-10 hover:bg-blue-50 transition-colors">
              <Send className="w-4 h-4 mr-2" /> Notify Manager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentReports;
