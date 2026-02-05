import { useState, useMemo } from "react";
import {
  FileSearch,
  FileText,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Download,
  Search,
  ChevronRight,
  Clock,
  AlertCircle,
  BarChart3,
  X,
  User,
  History,
  ArrowUpRight,
  AlertTriangle,
  ShieldAlert,
  MapPin,
  PenTool,
} from "lucide-react";

const ReportsCustomerPlans = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Modal States
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);

  // Form State for Incident Report
  const [incidentData, setIncidentData] = useState({
    resident: "",
    location: "",
    type: "Fall",
    urgency: "Routine",
    description: "",
    witness: "",
  });

  const initialCustomerPlans = [
    {
      id: "CP-102",
      resident: "Arthur Morgan",
      type: "Dementia Customer",
      status: "Active",
      lastReview: "Dec 12, 2025",
      nextReview: "Mar 12, 2026",
      compliance: "High",
      prescriber: "Dr. John Smith",
      notes:
        "Maintain structured routine. Monitor cognitive drift in evenings.",
    },
    {
      id: "CP-085",
      resident: "Alice Cooper",
      type: "Mobility & Falls",
      status: "Under Review",
      lastReview: "Oct 05, 2025",
      nextReview: "Jan 15, 2026",
      compliance: "Urgent",
      prescriber: "Physio Team",
      notes: "High risk during night transfers. Ensure bed sensor is active.",
    },
    {
      id: "CP-114",
      resident: "Martha Stewart",
      type: "Nutrition Plan",
      status: "Active",
      lastReview: "Jan 02, 2026",
      nextReview: "Apr 02, 2026",
      compliance: "High",
      prescriber: "Dietician Lee",
      notes: "Low sodium diet. Monitor fluid intake strictly.",
    },
  ];

  const filteredPlans = useMemo(() => {
    return initialCustomerPlans.filter((plan) => {
      const matchesSearch =
        plan.resident.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterStatus === "All" || plan.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus]);

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      {/* --- MODAL: GENERATE INCIDENT REPORT --- */}
      {isIncidentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-999999 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="bg-red-600 p-8 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4">
                <AlertTriangle className="w-48 h-48" />
              </div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">
                    Incident Report
                  </h2>
                  <p className="text-red-100 text-xs font-bold uppercase tracking-widest mt-1">
                    New Clinical Entry • Ref #INC-2026-TBD
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsIncidentModalOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Resident Involved
                  </label>
                  <select
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
                    onChange={(e) =>
                      setIncidentData({
                        ...incidentData,
                        resident: e.target.value,
                      })
                    }
                  >
                    <option>Select Resident...</option>
                    {initialCustomerPlans.map((p) => (
                      <option key={p.id}>{p.resident}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Incident Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Dining Hall, Room 204"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm font-bold focus:ring-2 focus:ring-red-500/20 outline-none"
                      onChange={(e) =>
                        setIncidentData({
                          ...incidentData,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Urgency Level
                  </label>
                  <div className="flex p-1 bg-slate-100 rounded-xl">
                    {["Routine", "Critical"].map((level) => (
                      <button
                        key={level}
                        onClick={() =>
                          setIncidentData({ ...incidentData, urgency: level })
                        }
                        className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${
                          incidentData.urgency === level
                            ? "bg-white text-red-600 shadow-sm"
                            : "text-slate-500"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Incident Type
                  </label>
                  <select
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-red-500/20 outline-none"
                    onChange={(e) =>
                      setIncidentData({ ...incidentData, type: e.target.value })
                    }
                  >
                    <option>Fall / Slip</option>
                    <option>Medication Error</option>
                    <option>Behavioral Issue</option>
                    <option>Equipment Failure</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Clinical Observation / Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide a detailed account of the event and any immediate actions taken..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-red-500/20 outline-none resize-none"
                  onChange={(e) =>
                    setIncidentData({
                      ...incidentData,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start space-x-3">
                <PenTool className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-[11px] text-amber-800 font-medium">
                  By submitting this report, you confirm that the information
                  provided is accurate to the best of your knowledge. A copy
                  will be sent to the Wing Supervisor.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <div className="flex items-center text-xs text-slate-400 font-bold">
                <Clock className="w-4 h-4 mr-1.5" /> Auto-Saving Draft
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsIncidentModalOpen(false)}
                  className="px-6 py-3 text-sm font-bold text-slate-500"
                >
                  Discard
                </button>
                <button
                  className="px-10 py-3 bg-red-600 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-red-100 hover:bg-red-700 active:scale-95 transition-all"
                  onClick={() => {
                    alert("Incident Report Filed Successfully");
                    setIsIncidentModalOpen(false);
                  }}
                >
                  File Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- DETAIL MODAL --- */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-999999 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">
                    {selectedPlan.type}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm flex items-center">
                    <User className="w-3.5 h-3.5 mr-1" />{" "}
                    {selectedPlan.resident} • {selectedPlan.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-8 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Current Status
                  </p>
                  <span
                    className={`mt-1 inline-flex px-3 py-1 rounded-lg text-xs font-bold ${
                      selectedPlan.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {selectedPlan.status}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Last Review
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {selectedPlan.lastReview}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Assigned Specialist
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {selectedPlan.prescriber}
                  </p>
                </div>
              </div>
              <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-100">
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center">
                  <History className="w-3 h-3 mr-1.5" /> Clinical Directives
                </h4>
                <p className="text-xs text-blue-900 font-medium leading-relaxed italic">
                  "{selectedPlan.notes}"
                </p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button className="px-8 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100">
                Confirm Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <FileSearch className="w-7 h-7 mr-3 text-blue-600" />
            Reports & Customer Plans
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Review resident strategies and clinical documentation.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            <Download className="w-4 h-4 mr-2" /> Export All
          </button>
          <button
            onClick={() => setIsIncidentModalOpen(true)}
            className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200"
          >
            Generate Incident Report
          </button>
        </div>
      </div>

      {/* --- REMAINDER OF YOUR COMPONENT (SUMMARY, LIST, ETC) --- */}
      {/* (Summary and list logic as implemented in the previous step) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Active Customer Plans",
            value: "42",
            icon: ShieldCheck,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Overdue Reviews",
            value: "03",
            icon: AlertCircle,
            color: "text-red-500",
            bg: "bg-red-50",
          },
          {
            label: "Reports (This Week)",
            value: "128",
            icon: BarChart3,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Audit Score",
            value: "98%",
            icon: TrendingUp,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4"
          >
            <div className={`${stat.bg} p-3 rounded-xl`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-6 gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search resident or plan type..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  {["All", "Active", "Under Review"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all border ${
                        filterStatus === status
                          ? "bg-slate-800 text-white border-slate-800"
                          : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* List View */}
              <div className="space-y-3">
                {filteredPlans.length > 0 ? (
                  filteredPlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className="group p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-blue-600 group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-bold text-slate-800">
                                {plan.type}
                              </h4>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${
                                  plan.status === "Active"
                                    ? "bg-green-50 text-green-700 border-green-100"
                                    : "bg-orange-50 text-orange-700 border-orange-100"
                                }`}
                              >
                                {plan.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium mt-1">
                              Resident: {plan.resident} • ID: {plan.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-8">
                          <div className="text-right hidden md:block">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                              Next Review
                            </p>
                            <p
                              className={`text-xs font-bold ${
                                plan.compliance === "Urgent"
                                  ? "text-red-600"
                                  : "text-slate-700"
                              }`}
                            >
                              {plan.nextReview}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="text-slate-300" />
                    </div>
                    <p className="text-slate-500 text-sm font-bold">
                      No care plans found matching your search.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Recently Generated
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-black uppercase tracking-tighter">
                Live
              </span>
            </h3>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {[
                {
                  title: "Weekly Vitals Summary",
                  date: "Today, 08:00 AM",
                  size: "1.2 MB",
                },
                {
                  title: "eMAR Missed Dose Audit",
                  date: "Yesterday",
                  size: "0.8 MB",
                },
                {
                  title: "Handover Report - Wing A",
                  date: "Yesterday",
                  size: "2.4 MB",
                },
              ].map((report, idx) => (
                <div key={idx} className="relative pl-8 group cursor-pointer">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center z-10 group-hover:bg-blue-500 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 flex items-center">
                      {report.title}{" "}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <div className="flex items-center text-[11px] text-slate-400 font-medium mt-1">
                      <Calendar className="w-3 h-3 mr-1" /> {report.date} •{" "}
                      {report.size}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-slate-50 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all border border-transparent hover:border-slate-200">
              Browse Archive
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute right-0 top-0 opacity-10 -translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="w-32 h-32" />
            </div>
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-lg leading-tight">
              CQC Compliance Shield
            </h3>
            <p className="text-blue-100 text-xs mt-2 leading-relaxed opacity-90">
              All care plans currently meet the 2026 clinical standards. Ensure
              Alice Cooper's Fall Assessment is reviewed within 48 hours to
              maintain your wing's rating.
            </p>
            <button className="mt-6 w-full py-3 bg-white text-blue-600 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-all shadow-lg active:scale-95">
              Run Compliance Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsCustomerPlans;
