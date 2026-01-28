import { 
  Award, 
  ShieldCheck, 
  FileText, 
  GraduationCap, 
  Phone, 
  Mail, 
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MoreHorizontal
} from 'lucide-react';

const CarerProfileScreen = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      
      {/* Profile Banner Section (Keka Style adapted for Light Theme) */}
      <div className="relative rounded-2xl overflow-hidden mb-6 shadow-sm h-64">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end md:justify-center h-full">
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            
            {/* User Info */}
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-full border-4 border-white/30 overflow-hidden shadow-xl">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Thompson" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" title="Active Status"></div>
              </div>
              <div className="text-white text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <h1 className="text-3xl font-bold tracking-tight">Sarah Thompson</h1>
                  <ExternalLink className="w-5 h-5 text-blue-200 cursor-pointer hover:text-white transition-colors" />
                </div>
                <p className="text-blue-100 font-medium mt-2 text-lg">Senior Carer - Dementia Unit</p>
                <p className="text-blue-200 text-sm flex items-center justify-center md:justify-start mt-1">
                  <span className="opacity-70">Employee ID: #CAR-4592</span>
                  <span className="mx-2 opacity-50">•</span>
                  <span className="opacity-70">Maple Residency, London</span>
                </p>
              </div>
            </div>

            {/* Completion Status Widget (Keka Style) */}
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-4 pr-6 rounded-2xl border border-white/20 shadow-lg">
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-blue-900/40" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"/>
                  <path className="text-green-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="100, 100" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div>
                <p className="text-white font-bold text-sm uppercase tracking-wider">Credentialing Status</p>
                <p className="text-green-300 font-semibold">Fully Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Main Info) - Spans 8 cols */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Professional Credentials (Replacing Keka's "Introduce Yourself") */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Licenses & Certifications
              </h3>
              <span className="text-xs bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full">3 Active</span>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { name: 'Registered Senior Care Giver (RSCG)', issuer: 'National Care Council', expiry: 'Expires: Dec 2026', status: 'Active', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
                { name: 'Advanced Dementia Care Specialist', issuer: 'Maple Training Academy', expiry: 'Expires: Jun 2027', status: 'Active', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
                { name: 'First Aid & CPR Level 3', issuer: 'Red Cross', expiry: 'Expires: Next Month', status: 'Expiring Soon', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
              ].map((item, idx) => (
                <div key={idx} className="p-5 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">Issued by: {item.issuer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block text-xs font-bold px-2 py-1 rounded-md mb-1 ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {item.status}
                    </span>
                    <p className="text-xs text-slate-400 font-medium">{item.expiry}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 px-6 py-3 text-center">
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center w-full">
                <FileText className="w-4 h-4 mr-2" /> Manage Documents
              </button>
            </div>
          </div>

          {/* Section 2: Training Requirements (Replacing Keka's "Onboarding Tasks") */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Mandatory Training Tracks
                </h3>
                <p className="text-sm text-slate-500 mt-1">Q1 2026 Compliance Requirements</p>
              </div>
              {/* Progress Widget like Keka */}
              <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-xl">
                 <div className="relative w-10 h-10">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-blue-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"/>
                    <path className="text-blue-600" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="75, 100" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-800">
                    75%
                  </div>
                </div>
                <span className="text-sm font-bold text-blue-800">3/4 Completed</span>
                <MoreHorizontal className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100 justify-between">
                  <div className="flex items-center space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span className="text-sm font-bold text-slate-700 line-through opacity-70">Annual Fire Safety Refresher</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Completed Jan 2</span>
               </div>
               <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100 justify-between">
                  <div className="flex items-center space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span className="text-sm font-bold text-slate-700 line-through opacity-70">Infection Control Protocols v2</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Completed Jan 5</span>
               </div>
               <div className="flex items-center p-4 bg-white rounded-xl border-l-4 border-blue-500 shadow-sm justify-between">
                  <div className="flex items-center space-x-4">
                    <Clock className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Safe Resident Handling (Practical)</p>
                      <p className="text-xs text-slate-500">Due in 4 days</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">Resume module</button>
               </div>
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar) - Spans 4 cols */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Sidebar Section (Replacing Keka's "We're here to assist you") */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-base font-bold text-slate-800 mb-6">Reporting Manager</h3>
            <div className="flex items-center space-x-4 mb-6">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Manager" className="w-14 h-14 rounded-full object-cover border-2 border-slate-100" />
              <div>
                <p className="text-sm font-bold text-slate-800">Aditya Gupta</p>
                <p className="text-xs text-slate-500 font-medium">Clinical Director - Wing A</p>
              </div>
            </div>
            <div className="space-y-3">
              <a href="mailto:ag@vopro.in" className="flex items-center px-4 py-3 bg-slate-50 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors group">
                <Mail className="w-4 h-4 mr-3 text-slate-400 group-hover:text-blue-600" />
                ag@mapleresidency.com
              </a>
              <a href="tel:+1234567890" className="flex items-center px-4 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors group">
                <Phone className="w-4 h-4 mr-3 text-slate-400 group-hover:text-slate-600" />
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Quick Links Sidebar */}
           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-50">
                 <h3 className="text-base font-bold text-slate-800">Quick Actions</h3>
            </div>
            <div className="divide-y divide-slate-50">
                <button className="w-full flex items-center justify-between p-4 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <span>Request Shift Change</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <span>View My Payslips</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <span>Update Emergency Contact</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
            </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default CarerProfileScreen;