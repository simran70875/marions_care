import React, { useState } from "react";
import {
  Stethoscope,
  Plus,
  Search,
  MoreHorizontal,
  Heart,
  MessageSquare,
  User,
  Clock,
  ClipboardList,
  CheckCircle2,
  X,
  AlertCircle,
  LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router";

// --- TYPES & INTERFACES ---
interface Comment {
  user: string;
  text: string;
  timestamp: string;
}

interface CareLog {
  id: number;
  carer: string;
  resident: string;
  type: string;
  time: string;
  note: string;
  tags: string[];
  icon: LucideIcon;
  color: string;
  bg: string;
  acknowledged: boolean;
  comments: Comment[];
}

type TaskStatus = "Pending" | "In Progress" | "Completed";
type Urgency = "High" | "Medium" | "Scheduled";

interface PendingTask {
  id: number;
  task: string;
  due: string;
  urgency: Urgency;
  status: TaskStatus;
}

const CareLogsPage: React.FC = () => {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [selectedResident, setSelectedResident] =
    useState<string>("All Residents");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<number | null>(
    null
  );
  const [activeTask, setActiveTask] = useState<PendingTask | null>(null);

  const [newNoteText, setNewNoteText] = useState<string>("");
  const [newCommentText, setNewCommentText] = useState<string>("");

  const [logs, setLogs] = useState<CareLog[]>([
    {
      id: 1,
      carer: "Sarah Thompson",
      resident: "Arthur Morgan",
      type: "Clinical",
      time: "10:15 AM",
      note: "Administered morning medication. Blood pressure slightly elevated at 145/90. Scheduled a re-check for 12:00 PM.",
      tags: ["Medication", "Vitals"],
      icon: Stethoscope,
      color: "text-blue-600",
      bg: "bg-blue-50",
      acknowledged: false,
      comments: [],
    },
    {
      id: 2,
      carer: "James Wilson",
      resident: "Alice Cooper",
      type: "Well-being",
      time: "09:30 AM",
      note: "Alice participated in the morning garden walk. She was highly engaged and expressed joy during the activity.",
      tags: ["Mobility", "Social"],
      icon: Heart,
      color: "text-pink-600",
      bg: "bg-pink-50",
      acknowledged: true,
      comments: [
        {
          user: "Sarah T.",
          text: "Great to hear she enjoyed the garden!",
          timestamp: "09:45 AM",
        },
      ],
    },
  ]);

  const [pendingActions, setPendingActions] = useState<PendingTask[]>([
    {
      id: 101,
      task: "Re-check Temp: Arthur",
      due: "12:00 PM",
      urgency: "High",
      status: "Pending",
    },
    {
      id: 102,
      task: "Position Turn: Mrs. Gable",
      due: "12:30 PM",
      urgency: "Medium",
      status: "In Progress",
    },
    {
      id: 103,
      task: "Wound Dressing: John",
      due: "01:00 PM",
      urgency: "Scheduled",
      status: "Pending",
    },
  ]);

  // --- HANDLERS ---
  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const newLog: CareLog = {
      id: Date.now(),
      carer: "Current Carer",
      resident:
        selectedResident === "All Residents"
          ? "Arthur Morgan"
          : selectedResident,
      type: "General",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      note: newNoteText,
      tags: ["Daily Log"],
      icon: ClipboardList,
      color: "text-slate-600",
      bg: "bg-slate-50",
      acknowledged: false,
      comments: [],
    };
    setLogs([newLog, ...logs]);
    setNewNoteText("");
    setIsNoteModalOpen(false);
  };

  const handleAddComment = () => {
    if (!newCommentText.trim() || isCommentModalOpen === null) return;
    setLogs(
      logs.map((log) =>
        log.id === isCommentModalOpen
          ? {
              ...log,
              comments: [
                ...log.comments,
                {
                  user: "Me",
                  text: newCommentText,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            }
          : log
      )
    );
    setNewCommentText("");
    setIsCommentModalOpen(null);
  };

  const handleUpdateTaskStatus = (id: number, newStatus: TaskStatus) => {
    if (newStatus === "Completed") {
      setPendingActions(pendingActions.filter((a) => a.id !== id));
    } else {
      setPendingActions(
        pendingActions.map((a) =>
          a.id === id ? { ...a, status: newStatus } : a
        )
      );
    }
    setActiveTask(null);
  };

  const handleAcknowledge = (id: number) => {
    setLogs(
      logs.map((log) =>
        log.id === id ? { ...log, acknowledged: !log.acknowledged } : log
      )
    );
  };

  const getStatusStyle = (status: TaskStatus) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesResident =
      selectedResident === "All Residents" || log.resident === selectedResident;
    const matchesSearch = log.note
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesResident && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      {/* --- MODAL: NEW NOTE --- */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transition-all">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">
                New Observation
              </h3>
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="p-2 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-6">
              <textarea
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 ring-blue-500/20 h-40 text-sm"
                placeholder="Write care note here..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
              />
            </div>
            <div className="p-6 bg-slate-50 flex justify-end space-x-3">
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="px-5 py-2 text-sm font-bold text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200"
              >
                Post Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: COMMENTS --- */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">Add Comment</h3>
              <button onClick={() => setIsCommentModalOpen(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-6">
              <textarea
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none text-sm h-24"
                placeholder="Add clinical context or feedback..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
            </div>
            <div className="p-6 flex justify-end">
              <button
                onClick={handleAddComment}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200"
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: TASK ACTION --- */}
      {activeTask && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-8 text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                  activeTask.urgency === "High"
                    ? "bg-red-50 text-red-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {activeTask.urgency === "High" ? (
                  <AlertCircle className="w-8 h-8" />
                ) : (
                  <Clock className="w-8 h-8" />
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                {activeTask.task}
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Due by {activeTask.due}
              </p>
              <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 uppercase tracking-tighter">
                Current Status: {activeTask.status}
              </div>
            </div>
            <div className="p-6 bg-slate-50 grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  handleUpdateTaskStatus(activeTask.id, "Completed")
                }
                className="col-span-2 py-3 bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-100"
              >
                Complete Task
              </button>
              <button
                onClick={() =>
                  handleUpdateTaskStatus(activeTask.id, "In Progress")
                }
                className="py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600"
              >
                Mark Active
              </button>
              <button
                onClick={() => setActiveTask(null)}
                className="py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Care Logs & Observations
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time clinical notes and daily living logs.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center shadow-sm">
            <User className="w-4 h-4 text-slate-400 mr-2" />
            <select
              className="text-sm font-semibold text-slate-600 outline-none bg-transparent"
              value={selectedResident}
              onChange={(e) => setSelectedResident(e.target.value)}
            >
              <option>All Residents</option>
              <option>Arthur Morgan</option>
              <option>Alice Cooper</option>
              <option>Martha Stewart</option>
            </select>
          </div>
          <button
            onClick={() => setIsNoteModalOpen(true)}
            className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" /> New Note
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Search */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 flex items-center">
            <div className="flex flex-1 items-center px-4">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                type="text"
                placeholder="Search notes or residents..."
                className="w-full bg-transparent outline-none text-sm text-slate-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Timeline Feed */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">
              Today's Logs
            </h3>
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`${log.bg} ${log.color} p-2.5 rounded-xl`}
                      >
                        <log.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-slate-800">
                            {log.resident}
                          </h4>
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">
                            {log.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">
                          Logged by {log.carer} • {log.time}
                        </p>
                      </div>
                    </div>
                    {log.acknowledged && (
                      <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-1.5" />
                        <span className="text-[10px] font-bold text-green-600 uppercase">
                          Seen
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4 pl-1">
                    {log.note}
                  </p>

                  {/* Comment Hierarchy Display */}
                  {log.comments.length > 0 && (
                    <div className="mb-4 ml-6 space-y-3 relative">
                      <div className="absolute -left-3 top-0 bottom-2 w-[2px] bg-slate-100 rounded-full" />
                      {log.comments.map((c, i) => (
                        <div key={i} className="relative pl-3">
                          <div className="absolute -left-[14px] top-4 w-3.5 h-[2px] bg-slate-100" />
                          <div className="bg-slate-50/80 p-3 rounded-2xl">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[11px] font-bold text-slate-700">
                                {c.user}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {c.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {c.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex space-x-2">
                      {log.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold text-blue-600 bg-blue-50/50 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setIsCommentModalOpen(log.id)}
                        className="flex items-center text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-1.5" />{" "}
                        {log.comments.length} Comments
                      </button>
                      <button
                        onClick={() => handleAcknowledge(log.id)}
                        className={`flex items-center text-xs font-bold transition-colors ${
                          log.acknowledged
                            ? "text-red-500"
                            : "text-slate-400 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 mr-1.5 ${
                            log.acknowledged ? "fill-current" : ""
                          }`}
                        />{" "}
                        {log.acknowledged ? "Acknowledged" : "Acknowledge"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center text-sm uppercase tracking-wider">
              <ClipboardList className="w-5 h-5 mr-2 text-blue-600" /> Handover
              Flags
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100/50">
                <span className="text-[10px] font-bold text-red-600 uppercase block mb-1">
                  Clinical Alert
                </span>
                <p className="text-sm text-red-900 font-medium leading-relaxed">
                  Room 204: Mobility restricted following recent fall
                  assessment.
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                <span className="text-[10px] font-bold text-amber-600 uppercase block mb-1">
                  Nutrition
                </span>
                <p className="text-sm text-amber-900 font-medium leading-relaxed">
                  Room 102: Refused fluids during evening rounds twice today.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Pending Actions</h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                {pendingActions.length}
              </span>
            </div>
            <div className="p-5 space-y-4">
              {pendingActions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between group cursor-pointer"
                  onClick={() => setActiveTask(item)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.urgency === "High" ? "bg-red-500" : "bg-blue-400"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                        {item.task}
                      </p>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <p className="text-[10px] text-slate-400 flex items-center font-medium">
                          <Clock className="w-3 h-3 mr-1" /> {item.due}
                        </p>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
              {pendingActions.length === 0 && (
                <div className="text-center py-4">
                  <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-xs text-slate-400 font-bold">
                    Shift Checklist Clear!
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                navigate("/carer/me/hours/timesheets");
              }}
              className="w-full py-3 bg-slate-50 text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors border-t border-slate-100"
            >
              VIEW FULL SCHEDULE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareLogsPage;
