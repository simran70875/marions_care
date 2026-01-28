import AgentStatisticsChart from "../../components/carecenter/AgentStatisticsChart";
import EcommerceMetrics from "../../components/carecenter/EcommerceMetrics";
import HoursWidget from "../../components/carecenter/HoursWidget";
import MonthlyEventsChart from "../../components/carecenter/MonthlyEventsChart";
import NotificationsPanel from "../../components/carecenter/NotificationsPanel";
import QuickAccessMenu from "../../components/carecenter/QuickAccessMenu";
import ShiftTable from "../../components/carecenter/ShiftTable";
import PageMeta from "../../components/common/PageMeta";

import { Users, FileText, CalendarCheck } from "lucide-react";

function AssessmentDue() {
  const items = [
    "Click All Customers",
    "Select A Customer",
    "Set Assessment Dates & Add Assessment",
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2">
          <FileText className="w-5 h-5 text-orange-500" /> Assessment Due
        </h3>
        <div className="flex gap-2">
          <button className="text-xs px-2 py-1 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
            View Table
          </button>
          <button className="text-xs px-2 py-1 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
            View Calendar
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
          <Users className="w-5 h-5 text-gray-400" />
          <span>No Assessment Added</span>
        </div>

        <ul className="space-y-1 ml-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm"
            >
              <CalendarCheck className="w-4 h-4 text-green-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ExpiringHRFiles() {
  const items = [
    "Click All Carers",
    "Select A Carer",
    "Add HR File",
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2">
          <FileText className="w-5 h-5 text-red-500" /> Expiring HR Files
        </h3>
        <div>
          <button className="text-xs px-2 py-1 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
            View Table
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
          <Users className="w-5 h-5 text-gray-400" />
          <span>No HR File Expiring</span>
        </div>

        <ul className="space-y-1 ml-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm"
            >
              <CalendarCheck className="w-4 h-4 text-blue-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



export default function Home() {
  return (
    <>
      <PageMeta
        title="Care Center - Dashboard"
        description="Care Center CRM: Manage Customers, Carers, Events & Assessments"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Left Content */}
        <div className="col-span-12 space-y-6 xl:col-span-8">
          <EcommerceMetrics />
          <MonthlyEventsChart />
          <AgentStatisticsChart />
          <ShiftTable />
          <HoursWidget />
        </div>

        {/* Right Content */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          <NotificationsPanel />
          <QuickAccessMenu />
            <AssessmentDue />
          <ExpiringHRFiles />
        </div>
      </div>
    </>
  );
}
