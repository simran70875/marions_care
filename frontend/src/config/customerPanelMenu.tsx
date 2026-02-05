import { NavItem } from "../layout/AppSidebar";
import {
  Users,
  FileText,
  Settings,
  GridIcon,
  UserIcon,
  Calendar,
  Plane,
  Clock,
  ClipboardCheck,
  Stethoscope,
  Bell,
  MessageSquare
} from "lucide-react";

// --- RESIDENT (CUSTOMER) SECTION ---
// Focused on the elderly residents the customer looks after
export const residentReportsSubMenu = [
  { name: "Customer Plan Summary", path: "/customer/residents/reports/summary" },
  { name: "Daily Customer Logs", path: "/customer/residents/reports/daily-logs" },
  { name: "Incident Reports", path: "/customer/residents/reports/incidents" },
  { name: "Document List", path: "/customer/residents/reports/documents" },
];

export const residentSubMenu: NavItem[] = [
  { icon: <GridIcon />, name: "Dashboard", path: "/customer/dashboard" },
  { icon: <Users />, name: "My Carers", path: "/customer/residents/my-list" },
  { icon: <Calendar />, name: "Carers Visit Schedule", path: "/customer/residents/schedule" },
  { icon: <ClipboardCheck />, name: "Carer Logs / Notes", path: "/customer/residents/logs" },
  { icon: <Stethoscope />, name: "Medication (eMAR)", path: "/customer/residents/medication" },
  { icon: <FileText />, name: "Reports & Carer Plans", path: "/customer/residents/reports", subItems: residentReportsSubMenu },
];

// --- CARER SELF-SERVICE SECTION ---
// Focused on the logged-in customer's own needs
export const myHolidaySubMenu: NavItem[] = [
  { name: "Holiday Calendar", path: "/customer/me/holidays/calendar" },
];

export const myHoursSubMenu: NavItem[] = [
  { name: "Timesheets", path: "/customer/me/hours/timesheets" },
  { name: "Upcoming Shifts", path: "/customer/me/hours/upcoming" },
];

export const customerSelfSubMenu: NavItem[] = [
  { icon: <UserIcon />, name: "My Profile", path: "/customer/me/profile" },
  { icon: <Clock />, name: "My Shifts & Hours", path: "/customer/me/hours", subItems: myHoursSubMenu },
  { icon: <Plane />, name: "Leave & Holidays", path: "/customer/me/holidays", subItems: myHolidaySubMenu },
  { icon: <Bell />, name: "Notifications", path: "/customer/me/notifications" },
  { icon: <MessageSquare />, name: "Handover Notes", path: "/customer/me/handover" },
  { icon: <Settings />, name: "Account Settings", path: "/customer/me/settings" },
];

// --- MAIN CARER PANEL EXPORT ---
// This combines both for the main sidebar navigation
export const customerSidebarMenu: NavItem[] = [
  ...residentSubMenu,
  ...customerSelfSubMenu
];