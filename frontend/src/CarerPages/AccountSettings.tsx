import { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  CreditCard,
  ChevronRight,
  ExternalLink,
  Smartphone
} from 'lucide-react';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = ['Profile', 'Security', 'Notifications', 'Preferences'];

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your personal information, security, and app preferences.</p>
      </div>

      {/* Top Tabs Navigation */}
      <div className="flex items-center space-x-1 mb-6 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-bold transition-all relative ${
              activeTab === tab 
              ? 'text-blue-600' 
              : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Main Content Area (8 cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {activeTab === 'Profile' && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-blue-100 flex items-center justify-center text-blue-600 font-black text-3xl shadow-inner">
                    ST
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white border border-slate-200 rounded-xl shadow-md text-slate-600 hover:text-blue-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-bold text-slate-800">Sarah Thompson</h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">Senior Support Worker • Employee ID: #CAR-902</p>
                  <div className="flex items-center justify-center md:justify-start mt-3 space-x-2">
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100">Full Time</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100">North Wing</span>
                  </div>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Personal Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <Mail className="w-4 h-4 text-slate-400 mr-3" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                        <p className="text-sm font-semibold text-slate-700">sarah.t@carefacility.com</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <Phone className="w-4 h-4 text-slate-400 mr-3" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Mobile Phone</p>
                        <p className="text-sm font-semibold text-slate-700">+44 7700 900214</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Address & Region</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <MapPin className="w-4 h-4 text-slate-400 mr-3" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Home Address</p>
                        <p className="text-sm font-semibold text-slate-700">24 Church St, Victoria, AU</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <Globe className="w-4 h-4 text-slate-400 mr-3" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Language</p>
                        <p className="text-sm font-semibold text-slate-700">English (UK)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6">Password & Authentication</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm"><Lock className="w-5 h-5 text-slate-400" /></div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">Change Password</p>
                        <p className="text-xs text-slate-400">Update your account password regularly.</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm"><Smartphone className="w-5 h-5 text-blue-600" /></div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">Two-Factor Authentication</p>
                        <p className="text-xs text-green-600 font-bold uppercase tracking-tighter">Enabled (SMS)</p>
                      </div>
                    </div>
                    <button className="text-[11px] font-bold text-red-500">Disable</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (4 cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Profile Strength */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Profile Completion</h3>
            <div className="flex items-center justify-between mb-2">
               <span className="text-xs font-bold text-blue-600">85% Complete</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-blue-600 rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              Complete your emergency contact details to reach 100%.
            </p>
          </div>

          {/* Compliance Badge */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
             <div className="flex items-center justify-between mb-4">
                <ShieldCheck className="w-8 h-8 text-green-400" />
                <span className="text-[10px] font-bold uppercase bg-white/10 px-2 py-1 rounded">Verified</span>
             </div>
             <h4 className="font-bold text-lg leading-tight">Clinical Compliance Status</h4>
             <p className="text-slate-400 text-xs mt-2 mb-6">Your DBS and Mandatory training are up to date until Oct 2026.</p>
             <button className="w-full py-3 bg-white/10 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all flex items-center justify-center">
                Download Certificates <ExternalLink className="w-3.5 h-3.5 ml-2" />
             </button>
          </div>

          {/* Payment Method Link */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
             <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                   <CreditCard className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-700">Bank Details</p>
                   <p className="text-[10px] text-slate-400">Salary & Expenses</p>
                </div>
             </div>
             <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccountSettings;