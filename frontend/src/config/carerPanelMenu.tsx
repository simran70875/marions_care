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
// Focused on the elderly residents the carer looks after
export const residentReportsSubMenu = [
  { name: "Care Plan Summary", path: "/carer/residents/reports/summary" },
  { name: "Daily Care Logs", path: "/carer/residents/reports/daily-logs" },
  { name: "Incident Reports", path: "/carer/residents/reports/incidents" },
  { name: "Document List", path: "/carer/residents/reports/documents" },
];

export const residentSubMenu: NavItem[] = [
  { icon: <GridIcon />, name: "Dashboard", path: "/carer/dashboard" },
  { icon: <Users />, name: "My Residents", path: "/carer/residents/my-list" },
  { icon: <Calendar />, name: "Visit Schedule", path: "/carer/residents/schedule" },
  { icon: <ClipboardCheck />, name: "Care Logs / Notes", path: "/carer/residents/logs" },
  { icon: <Stethoscope />, name: "Medication (eMAR)", path: "/carer/residents/medication" },
  { icon: <FileText />, name: "Reports & Care Plans", path: "/carer/residents/reports", subItems: residentReportsSubMenu },
];

// --- CARER SELF-SERVICE SECTION ---
// Focused on the logged-in carer's own needs
export const myHolidaySubMenu: NavItem[] = [
  { name: "Request Leave", path: "/carer/me/holidays/request" },
  // { name: "My Holiday Balance", path: "/carer/me/holidays/balance" },
  { name: "Holiday Calendar", path: "/carer/me/holidays/calendar" },
];

export const myHoursSubMenu: NavItem[] = [
  { name: "Timesheets", path: "/carer/me/hours/timesheets" },
  { name: "Upcoming Shifts", path: "/carer/me/hours/upcoming" },
];

export const carerSelfSubMenu: NavItem[] = [
  { icon: <UserIcon />, name: "My Profile", path: "/carer/me/profile" },
  { icon: <Clock />, name: "My Shifts & Hours", path: "/carer/me/hours", subItems: myHoursSubMenu },
  { icon: <Plane />, name: "Leave & Holidays", path: "/carer/me/holidays", subItems: myHolidaySubMenu },
  { icon: <Bell />, name: "Notifications", path: "/carer/me/notifications" },
  { icon: <MessageSquare />, name: "Handover Notes", path: "/carer/me/handover" },
  { icon: <Settings />, name: "Account Settings", path: "/carer/me/settings" },
];

// --- MAIN CARER PANEL EXPORT ---
// This combines both for the main sidebar navigation
export const carerSidebarMenu: NavItem[] = [
  ...residentSubMenu,
  ...carerSelfSubMenu
];