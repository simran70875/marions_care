import { NavItem } from "../layout/AppSidebar";
import {
  Users,
  FileText,
  Award,
  Search,
  BarChart2,
  Settings,
  Mail,
  GridIcon,
  UserIcon,
  UserPlus,
  Calendar,
  Plane,
  Clock,
} from "lucide-react";

export const reportsSubMenu = [
  { name: "Customer Action Summary", path: "/customers/reports/action-summary",},
  { name: "Customer Summary PDF", path: "/customers/reports/summary-pdf" },
  { name: "Document List", path: "/customers/reports/documents" },
  { name: "Print Schedule PDF", path: "/customers/reports/print-schedule" },
  { name: "Referral Reports", path: "/customers/reports/referrals" },
  { name: "Future Status Changes", path: "/customers/reports/future-status" },
  { name: "Letters Report", path: "/customers/reports/letters" },
  { name: "Status Change Hrs Affected", path: "/customers/reports/status-hours" },
  { name: "All Customer Report", path: "/customers/reports/all" },
]

export const outcomeSubMenu = [
  { name: "Outcome Setup", path: "/customers/outcomes/setup" },
  { name: "Tag Setup", path: "/customers/outcomes/tags" },
  { name: "Outcome Overview Report", path: "/customers/outcomes/overview" },
]

export const searchSubMenu = [
  { name: "Customer Contact Report", path: "/customers/advanced-search/contact" },
  { name: "Customer Travel Distance", path: "/customers/advanced-search/travel" },
  { name: "Customer/Carer Travel Distance", path: "/customers/advanced-search/travel-both" },
  { name: "Customer Tag Setup", path: "/customers/advanced-search/tags" },
  { name: "Plans Taken Report", path: "/customers/advanced-search/plans" },
]

export const clientSettingSubMenu = [
  { name: "Assigned Hours", path: "/customers/settings/assigned-hours" },
  { name: "Preferred Carer", path: "/customers/settings/preferred-carer" },
  { name: "Assign Job Types", path: "/customers/settings/job-types" },
  { name: "Assessment Type", path: "/customers/settings/assessment-type" },
  { name: "No Carer Assigned", path: "/customers/settings/no-carer" },
  { name: "Edit Job Types", path: "/customers/settings/edit-job" },
  { name: "Referral Reason Setup", path: "/customers/settings/referral-reason" },
  { name: "Email Schedule", path: "/customers/settings/email-schedule" },
  { name: "Inactive Digital Tasks", path: "/customers/settings/inactive-tasks" },
]

export const letterSubMenu = [
  { name: "Completed Templates", path: "/customers/letters/completed" },
  { name: "Template Editor", path: "/customers/letters/editor" },
  { name: "Create Template", path: "/customers/letters/create" },
]

export const clientSubMenu: NavItem[] = [
  { icon: <GridIcon />, name: "Main Dashboard", path: "/dashboard" },
  { icon: <Users />, name: "All Customers", path: "/customers/all" },
  { icon: <UserIcon />, name: "Add Customer", path: "/customers/addClient" },
  // { icon: <Calendar />, name: "Schedule", path: "/customers/schedule" },
  { icon: <FileText />, name: "Reports", path: "/customers/reports", subItems: reportsSubMenu },
  { icon: <Award />, name: "Outcomes", path: "/customers/outcomes", subItems: outcomeSubMenu },
  { icon: <Search />, name: "Advanced Search", path: "/customers/advanced-search", subItems: searchSubMenu },
  { icon: <BarChart2 />, name: "Audit Pages", path: "/customers/audit" },
  { icon: <Settings />, name: "Settings", path: "/customers/settings", subItems: clientSettingSubMenu },
  { icon: <Mail />, name: "Letter Templates", path: "/customers/letters", subItems: letterSubMenu },
];


export const carerAdvancedSearchSubMenu: NavItem[] = [
  { name: "HR File Renewal Search", path: "/carers/advanced-search/hr-renewal" },
  { name: "HR File Calendar", path: "/carers/advanced-search/hr-calendar" },
  { name: "Carer Advanced Search", path: "/carers/advanced-search/carer" },
  { name: "Sent E-mail Report", path: "/carers/advanced-search/sent-email-report" },
  { name: "Carer Availability", path: "/carers/advanced-search/availability" },
];

export const carerScheduleSearchSubMenu: NavItem[] = [
  { name: "Conflict Search", path: "/carers/schedule-search/conflict" },
  { name: "Contract Capacity", path: "/carers/schedule-search/contract-capacity" },
  { name: "Availability Capacity", path: "/carers/schedule-search/availability-capacity" },
  { name: "Area Capacity", path: "/carers/schedule-search/area-capacity" },
  { name: "Carer Event Type Analysis", path: "/carers/schedule-search/carer-event-analysis" },
  { name: "Client Event Type Analysis", path: "/carers/schedule-search/client-event-analysis" },
];

export const carerReportsSubMenu: NavItem[] = [
  { name: "Carer Action Summary", path: "/carers/reports/action-summary" },
  { name: "Future Status Changes", path: "/carers/reports/status-changes" },
  { name: "Letters Report", path: "/carers/reports/letters" },
  { name: "All Carer Report", path: "/carers/reports/all" },
];

export const carerHolidaySubMenu: NavItem[] = [
  { name: "Holiday Calendar", path: "/carers/holidays/calendar" },
  { name: "Holiday Overview (Yr)", path: "/carers/holidays/overview-year" },
  { name: "Leave Overview (Yr)", path: "/carers/holidays/leave-year" },
  { name: "Holiday & Leave List", path: "/carers/holidays/list" },
  { name: "Holiday Requests", path: "/carers/holidays/requests" },
  { name: "Holiday Reports", path: "/carers/holidays/reports" },
];

export const carerHoursRequestedSubMenu: NavItem[] = [
  { name: "Requested Hours", path: "/carers/hours/requested" },
  { name: "Create Rejected Reasons", path: "/carers/hours/rejected-reasons" },
];

export const carerLetterSubMenu: NavItem[] = [
  { name: "Completed Templates", path: "/carers/letters/completed" },
  { name: "Template Editor", path: "/carers/letters/editor" },
  { name: "Create Template", path: "/carers/letters/create" },
];

export const carerSettingsSubMenu: NavItem[] = [
  { name: "HR File Type", path: "/carers/settings/hr-file-type" },
  { name: "Carer Login", path: "/carers/settings/login" },
  { name: "Work Phones", path: "/carers/settings/work-phones" },
  { name: "App Permissions", path: "/carers/settings/app-permissions" },
  { name: "Email Schedule", path: "/carers/settings/email-schedule" },
  { name: "HR File Template", path: "/carers/settings/hr-file-template" },
  { name: "Contract Hours", path: "/carers/settings/contract-hours" },
  { name: "Availability", path: "/carers/settings/availability" },
  { name: "Transport Type Set-Up", path: "/carers/settings/transport-type" },
  { name: "Task Permission Set-Up", path: "/carers/settings/task-permission" },
];

export const carerSubMenu: NavItem[] = [
  { icon: <GridIcon />, name: "Dashboard", path: "/dashboard" },
  { icon: <Users />, name: "All Carers", path: "/carers/all" },
  { icon: <UserPlus />, name: "Add Carer", path: "/carer/add" },
  { icon: <Search />, name: "Advanced Search", path: "/carers/advanced-search", subItems: carerAdvancedSearchSubMenu },
  { icon: <Calendar />, name: "Schedule Search", path: "/carers/schedule-search", subItems: carerScheduleSearchSubMenu },
  { icon: <FileText />, name: "Reports", path: "/carers/reports", subItems: carerReportsSubMenu },
  { icon: <Plane />, name: "Holidays / Leave", path: "/carers/holidays", subItems: carerHolidaySubMenu },
  { icon: <Clock />, name: "Hours Requested", path: "/carers/hours-requested", subItems: carerHoursRequestedSubMenu },
  { icon: <Mail />, name: "Letter Templates", path: "/carers/letters", subItems: carerLetterSubMenu },
  { icon: <BarChart2 />, name: "Diversity", path: "/carers/diversity" },
  { icon: <Settings />, name: "Settings", path: "/carers/settings", subItems: carerSettingsSubMenu },
];


