import { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Settings, 
  AlertCircle, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Filter, 
  Circle,
  Clock,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

const NotificationsScreen = () => {
  const [activeTab, setActiveTab] = useState('All');

  const notifications = [
    {
      id: 1,
      type: 'Urgent',
      title: 'Incident Follow-up Required',
      desc: 'The investigation for INC-8994 (Alice Cooper) requires your statement by end of shift.',
      time: '10m ago',
      isRead: false,
      category: 'Clinical'
    },
    {
      id: 2,
      type: 'Roster',
      title: 'Shift Swap Approved',
      desc: 'Your request to swap the Night Shift on Jan 10 with James Wilson has been approved.',
      time: '1h ago',
      isRead: false,
      category: 'Attendance'
    },
    {
      id: 3,
      type: 'System',
      title: 'Mandatory Training Overdue',
      desc: 'Fire Safety Awareness Level 2 needs to be completed within the next 3 days.',
      time: '4h ago',
      isRead: true,
      category: 'Compliance'
    },
    {
      id: 4,
      type: 'Message',
      title: 'New Handover Note',
      desc: 'Sarah Thompson left a specific note regarding Arthur Morgan’s mobility for your next shift.',
      time: 'Yesterday',
      isRead: true,
      category: 'Clinical'
    }
  ];

  const getIcon = (type:string) => {
    switch (type) {
      case 'Urgent': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'Roster': return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'Message': return <MessageSquare className="w-5 h-5 text-purple-500" />;
      default: return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <Bell className="w-7 h-7 mr-3 text-blue-600" />
            Notifications
          </h1>
          <p className="text-slate-500 text-sm mt-1">Stay updated with clinical alerts and schedule changes.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            <CheckCheck className="w-4 h-4 mr-2" /> Mark all as read
          </button>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 shadow-sm">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Sidebar Filters (3 cols) */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2 mb-4">Filter by Type</h3>
          {['All', 'Clinical', 'Attendance', 'Compliance', 'Messages'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-100'
              }`}
            >
              {tab}
              {tab === 'All' && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full">2 New</span>}
            </button>
          ))}
        </div>

        {/* Notification List (9 cols) */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          
          {/* List Header */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
              <Filter className="w-4 h-4" />
              <span>Showing {activeTab} Notifications</span>
            </div>
            <div className="flex items-center text-[11px] font-bold text-slate-400 space-x-4">
               <span className="flex items-center"><Circle className="w-2 h-2 fill-blue-500 text-blue-500 mr-1" /> Unread</span>
               <span className="flex items-center"><Circle className="w-2 h-2 text-slate-200 mr-1" /> Read</span>
            </div>
          </div>

          {/* Notifications Loop */}
          <div className="space-y-3">
            {notifications.map((n) => (
              <div 
                key={n.id} 
                className={`group relative bg-white p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                  n.isRead ? 'border-slate-100' : 'border-blue-200 bg-blue-50/10'
                }`}
              >
                {!n.isRead && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-blue-600 rounded-r-full" />
                )}
                
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${n.isRead ? 'bg-slate-50' : 'bg-white shadow-sm'}`}>
                    {getIcon(n.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-bold truncate ${n.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                        {n.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center whitespace-nowrap ml-4">
                        <Clock className="w-3 h-3 mr-1" /> {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                      {n.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-50 rounded">
                        {n.category}
                      </span>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="text-[11px] font-bold text-blue-600 hover:underline">View Details</button>
                         <ChevronRight className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-1 text-slate-300 hover:text-slate-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <button className="w-full py-4 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
            Load Older Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsScreen;