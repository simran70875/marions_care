import { useState, useRef } from "react";
import {
  MessageSquarePlus,
  Clock,
  Stethoscope,
  AlertCircle,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Paperclip,
  Send,
  X,
  Check,
  CornerDownRight,
} from "lucide-react";

const HandoverNotes = () => {
  const [activeWing, setActiveWing] = useState("All Wings");
  const [noteText, setNoteText] = useState("");
  const [selectedResident, setSelectedResident] = useState("");
  const [isTagging, setIsTagging] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [notes, setNotes] = useState([
    {
      id: 1,
      resident: "Arthur Morgan",
      carer: "Sarah Thompson",
      time: "10m ago",
      category: "Mobility",
      urgency: "High",
      wing: "North Wing",
      text: "Arthur was quite unsteady during the morning walk. Recommended using the hoist for bed transfers until the physio reviews him tomorrow.",
      acknowledged: false,
      replies: [
        {
          id: 101,
          user: "James Wilson",
          text: "Physio is booked for 9 AM tomorrow.",
          time: "5m ago",
        },
      ],
    },
    {
      id: 2,
      resident: "Alice Cooper",
      carer: "James Wilson",
      time: "1h ago",
      category: "Medication",
      urgency: "Medium",
      wing: "West Ward",
      text: "Refused afternoon liquids. Administered meds with thickened fluids as per GP instruction.",
      acknowledged: true,
      replies: [],
    },
  ]);

  const [tasks, setTasks] = useState([
    { task: "Fluid Charts Updated", done: true },
    { task: "MAR Charts Signed", done: true },
    { task: "Incident Reports Logged", done: false },
    { task: "Personal Care Logs", done: true },
  ]);

  const handlePostNote = () => {
    if (!noteText.trim()) return;
    const newNote = {
      id: Date.now(),
      resident: selectedResident || "General Update",
      carer: "You",
      time: "Just now",
      category: "Update",
      urgency: "Medium",
      wing: activeWing === "All Wings" ? "North Wing" : activeWing,
      text: noteText,
      acknowledged: false,
      replies: [],
    };
    setNotes([newNote, ...notes]);
    setNoteText("");
    setSelectedResident("");
  };

  const handlePostReply = (noteId: number) => {
    if (!replyText.trim()) return;
    const newReply = {
      id: Date.now(),
      user: "You",
      text: replyText,
      time: "Just now",
    };
    setNotes(
      notes.map((n) =>
        n.id === noteId ? { ...n, replies: [...n.replies, newReply] } : n
      )
    );
    setReplyText("");
    setReplyingTo(null);
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const acknowledgeNote = (id: number) => {
    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, acknowledged: !n.acknowledged } : n
      )
    );
  };

  const filteredNotes =
    activeWing === "All Wings"
      ? notes
      : notes.filter((n) => n.wing === activeWing);

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <MessageSquarePlus className="w-7 h-7 mr-3 text-blue-600" />
            Shift Handover Notes
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Daily clinical summaries for the incoming team.
          </p>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
          Record Voice Note
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Feed Area */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Create Note Input */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                ME
              </div>
              <div className="flex-1">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 min-h-[100px] transition-all"
                  placeholder="Share a clinical update..."
                ></textarea>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsTagging(!isTagging)}
                      className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-all flex items-center text-[11px] font-bold"
                    >
                      <Tag className="w-4 h-4 mr-1 text-blue-500" />{" "}
                      {selectedResident || "Tag Resident"}
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-all flex items-center text-[11px] font-bold"
                    >
                      <Paperclip className="w-4 h-4 mr-1 text-purple-500" />{" "}
                      Attach File
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" />
                  </div>
                  <button
                    onClick={handlePostNote}
                    className="px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center shadow-lg shadow-slate-200"
                  >
                    Post Note <Send className="w-3 h-3 ml-2" />
                  </button>
                </div>

                {isTagging && (
                  <div className="mt-3 flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    {["Arthur Morgan", "Alice Cooper", "John Doe"].map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          setSelectedResident(r);
                          setIsTagging(false);
                        }}
                        className="text-[10px] font-bold px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:border-blue-500"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feed Filters */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-2">
            {["All Wings", "North Wing", "West Ward", "Emergency Updates"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveWing(tab)}
                  className={`px-4 py-2 whitespace-nowrap text-xs font-bold rounded-xl transition-all ${
                    activeWing === tab
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:bg-white/50"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Notes List */}
          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:border-blue-100 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {note.carer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {note.carer}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium flex items-center italic">
                        <Clock className="w-3 h-3 mr-1" /> {note.time} •{" "}
                        {note.wing}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {note.acknowledged && (
                      <span className="flex items-center text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-lg border border-green-100">
                        <Check className="w-3 h-3 mr-1" /> Acknowledged
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                        note.urgency === "High"
                          ? "bg-red-50 text-red-600 border-red-100"
                          : "bg-slate-50 text-slate-500 border-slate-100"
                      }`}
                    >
                      {note.urgency}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Stethoscope className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">
                      Regarding: {note.resident}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {note.text}
                  </p>
                </div>

                {/* Reply Hierarchy View */}
                {note.replies.length > 0 && (
                  <div className="mt-4 ml-6 pl-4 border-l-2 border-slate-100 space-y-4">
                    {note.replies.map((reply) => (
                      <div key={reply.id}>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-bold text-slate-800">
                            {reply.user}
                          </span>
                          <span className="text-[9px] text-slate-400">
                            {reply.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl inline-block border border-slate-100">
                          {reply.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline Reply Input */}
                {replyingTo === note.id && (
                  <div className="mt-4 ml-6 flex items-start space-x-3 animate-in fade-in slide-in-from-top-1">
                    <CornerDownRight className="w-4 h-4 text-slate-300 mt-2" />
                    <div className="flex-1 flex space-x-2">
                      <input
                        autoFocus
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs outline-none focus:border-blue-500"
                        onKeyDown={(e) =>
                          e.key === "Enter" && handlePostReply(note.id)
                        }
                      />
                      <button
                        onClick={() => handlePostReply(note.id)}
                        className="p-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText("");
                        }}
                        className="p-2 bg-slate-100 text-slate-400 rounded-xl"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-50">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setReplyingTo(note.id)}
                      className={`text-[11px] font-bold transition-all ${
                        replyingTo === note.id
                          ? "text-blue-600 underline"
                          : "text-slate-400 hover:text-blue-600"
                      }`}
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => acknowledgeNote(note.id)}
                      className={`text-[11px] font-bold transition-all ${
                        note.acknowledged
                          ? "text-green-600"
                          : "text-slate-400 hover:text-green-600"
                      }`}
                    >
                      {note.acknowledged
                        ? "Acknowledge Received"
                        : "Acknowledge"}
                    </button>
                  </div>
                  <button className="text-slate-300 hover:text-slate-600 font-bold text-xs flex items-center">
                    History <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Tasks */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
              End of Shift Tasks
            </h3>
            <div className="space-y-4">
              {tasks.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => toggleTask(idx)}
                >
                  <span
                    className={`text-sm font-medium transition-all ${
                      item.done
                        ? "text-slate-300 line-through decoration-slate-400"
                        : "text-slate-700"
                    }`}
                  >
                    {item.task}
                  </span>
                  {item.done ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-50" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-blue-400 transition-colors" />
                  )}
                </div>
              ))}
            </div>
            <button
              className={`w-full mt-6 py-3 text-white text-xs font-bold rounded-xl shadow-lg transition-all ${
                tasks.every((t) => t.done)
                  ? "bg-green-600 shadow-green-100"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              Sign Off Handover
            </button>
          </div>

          {/* Critical Alerts Widget */}
          <div className="bg-red-600 rounded-3xl p-6 text-white shadow-xl shadow-red-100">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h4 className="font-bold">Active Concerns</h4>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <p className="text-[10px] font-bold uppercase opacity-70">
                  Room 102
                </p>
                <p className="text-xs font-bold mt-1">
                  High Temp (38.5°C) recorded at 11:00 AM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandoverNotes;
