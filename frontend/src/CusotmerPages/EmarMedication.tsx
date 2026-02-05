import React, { useState } from "react";
import {
  Pill,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Search,
  History,
  Activity,
  User,
  X,
  ClipboardCheck,
  FileText,
  Calendar,
  ShieldAlert,
  Hash,
  UserCheck,
  ChevronRight,
  Beaker,
  Stethoscope,
  ClipboardList,
  MapPin,
  Lock,
} from "lucide-react";

// --- TYPES ---
type MedStatus = "Given" | "Due" | "Missed" | "PRN" | "Controlled";
type Urgency = "Routine" | "Critical";

interface Medication {
  id: number;
  resident: string;
  room: string;
  med: string;
  dosage: string;
  route: string;
  time: string;
  status: MedStatus;
  notes: string;
  urgency: Urgency;
  batchNo?: string;
  expiryDate?: string;
  prescriber?: string;
  lastAdminBy?: string;
  pharmacyNote?: string;
  frequency?: string;
  sideEffects?: string;
}

const CustomerEMARPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isAuditOpen, setIsAuditOpen] = useState<boolean>(false);
  const [isCDLogOpen, setIsCDLogOpen] = useState<boolean>(false);

  const [meds, setMeds] = useState<Medication[]>([
    {
      id: 1,
      resident: "Arthur Morgan",
      room: "204-A",
      med: "Donepezil",
      dosage: "5mg - 1 Tablet",
      route: "Oral",
      time: "09:00 AM",
      status: "Given",
      notes: "Taken with water",
      urgency: "Routine",
      batchNo: "BN-8821",
      expiryDate: "12/2027",
      prescriber: "Dr. John Smith",
      lastAdminBy: "Sarah Thompson",
      frequency: "Once daily in the evening",
      sideEffects: "Nausea, dizziness",
    },
    {
      id: 2,
      resident: "Alice Cooper",
      room: "110-C",
      med: "Lisinopril",
      dosage: "10mg - 1 Tablet",
      route: "Oral",
      time: "09:00 AM",
      status: "Due",
      notes: "Check BP before admin",
      urgency: "Critical",
      batchNo: "BN-4402",
      expiryDate: "05/2026",
      prescriber: "Dr. Jane Doe",
      frequency: "Every morning",
      sideEffects: "Cough, lightheadedness",
    },
    {
      id: 3,
      resident: "Martha Stewart",
      room: "102-B",
      med: "Morphine Sulfate",
      dosage: "5mg/5ml - 2.5ml",
      route: "Oral Solution",
      time: "09:30 AM",
      status: "Controlled",
      notes: "Pain management",
      urgency: "Routine",
      batchNo: "CD-991",
      expiryDate: "01/2028",
      prescriber: "Dr. John Smith",
      frequency: "Every 4 hours as needed",
    },
    {
      id: 4,
      resident: "John Marston",
      room: "205-A",
      med: "Paracetamol",
      dosage: "500mg - 2 Tablets",
      route: "Oral",
      time: "AS NEEDED",
      status: "PRN",
      notes: "For mild pain",
      urgency: "Routine",
      batchNo: "BN-112",
      expiryDate: "03/2029",
      prescriber: "Clinic Staff",
      frequency: "Max 4 doses in 24 hours",
    },
  ]);

  const handleUpdateStatus = (id: number, newStatus: MedStatus) => {
    setMeds((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: newStatus, lastAdminBy: "Sarah Thompson" }
          : m
      )
    );
    setIsAdminModalOpen(false);
  };

  const filteredMeds = meds.filter((m) => {
    const matchesSearch =
      m.resident.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.med.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      m.status === activeFilter ||
      (activeFilter === "Critical" && m.urgency === "Critical");
    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status: MedStatus) => {
    switch (status) {
      case "Given":
        return "bg-green-50 text-green-700 border-green-100";
      case "Missed":
        return "bg-red-50 text-red-700 border-red-100";
      case "PRN":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "Controlled":
        return "bg-orange-50 text-orange-700 border-orange-100";
      default:
        return "bg-blue-50 text-blue-700 border-blue-100 animate-pulse";
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      {/* --- MODAL: AUDIT TRAIL (MODERNIZED) --- */}
      {isAuditOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-999999 flex items-center justify-end">
          <div className="bg-white h-full w-full max-w-md shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] flex flex-col animate-in slide-in-from-right duration-500 border-l border-slate-100">
            {/* Header Section */}
            <div className="p-8 border-b border-slate-50 bg-slate-50/50">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 flex items-center tracking-tight">
                    <div className="p-2 bg-blue-600 rounded-lg mr-3 shadow-lg shadow-blue-200">
                      <History className="w-5 h-5 text-white" />
                    </div>
                    Audit Trail
                  </h2>
                  <p className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-widest">
                    Activity Log • Jan 06, 2026
                  </p>
                </div>
                <button
                  onClick={() => setIsAuditOpen(false)}
                  className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-slate-600 rounded-2xl transition-all shadow-sm hover:shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Audit List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-0">
              {[
                {
                  user: "Sarah Thompson",
                  role: "Senior Nurse",
                  action: "Marked Given",
                  target: "Arthur Morgan",
                  med: "Donepezil 5mg",
                  time: "09:12 AM",
                  type: "success",
                  icon: <CheckCircle2 className="w-4 h-4" />,
                },
                {
                  user: "System",
                  role: "Automated",
                  action: "Stock Warning",
                  target: "Inventory",
                  med: "Lisinopril 10mg",
                  time: "08:45 AM",
                  type: "warning",
                  icon: <AlertCircle className="w-4 h-4" />,
                },
                {
                  user: "Dr. Jane Doe",
                  role: "Prescriber",
                  action: "Added Note",
                  target: "Alice Cooper",
                  med: "Lisinopril 10mg",
                  time: "08:30 AM",
                  type: "info",
                  icon: <FileText className="w-4 h-4" />,
                },
                {
                  user: "Mark Evans",
                  role: "Customer",
                  action: "Marked Missed",
                  target: "John Marston",
                  med: "Paracetamol 500mg",
                  time: "07:15 AM",
                  type: "danger",
                  icon: <XCircle className="w-4 h-4" />,
                },
              ].map((log, i, arr) => (
                <div key={i} className="flex gap-6 group">
                  {/* Timeline Track */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm border-2 border-white
                      ${
                        log.type === "success"
                          ? "bg-green-100 text-green-600"
                          : ""
                      }
                      ${
                        log.type === "warning"
                          ? "bg-orange-100 text-orange-600"
                          : ""
                      }
                      ${log.type === "info" ? "bg-blue-100 text-blue-600" : ""}
                      ${log.type === "danger" ? "bg-red-100 text-red-600" : ""}
                    `}
                    >
                      {log.icon}
                    </div>
                    {i !== arr.length - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-to-b from-slate-100 to-transparent my-1"></div>
                    )}
                  </div>

                  {/* Log Content */}
                  <div className="pb-8 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-black text-slate-800">
                        {log.user}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-tighter">
                        {log.role}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {log.action}{" "}
                      <span className="font-bold text-slate-900">
                        {log.med}
                      </span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center">
                      <Activity className="w-3 h-3 mr-1" /> For {log.target}
                    </p>
                    <p className="text-[10px] font-black text-blue-500 mt-3 uppercase tracking-widest">
                      {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-600">
                    Live Updates Enabled
                  </span>
                </div>
                <button className="text-[11px] font-black text-blue-600 uppercase hover:underline">
                  Download CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* --- MODAL: CONTROLLED DRUG LOG (MODERNIZED) --- */}
      {isCDLogOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[999999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-5xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
            {/* High-Security Header */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-8 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4">
                <ShieldAlert className="w-64 h-64" />
              </div>

              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center space-x-5">
                  <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner">
                    <ShieldAlert className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">
                      Controlled Drug Register
                    </h2>
                    <div className="flex items-center mt-2 space-x-4">
                      <p className="text-orange-100 text-xs font-bold uppercase tracking-widest flex items-center">
                        <Activity className="w-3 h-3 mr-1" /> Schedule 2 & 3
                        Compliance
                      </p>
                      <span className="h-1 w-1 bg-orange-300 rounded-full"></span>
                      <p className="text-orange-100 text-xs font-bold uppercase tracking-widest flex items-center">
                        <Lock className="w-3 h-3 mr-1" /> Ledger ID: CD-2026-991
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsCDLogOpen(false)}
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all border border-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Controlled Drug Ledger Content */}
            <div className="p-8 bg-slate-50/50">
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Entry Details
                      </th>
                      <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Medication & Dose
                      </th>
                      <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Resident
                      </th>
                      <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Inventory Balance
                      </th>
                      <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Witness Verification
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    {[
                      {
                        date: "06 Jan",
                        time: "09:30 AM",
                        drug: "Morphine Sulfate",
                        strength: "5mg/5ml",
                        dose: "2.5ml",
                        resident: "Martha Stewart",
                        preStock: "450ml",
                        postStock: "447.5ml",
                        admin: "S. Thompson",
                        witness: "R. Jenkins",
                        status: "Verified",
                      },
                      {
                        date: "06 Jan",
                        time: "08:15 AM",
                        drug: "Oxycodone",
                        strength: "10mg",
                        dose: "1 Tablet",
                        resident: "Arthur Morgan",
                        preStock: "24",
                        postStock: "23",
                        admin: "M. Evans",
                        witness: "S. Thompson",
                        status: "Verified",
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-orange-50/30 transition-colors group"
                      >
                        <td className="px-6 py-6">
                          <p className="font-black text-slate-800">
                            {row.date}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            {row.time}
                          </p>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                            <div>
                              <p className="font-black text-slate-800">
                                {row.drug}
                              </p>
                              <p className="text-xs text-orange-600 font-bold">
                                {row.dose}{" "}
                                <span className="text-slate-400 font-medium">
                                  ({row.strength})
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 font-bold text-slate-700">
                          {row.resident}
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-400 line-through text-xs">
                              {row.preStock}
                            </span>
                            <ChevronRight className="w-3 h-3 text-slate-300" />
                            <span className="font-black text-slate-800 bg-slate-100 px-2 py-1 rounded-lg">
                              {row.postStock}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center text-[11px] font-bold text-slate-700">
                              <UserCheck className="w-3.5 h-3.5 mr-1.5 text-blue-500" />{" "}
                              {row.admin}
                            </div>
                            <div className="flex items-center text-[11px] font-bold text-slate-700">
                              <UserCheck className="w-3.5 h-3.5 mr-1.5 text-green-500" />{" "}
                              {row.witness} (Witness)
                            </div>
                            <span className="mt-1 w-fit px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-black uppercase rounded">
                              Legal Sign-off OK
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Summary Bar */}
            <div className="p-8 bg-white border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Ledger Integrity: Encrypted
                  </span>
                </div>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <div className="text-xs text-slate-400">
                  Last Balance Check:{" "}
                  <span className="font-bold text-slate-600">
                    Today, 02:45 PM
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-200 transition-all">
                  <FileText className="w-4 h-4 mr-2" /> Export to PDF
                </button>
                <button className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-2xl text-xs font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all">
                  Perform Stock Count
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* --- MODAL: DETAILED RECORD (CLEAN REDESIGN) --- */}
      {isDetailsModalOpen && selectedMed && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header Section */}
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-4 rounded-2xl ${
                    selectedMed.urgency === "Critical"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Pill className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                      {selectedMed.med}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${getStatusStyle(
                        selectedMed.status
                      )}`}
                    >
                      {selectedMed.status}
                    </span>
                  </div>
                  <p className="text-slate-500 font-medium flex items-center text-sm">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> Room{" "}
                    {selectedMed.room} • Patient Record #{selectedMed.id}0092
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-full transition-colors shadow-sm"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Patient Profile Card */}
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-lg shadow-blue-100">
                    <p className="text-[10px] font-bold uppercase opacity-70 tracking-widest mb-1">
                      Assigned Resident
                    </p>
                    <p className="text-xl font-bold mb-4">
                      {selectedMed.resident}
                    </p>
                    <div className="flex items-center space-x-2 text-xs bg-blue-500/30 p-2 rounded-xl">
                      <User className="w-4 h-4" />
                      <span>View Full Profile</span>
                    </div>
                  </div>

                  <div className="space-y-4 px-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 flex items-center">
                        <Stethoscope className="w-4 h-4 mr-2" /> Prescriber
                      </span>
                      <span className="font-bold text-slate-700">
                        {selectedMed.prescriber || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 flex items-center">
                        <UserCheck className="w-4 h-4 mr-2" /> Verified By
                      </span>
                      <span className="font-bold text-slate-700">
                        {selectedMed.lastAdminBy || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Administration Details */}
                <div className="md:col-span-2 space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        <Beaker className="w-3 h-3 mr-1" /> Dosage Format
                      </label>
                      <p className="text-base font-bold text-slate-800">
                        {selectedMed.dosage}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        <Activity className="w-3 h-3 mr-1" /> Route of Admin
                      </label>
                      <p className="text-base font-bold text-slate-800">
                        {selectedMed.route}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> Frequency
                      </label>
                      <p className="text-base font-bold text-slate-800">
                        {selectedMed.time}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        <Hash className="w-3 h-3 mr-1" /> Batch / Stock
                      </label>
                      <p className="text-base font-mono font-bold text-slate-800">
                        {selectedMed.batchNo || "---"}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                    <h4 className="text-[10px] font-black text-amber-700 uppercase mb-2 tracking-widest flex items-center">
                      <Info className="w-3 h-3 mr-1.5" /> Clinical
                      Administration Note
                    </h4>
                    <p className="text-sm text-amber-900 font-medium italic">
                      "{selectedMed.notes}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center space-x-3 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Stock Expiry:{" "}
                        <span className="font-bold text-red-500">
                          {selectedMed.expiryDate || "N/A"}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-slate-500">
                      <ShieldAlert className="w-4 h-4" />
                      <span>
                        Safety Protocol:{" "}
                        <span className="font-bold text-slate-800">
                          Verified
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button className="text-xs font-bold text-blue-600 flex items-center hover:underline">
                <ClipboardList className="w-4 h-4 mr-1.5" /> Open Full MAR
                History
              </button>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="px-8 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-900 transition-all"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <Pill className="w-7 h-7 mr-3 text-blue-600" /> eMAR
          </h1>
          <p className="text-slate-500 text-sm mt-1">Tuesday, 06 Jan 2026</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAuditOpen(true)}
            className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-all"
          >
            <History className="w-4 h-4 mr-2" /> Audit Trail
          </button>
          <button
            onClick={() => setIsCDLogOpen(true)}
            className="flex items-center px-4 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all"
          >
            Controlled Drug Log
          </button>
        </div>
      </div>

      {/* --- TOP FILTERS & SEARCH --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <div className="lg:col-span-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Resident or Drug..."
            className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="lg:col-span-3 flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
          {["All", "Due", "Given", "Missed", "PRN", "Critical"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                activeFilter === f
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* --- MAIN LIST --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Resident
                </th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Medication
                </th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Schedule
                </th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMeds.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200">
                        {item.room}
                      </div>
                      <p className="text-sm font-black text-slate-800">
                        {item.resident}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p
                      className={`text-sm font-bold ${
                        item.urgency === "Critical"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {item.med}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {item.dosage} • {item.route}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center text-xs font-bold text-slate-700 bg-slate-100 w-fit px-3 py-1.5 rounded-lg">
                      <Clock className="w-3.5 h-3.5 mr-2 text-slate-400" />{" "}
                      {item.time}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase flex items-center w-fit shadow-sm ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      <Activity className="w-3 h-3 mr-1.5" /> {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedMed(item);
                          setIsDetailsModalOpen(true);
                        }}
                        className="px-4 py-2 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-xl hover:bg-slate-200 transition-all"
                      >
                        Details
                      </button>
                      {item.status !== "Given" && (
                        <button
                          onClick={() => {
                            setSelectedMed(item);
                            setIsAdminModalOpen(true);
                          }}
                          className="px-5 py-2 bg-blue-600 text-white text-[11px] font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center"
                        >
                          Administer <ChevronRight className="w-3 h-3 ml-1" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- STATUS CHANGE CONFIRMATION --- */}
      {isAdminModalOpen && selectedMed && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[120] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-8 text-center animate-in zoom-in">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ClipboardCheck className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Record Administration
            </h3>
            <p className="text-sm text-slate-500 mb-8">
              Confirming dose for{" "}
              <span className="font-bold text-slate-800">
                {selectedMed.resident}
              </span>
            </p>
            <div className="grid gap-3">
              <button
                onClick={() => handleUpdateStatus(selectedMed.id, "Given")}
                className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-600 transition-all"
              >
                Dose Given
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedMed.id, "Missed")}
                className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all"
              >
                Refused / Missed
              </button>
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="w-full py-3 text-slate-400 font-bold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerEMARPage;
