import { useState, useMemo } from 'react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, 
  isSameDay, isToday, startOfToday, parseISO
} from 'date-fns';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Star, Clock, ExternalLink, X, Plus
} from 'lucide-react';

const HolidayCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 1. Updated State with Status
  const [appliedLeaves, setAppliedLeaves] = useState([
    { 
      start: new Date(2026, 0, 5), 
      end: new Date(2026, 0, 7), 
      type: 'Casual Leave', 
      reason: 'Family function',
      status: 'Approved' // Shows Green
    },
    { 
      start: new Date(2026, 0, 15), 
      end: new Date(2026, 0, 15), 
      type: 'Sick Leave', 
      reason: 'Doctor Appointment',
      status: 'Pending' // Shows Red
    }
  ]);

  const [formData, setFormData] = useState({
    type: 'Casual Leave',
    from: format(startOfToday(), 'yyyy-MM-dd'),
    to: format(startOfToday(), 'yyyy-MM-dd'),
    reason: ''
  });

  const holidays = [
    { date: new Date(2026, 0, 1), name: "New Year's Day", day: 'Thu', type: 'Public Holiday', status: 'Pay Rate: 2.0x', color: 'blue' },
    { date: new Date(2026, 0, 26), name: "Australia Day", day: 'Mon', type: 'Public Holiday', status: 'Pay Rate: 2.0x', color: 'blue' },
    { date: new Date(2026, 0, 14), name: 'Annual Staff Gala', day: 'Wed', type: 'Company Event', status: 'Evening Shift Only', color: 'purple' },
  ];

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    return eachDayOfInterval({ 
        start: startOfWeek(monthStart), 
        end: endOfWeek(endOfMonth(monthStart)) 
    });
  }, [currentDate]);

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeave = {
      start: parseISO(formData.from),
      end: parseISO(formData.to),
      type: formData.type,
      reason: formData.reason,
      status: 'Pending' // Default to pending (Red)
    };
    setAppliedLeaves([...appliedLeaves, newLeave]);
    setIsModalOpen(false);
    setFormData({ ...formData, reason: '' });
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 text-left">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <CalendarIcon className="w-7 h-7 mr-3 text-blue-600" />
            Holiday Calendar {format(currentDate, 'yyyy')}
          </h1>
          <p className="text-slate-500 text-sm mt-1">Green indicates approved leave, Red indicates pending approval.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center px-5 py-2.5 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
            <Plus className="w-4 h-4 mr-2" /> Apply for Leave
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Calendar Grid */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden text-left">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-bold text-slate-800 w-40">{format(currentDate, 'MMMM yyyy')}</h2>
                <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                  <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1 hover:bg-slate-50 rounded-md transition-colors"><ChevronLeft className="w-4 h-4 text-slate-400" /></button>
                  <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1 hover:bg-slate-50 rounded-md transition-colors"><ChevronRight className="w-4 h-4 text-slate-400" /></button>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2" /> Approved
                </div>
                <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2" /> Pending
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-7 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest pb-4">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, idx) => {
                  const holiday = holidays.find(h => isSameDay(h.date, day));
                  const leave = appliedLeaves.find(l => day >= l.start && day <= l.end);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  
                  // Determine Leave Color
                  const isApproved = leave?.status === 'Approved';

                  return (
                    <div key={idx} className={`min-h-[110px] p-3 rounded-2xl border transition-all relative ${
                      !isCurrentMonth ? 'opacity-20 bg-slate-50' : 
                      holiday ? 'bg-blue-50 border-blue-100' : 
                      leave ? (isApproved ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100') : 
                      'bg-white border-slate-50'
                    } ${isToday(day) ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
                      <span className={`text-xs font-bold ${
                        holiday ? 'text-blue-600' : 
                        leave ? (isApproved ? 'text-green-600' : 'text-red-600') : 
                        'text-slate-400'
                      }`}>
                        {format(day, 'd')}
                      </span>
                      {holiday && <div className="mt-2 text-[9px] font-black text-blue-700 leading-tight uppercase">{holiday.name}</div>}
                      {leave && (
                        <div className="mt-2">
                          <div className={`text-[9px] font-black leading-tight uppercase ${isApproved ? 'text-green-700' : 'text-red-700'}`}>
                            {leave.type}
                          </div>
                          <div className={`text-[8px] font-medium truncate ${isApproved ? 'text-green-600' : 'text-red-600'}`}>
                            {leave.reason}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Highlights */}
        <div className="col-span-12 lg:col-span-4 space-y-6 text-left">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Month Highlights</h3>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">
                {holidays.filter(h => isSameMonth(h.date, currentDate)).length} Events
              </span>
            </div>
            <div className="p-0">
              {holidays.filter(h => isSameMonth(h.date, currentDate)).map((h, i) => (
                <div key={i} className="p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-all flex items-start space-x-4">
                  <div className="flex flex-col items-center justify-center min-w-[48px] h-12 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">{h.day}</span>
                    <span className="text-lg font-black text-slate-800 leading-none">{format(h.date, 'dd')}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800">{h.name}</h4>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">{h.type}</p>
                    <div className="mt-2 inline-flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3 mr-1" /> {h.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-900 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
             <div className="flex items-center space-x-3 mb-4">
               <div className="bg-white/20 p-2 rounded-xl"><Star className="w-5 h-5" /></div>
               <h3 className="font-bold">Pay & Rota Policy</h3>
             </div>
             <p className="text-indigo-200 text-xs leading-relaxed opacity-90 mb-4">Working on a Public Holiday triggers **Double Time (2.0x)** pay.</p>
             <button className="w-full py-3 bg-white text-indigo-900 rounded-xl text-xs font-bold flex items-center justify-center">
               Read Detailed Policy <ExternalLink className="w-3 h-3 ml-2" />
             </button>
          </div>
        </div>
      </div>

      {/* --- LEAVE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Apply for Leave</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <form onSubmit={handleApplyLeave} className="space-y-5">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Leave Type</label>
                  <select className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-semibold outline-none" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option>Casual Leave</option><option>Sick Leave</option><option>Personal Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">From</label>
                    <input 
                      type="date" 
                      min={format(startOfToday(), 'yyyy-MM-dd')}
                      className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-semibold outline-none cursor-pointer"
                      value={formData.from}
                      onChange={(e) => setFormData({...formData, from: e.target.value})}
                      onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">To</label>
                    <input 
                      type="date" 
                      min={formData.from}
                      className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-semibold outline-none cursor-pointer"
                      value={formData.to}
                      onChange={(e) => setFormData({...formData, to: e.target.value})}
                      onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Reason</label>
                  <textarea placeholder="Enter details..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium outline-none min-h-[100px]" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} required />
                </div>

                <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                  Confirm Application
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayCalendar;