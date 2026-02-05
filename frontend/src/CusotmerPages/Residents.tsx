import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  MapPin,
  Activity,
  Clock,
  ChevronRight,
  AlertCircle,
  Stethoscope,
  ArrowUpDown,
  Download,
  X,
  Edit3,
  Trash2Icon,
} from "lucide-react";
import { useNavigate } from "react-router";

// --- TYPES ---
interface Resident {
  id: string;
  name: string;
  age: number;
  room: string;
  level: "High Care" | "Medium" | "Low Care";
  status: "Stable" | "Observation" | "Critical";
  lastCheck: string;
  vitals: string;
  mood: string;
  wing?: string;
  assigned?: boolean;
}

const CustomerResidentDirectory: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Residents");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // --- MOCK DATA ---
  const [residents, setResidents] = useState<Resident[]>([
    {
      id: "RES001",
      name: "Arthur Morgan",
      age: 78,
      room: "204-A",
      level: "High Care",
      status: "Stable",
      lastCheck: "12 mins ago",
      vitals: "120/80",
      mood: "Happy",
      wing: "Wing A",
      assigned: true,
    },
    {
      id: "RES002",
      name: "Martha Stewart",
      age: 82,
      room: "102-B",
      level: "Medium",
      status: "Observation",
      lastCheck: "45 mins ago",
      vitals: "135/90",
      mood: "Quiet",
      wing: "Wing B",
      assigned: false,
    },
    {
      id: "RES003",
      name: "John Marston",
      age: 74,
      room: "205-A",
      level: "Low Care",
      status: "Stable",
      lastCheck: "2 hours ago",
      vitals: "118/75",
      mood: "Active",
      wing: "Wing A",
      assigned: true,
    },
    {
      id: "RES004",
      name: "Alice Cooper",
      age: 85,
      room: "110-C",
      level: "High Care",
      status: "Critical",
      lastCheck: "5 mins ago",
      vitals: "145/95",
      mood: "Distressed",
      wing: "Wing C",
      assigned: true,
    },
    {
      id: "RES005",
      name: "Robert De Niro",
      age: 80,
      room: "201-B",
      level: "Medium",
      status: "Stable",
      lastCheck: "1 hour ago",
      vitals: "122/82",
      mood: "Sleeping",
      wing: "Wing A",
      assigned: false,
    },
  ]);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    room: "",
    wing: "Wing A",
    level: "Medium" as Resident["level"],
  });
  // --- HANDLERS ---
  const openAddModal = () => {
    setEditingResident(null);
    setFormData({
      name: "",
      age: "",
      room: "",
      wing: "Wing A",
      level: "Medium",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (resident: Resident) => {
    setEditingResident(resident);
    setFormData({
      name: resident.name,
      age: resident.age.toString(),
      room: resident.room,
      wing: resident.wing || "",
      level: resident.level,
    });
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.room) return;

    if (editingResident) {
      setResidents(
        residents.map((r) =>
          r.id === editingResident.id
            ? {
                ...r,
                ...formData,
                age: parseInt(formData.age) || r.age,
              }
            : r
        )
      );
    } else {
      const newEntry: Resident = {
        id: `RES${Math.floor(100 + Math.random() * 900)}`,
        ...formData,
        age: parseInt(formData.age) || 0,
        status: "Stable",
        lastCheck: "Just now",
        vitals: "N/A",
        mood: "N/A",
      };
      setResidents([newEntry, ...residents]);
    }
    setIsModalOpen(false);
  };

  const deleteResident = (id: string) => {
    if (window.confirm("Are you sure you want to delete this resident?")) {
      setResidents(residents.filter((r) => r.id !== id));
      setOpenMenuId(null);
    }
  };

  const updateStatus = (id: string, newStatus: Resident["status"]) => {
    setResidents(
      residents.map((r) =>
        r.id === id ? { ...r, status: newStatus, lastCheck: "Just now" } : r
      )
    );
    setOpenMenuId(null);
  };

  // --- FILTER LOGIC ---
  const filteredResidents = useMemo(() => {
    return residents.filter((res) => {
      const matchesSearch =
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.room.toLowerCase().includes(searchTerm.toLowerCase());
      if (activeTab === "My Assigned") return matchesSearch && res.assigned;
      if (activeTab === "High Risk")
        return matchesSearch && res.status === "Critical";
      if (activeTab === "Wing A") return matchesSearch && res.wing === "Wing A";
      return matchesSearch;
    });
  }, [residents, searchTerm, activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Stable":
        return "bg-green-100 text-green-700 border-green-200";
      case "Observation":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "High Care":
        return "text-purple-600 bg-purple-50";
      case "Medium":
        return "text-blue-600 bg-blue-50";
      case "Low Care":
        return "text-slate-600 bg-slate-100";
      default:
        return "text-slate-600 bg-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-999999 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                {editingResident ? "Edit Resident" : "Register Resident"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Room Number
                </label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) =>
                    setFormData({ ...formData, room: e.target.value })
                  }
                  className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. 204-A"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Care Level
                </label>
                <select
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      level: e.target.value as Resident["level"],
                    })
                  }
                  className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Low Care">Low Care</option>
                  <option value="Medium">Medium</option>
                  <option value="High Care">High Care</option>
                </select>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors"
              >
                {editingResident ? "Save Changes" : "Create Record"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Resident Directory
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage and monitor resident health and care plans.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <UserPlus className="w-4 h-4 mr-2" /> Add Resident
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Filters & Search */}
        <div className="p-5 border-b border-slate-50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex space-x-1 bg-slate-50 p-1 rounded-xl">
              {["All Residents", "My Assigned", "High Risk", "Wing A"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      activeTab === tab
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search resident or room..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
                />
              </div>
              <button className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 hover:bg-slate-100 transition-all">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer hover:text-slate-600">
                    Resident <ArrowUpDown className="w-3 h-3 ml-1" />
                  </div>
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Care Level
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Last Check
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredResidents.map((resident) => (
                <tr
                  key={resident.id}
                  className="hover:bg-blue-50/20 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs border-2 border-white shadow-sm">
                        {resident.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {resident.name}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {resident.age} yrs • {resident.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-semibold text-slate-700">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />{" "}
                      {resident.room}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${getLevelColor(
                        resident.level
                      )}`}
                    >
                      {resident.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[11px] font-bold ${getStatusColor(
                        resident.status
                      )}`}
                    >
                      <Activity className="w-3 h-3 mr-1.5" /> {resident.status}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs font-medium text-slate-500">
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-300" />{" "}
                      {resident.lastCheck}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === resident.id ? null : resident.id
                          )
                        }
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* --- DROPDOWN MENU --- */}
                      {openMenuId === resident.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-[100] py-2 animate-in fade-in slide-in-from-top-2">
                          <button
                            onClick={() => openEditModal(resident)}
                            className="w-full flex items-center px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                          >
                            <Edit3 className="w-3.5 h-3.5 mr-2" /> Edit Profile
                          </button>
                          <div className="h-px bg-slate-50 my-1" />
                          <div className="px-4 py-1 text-[10px] uppercase text-slate-400 font-bold">
                            Set Status
                          </div>
                          <button
                            onClick={() => updateStatus(resident.id, "Stable")}
                            className="w-full flex items-center px-4 py-2 text-xs font-bold text-green-600 hover:bg-green-50"
                          >
                            Stable
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(resident.id, "Observation")
                            }
                            className="w-full flex items-center px-4 py-2 text-xs font-bold text-orange-600 hover:bg-orange-50"
                          >
                            Observation
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(resident.id, "Critical")
                            }
                            className="w-full flex items-center px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                          >
                            Critical
                          </button>
                          <div className="h-px bg-slate-50 my-1" />
                          <button
                            onClick={() => deleteResident(resident.id)}
                            className="w-full flex items-center px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
                          >
                            <Trash2Icon className="w-3.5 h-3.5 mr-2" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredResidents.length === 0 && (
            <div className="p-10 text-center text-slate-400 text-sm">
              No residents found matching your criteria.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-50">
          <p className="text-xs font-medium text-slate-500">
            Showing {filteredResidents.length} of {residents.length} residents
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-start space-x-4">
          <div className="p-3 bg-red-50 rounded-xl">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-800">
              {residents
                .filter((r) => r.status === "Critical")
                .length.toString()
                .padStart(2, "0")}
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Immediate Attention
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-start space-x-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Stethoscope className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-800">14</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pending Vital Checks
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            navigate("/customer/residents/reports/summary");
          }}
          className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-blue-200"
        >
          <div>
            <p className="text-sm font-bold text-slate-800">
              View All Care Plans
            </p>
            <p className="text-xs text-slate-400">Review weekly updates</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-all" />
        </div>
      </div>
    </div>
  );
};

export default CustomerResidentDirectory;
