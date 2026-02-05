import { 
  CalendarDays, 
  MapPin, 
  Users, 
  Clock, 
  ChevronRight, 
  Info,
  Moon,
  Sun,
  ArrowRightLeft,
  BellRing
} from 'lucide-react';

const CustomerUpcomingShifts = () => {
  const upcomingShifts = [
    {
      id: 1,
      date: 'Wed, Jan 07',
      time: '08:00 AM - 08:00 PM',
      duration: '12h',
      type: 'Day Shift',
      wing: 'North Wing (Dementia)',
      partner: 'James Wilson',
      status: 'Confirmed'
    },
    {
      id: 2,
      date: 'Thu, Jan 08',
      time: '08:00 AM - 08:00 PM',
      duration: '12h',
      type: 'Day Shift',
      wing: 'North Wing (Dementia)',
      partner: 'Sarah Thompson',
      status: 'Confirmed'
    },
    {
      id: 3,
      date: 'Sat, Jan 10',
      time: '08:00 PM - 08:00 AM',
      duration: '12h',
      type: 'Night Shift',
      wing: 'West Ward',
      partner: 'Aditya Gupta',
      status: 'Pending Acknowledge'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <CalendarDays className="w-7 h-7 mr-3 text-blue-600" />
            Upcoming Roster
          </h1>
          <p className="text-slate-500 text-sm mt-1">Your assigned schedule for the next 14 days.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            <ArrowRightLeft className="w-4 h-4 mr-2" /> Shift Swap
          </button>
          <button className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
            <BellRing className="w-4 h-4 mr-2" /> Set Reminders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Main Timeline (8 cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {upcomingShifts.map((shift) => (
            <div key={shift.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="flex flex-col md:flex-row">
                
                {/* Date/Time Block */}
                <div className={`p-6 md:w-48 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-slate-50 ${
                  shift.type === 'Night Shift' ? 'bg-slate-900 text-white' : 'bg-blue-50/50 text-blue-900'
                }`}>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">{shift.date.split(',')[0]}</p>
                  <p className="text-2xl font-black">{shift.date.split(',')[1]}</p>
                  <div className="mt-3 flex items-center text-[10px] font-bold px-2 py-1 rounded-full bg-white/20 border border-white/10">
                    {shift.type === 'Day Shift' ? <Sun className="w-3 h-3 mr-1" /> : <Moon className="w-3 h-3 mr-1" />}
                    {shift.type}
                  </div>
                </div>

                {/* Details Block */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                        <Clock className="w-3.5 h-3.5 mr-1.5" /> {shift.time} ({shift.duration})
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{shift.wing}</h3>
                    </div>
                    {shift.status === 'Pending Acknowledge' && (
                      <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full animate-pulse">
                        Action Required
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center space-x-3 text-sm text-slate-600">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <Users className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Shift Partner</p>
                        <p className="font-bold">{shift.partner}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-slate-600">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Location</p>
                        <p className="font-bold">Station 2, Level 1</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Side */}
                <div className="p-4 bg-slate-50/50 flex md:flex-col items-center justify-center gap-2">
                   <button className="w-full md:w-auto p-3 bg-white border border-slate-200 rounded-xl hover:bg-blue-600 hover:text-white transition-all group-hover:border-blue-200 shadow-sm">
                      <ChevronRight className="w-5 h-5" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar (4 cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Summary Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Schedule Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-sm text-slate-500 font-medium">Total Shifts</span>
                <span className="text-sm font-bold text-slate-800">08</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-sm text-slate-500 font-medium">Total Hours</span>
                <span className="text-sm font-bold text-slate-800">96.0 hrs</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-slate-500 font-medium">Rest Days</span>
                <span className="text-sm font-bold text-green-600">06 Days</span>
              </div>
            </div>
          </div>

          {/* Roster Policy Note */}
          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
             <h4 className="font-bold text-lg mb-2">Notice to Customers</h4>
             <p className="text-blue-100 text-xs leading-relaxed opacity-90">
               Please acknowledge your upcoming Night Shift on Jan 10. If you require a swap, please submit the request at least 48 hours in advance.
             </p>
             <button className="mt-4 w-full py-2.5 bg-white text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all">
                Acknowledge All Shifts
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerUpcomingShifts;