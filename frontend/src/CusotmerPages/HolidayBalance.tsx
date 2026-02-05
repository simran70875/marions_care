import { 
  Palmtree, 
  Calendar, 
  TrendingUp, 
  History, 
  ArrowUpRight,
  Clock,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

const CustomerHolidayBalance = () => {
  const balances = [
    { 
      type: 'Annual Leave', 
      accrued: 28, 
      used: 15.5, 
      available: 12.5, 
      pending: 2, 
      color: 'text-green-600', 
      bg: 'bg-green-50', 
      progress: 55 
    },
    { 
      type: 'Sick Leave', 
      accrued: 10, 
      used: 2, 
      available: 8, 
      pending: 0, 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      progress: 20 
    },
    { 
      type: 'Public Holiday', 
      accrued: 8, 
      used: 5, 
      available: 3, 
      pending: 0, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      progress: 62 
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Holiday Balance</h1>
          <p className="text-slate-500 text-sm mt-1">Jan 01, 2026 - Dec 31, 2026 (Calendar Year)</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm">
            <History className="w-4 h-4 mr-2" /> View Policy
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-200">
            Apply Leave
          </button>
        </div>
      </div>

      {/* Primary Balance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {balances.map((b, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div className={`${b.bg} ${b.color} p-3 rounded-2xl`}>
                {b.type === 'Annual Leave' ? <Palmtree className="w-6 h-6" /> : b.type === 'Sick Leave' ? <TrendingUp className="w-6 h-6" /> : <Calendar className="w-6 h-6" />}
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Accrued</p>
                <p className="text-lg font-bold text-slate-800">{b.accrued} Days</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-3xl font-black text-slate-800 tracking-tight">{b.available}</p>
              <p className="text-xs font-bold text-slate-400 uppercase mt-1 tracking-wider">{b.type} Available</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-400">Used: {b.used}</span>
                <span className="text-slate-400">Pending: {b.pending}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${b.color.replace('text', 'bg')} rounded-full`} style={{ width: `${b.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Left: Detailed Breakdown (8 cols) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Leave Accrual History</h3>
              <div className="flex items-center text-xs text-blue-600 font-bold cursor-pointer hover:underline">
                How is this calculated? <HelpCircle className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
            <div className="p-0">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Month</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accrued</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { month: 'January 2026', added: '+2.33', type: 'Monthly Accrual', balance: '12.5' },
                    { month: 'December 2025', added: '+2.33', type: 'Monthly Accrual', balance: '10.17' },
                    { month: 'November 2025', added: '-4.00', type: 'Annual Leave Taken', balance: '7.84' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">{row.month}</td>
                      <td className={`px-6 py-4 text-sm font-bold ${row.added.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{row.added}</td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-medium">{row.type}</td>
                      <td className="px-6 py-4 text-sm font-black text-slate-800 text-right">{row.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Insights (4 cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Upcoming Holiday Card */}
          <div className="bg-indigo-900 rounded-3xl p-6 text-white shadow-xl">
             <div className="flex items-center justify-between mb-6">
               <div className="bg-white/20 p-2 rounded-xl">
                 <Clock className="w-5 h-5" />
               </div>
               <span className="text-[10px] font-bold uppercase bg-white/10 px-2 py-1 rounded">Next Approved</span>
             </div>
             <h4 className="text-xl font-bold">Jan 15 - Jan 18</h4>
             <p className="text-indigo-200 text-xs mt-1">4 Days • Annual Leave</p>
             <div className="mt-6 flex items-center text-xs font-bold text-indigo-100 bg-white/10 p-3 rounded-2xl border border-white/5">
                <AlertCircle className="w-4 h-4 mr-2" />
                Handover notes required by Jan 14.
             </div>
          </div>

          {/* Forecast Widget */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4">Leave Forecast</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Based on your accrual rate, by <strong>June 2026</strong> you will have:
            </p>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-sm font-bold text-slate-700">Estimated Balance</span>
               <div className="flex items-center text-green-600 font-black">
                  24.5 Days <ArrowUpRight className="w-4 h-4 ml-1" />
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerHolidayBalance;