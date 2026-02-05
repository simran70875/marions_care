import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";

import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";

import Home from "./pages/Dashboard/Home";
import LoadingScreen from "./pages/AuthPages/LoadingScreen";
import CustomerPage from "./pages/CustomerPages/Customer";
import AddCustomerPage from "./pages/CustomerPages/AddCustomerPage";
import CustomerDetailsPage from "./pages/CustomerPages/Details/CustomerDetails";
import CustomerDetailsLayout from "./pages/CustomerPages/Details/CustomerDetailsLayout";
import CustomerLayout from "./pages/CustomerPages/CustomerLayout";
import CustomerMedication from "./pages/CustomerPages/Details/medication/Index";
import EMARTracker from "./pages/CustomerPages/Details/medication/emar/Emar";
import MedicationList from "./pages/CustomerPages/Details/medication/MedicationList";
import MedsCabinet from "./pages/CustomerPages/Details/medication/MedicationCabinet";
import MedicationHistory from "./pages/CustomerPages/Details/medication/MedicationHistory";

import EMARReviewReport from "./pages/CustomerPages/Details/medication/EMARReviewReport";
import MandatoryMedicationReport from "./pages/CustomerPages/Details/medication/MandatoryMedicationReport";
import MedicationReviewDateReport from "./pages/CustomerPages/Details/medication/MedicationReviewDateReport";
import AlertsDashboard from "./pages/CustomerPages/Details/medication/AlertsDashboard";
import ClientSummaryProfile from "./pages/CustomerPages/ClientSummaryProfile";
import EMARHistory from "./pages/CustomerPages/Details/medication/EMARHistory";
import ClientActionsSummary from "./pages/CustomerPages/Reports/ClientActionsSummary";
import ClientSummaryReport from "./pages/CustomerPages/Reports/ClientSummaryReport";
import DocumentListReport from "./pages/CustomerPages/Reports/DocumentListReport";
import SchedulesForPrinting from "./pages/CustomerPages/Reports/SchedulesForPrinting";
import ReferralReportsPage from "./pages/CustomerPages/Reports/ReferalReports";
import ClientSchedulePage from "./pages/CustomerPages/Details/Schedules";
import EditClientForm from "./pages/CustomerPages/Details/edit/EditClientForm";
import ClientContactsTable from "./pages/CustomerPages/Details/edit/EditContacts";
import ClientPlansOverview from "./pages/CustomerPages/Details/Plans/ClientPlanDetails";
import PlanCategoryManagerStatic from "./pages/CustomerPages/PlanCategoryManager";
import ClientsFutureStatusTable from "./pages/CustomerPages/Reports/FutureStatus";
import ClientLettersReportMuiGrid from "./pages/CustomerPages/Reports/ClientLettersReport";
import StatusChangeHoursAffectedMuiGrid from "./pages/CustomerPages/Reports/StatusChangeHoursAffected";
import AllClientsMuiGrid from "./pages/CustomerPages/Reports/AllClientsReports";
import AssignEventsToOutcomes from "./pages/CustomerPages/Outcomes/OutcomeSetup";
import ClientTagSetup from "./pages/CustomerPages/Outcomes/TagSetup";
import OutcomeOverviewReport from "./pages/CustomerPages/Outcomes/OutcomeOverviewReport";
import ClientContactSearch from "./pages/CustomerPages/AdvancedSearch/ClientContacts";
import CustomerTravelDistanceSearch from "./pages/CustomerPages/AdvancedSearch/CustomerTravelDistanceSearch";
import CarerSearch from "./pages/CustomerPages/AdvancedSearch/CarerTravelDistanceSearch";
import ClientTagSetupSearch from "./pages/CustomerPages/AdvancedSearch/ClientTagSetup";
import AllPlansTaken from "./pages/CustomerPages/AdvancedSearch/AllPlansTaken";
import AuditPages from "./pages/CustomerPages/Audit";
import AllClientsNotes from "./pages/CustomerPages/Audit/AllClientsNotes";
import MedicationTaskOverview from "./pages/CustomerPages/Audit/MedicationTaskOverview";
import EMARReview from "./pages/CustomerPages/Audit/EmarReview";
import AssignedHours from "./pages/CustomerPages/Settings/AssignedHours";
import PreferredCarer from "./pages/CustomerPages/Settings/PreferredCarer";
import AssignJobType from "./pages/CustomerPages/Settings/AssignJobType";
import AssessmentType from "./pages/CustomerPages/Settings/AssessmentTypes";
import AboutMePage from "./pages/CustomerPages/Details/edit/AboutMePage";
import AssessmentPage from "./pages/CustomerPages/Details/Assessments/AssessmentsDates";
import AssessmentCalendar from "./pages/CustomerPages/Details/Assessments/AssessmentCalendar";
import BodyAssessment from "./pages/CustomerPages/Details/Assessments/BodyAssessment";
import BodyAssessmentHistory from "./pages/CustomerPages/Details/Assessments/AssessmentHistory";
import SkinAssessment from "./pages/CustomerPages/Details/Assessments/SkinAssessment";
import SkinAssessmentHistory from "./pages/CustomerPages/Details/Assessments/SkinAssessmentHistory";
import DigitalTaskSheet from "./pages/CustomerPages/Details/DigitalTasks/TaskTracker";
import DigitalTaskSheetHistory from "./pages/CustomerPages/Details/DigitalTasks/DigitalTaskSheetHistory";
import ClientPlans from "./pages/CustomerPages/Details/Plans/ClientPlans";
import StartPlan from "./pages/CustomerPages/Details/Plans/StartPlan.tsx";
import IntakeForm from "./pages/CustomerPages/Details/Plans/IntialCareAssessment.tsx";
import TagsView from "./pages/CustomerPages/Details/Plans/TagsView.tsx";
import ClientPlanWebView from "./pages/CustomerPages/Details/Plans/ClientPlanWebView.tsx";
import CarerLayout from "./pages/CarerPages/CarerLayout.tsx";
import AddCarerPage from "./pages/CarerPages/AddCarerPage.tsx";
import AllHrFiles from "./pages/CarerPages/AdvancedSearch/AllHrFiles.tsx";
import CarersPage from "./pages/CarerPages/Carer.tsx";
import HrFileCalendar from "./pages/CarerPages/AdvancedSearch/HrFileCalendar.tsx";
import CarerAdvanceSearch from "./pages/CarerPages/AdvancedSearch/CarerAdvanceSearch.tsx";
import CarerEmailLog from "./pages/CarerPages/AdvancedSearch/CarerEmailLog.tsx";
import CarerAvailability from "./pages/CarerPages/AdvancedSearch/CarerAvailability.tsx";
import CarerConflicts from "./pages/CarerPages/ScheduleSearch/CarerConflicts.tsx";
import ContractedCapacityAnalysis from "./pages/CarerPages/ScheduleSearch/ContractedCapacityAnalysis.tsx";
import AvailabilityCapacityAnalysis from "./pages/CarerPages/ScheduleSearch/AvailabilityCapacityAnalysis.tsx";
import AreaCapacityAnalysis from "./pages/CarerPages/ScheduleSearch/AreaCapacityAnalysis.tsx";
import AreaEventTypeAnalysis from "./pages/CarerPages/ScheduleSearch/EventCapacityAnalysis.tsx";
import ClientEventCapacityAnalysis from "./pages/CarerPages/ScheduleSearch/ClientEventCapacityAnalysis.tsx";
import ActionsReport from "./pages/CarerPages/Reports/CarerActionsSummary.tsx";
import CarersFutureStatusChanges from "./pages/CarerPages/Reports/CarersFutureStatusChanges.tsx";
import CarerLettersReport from "./pages/CarerPages/Reports/CarerLettersReport.tsx";
import AllCarersReport from "./pages/CarerPages/Reports/AllCarersReports.tsx";
import CarerHolidayCalendar from "./pages/CarerPages/Holidays/CarerHolidayCalendar.tsx";
import HolidaysOverviewYear from "./pages/CarerPages/Holidays/HolidaysOverviewYear.tsx";
import CarerPanelLayout from "./CarerPages/CarerLayout.tsx";
import Dashboard from "./CarerPages/Dashboard.tsx";
import CarerProfileScreen from "./CarerPages/Profile.tsx";
import ResidentDirectory from "./CarerPages/Residents.tsx";
import VisitSchedule from "./CarerPages/VisitSchedule.tsx";
import CareLogsPage from "./CarerPages/CareLogsPage.tsx";
import EMARPage from "./CarerPages/EmarMedication.tsx";
import ReportsCarePlans from "./CarerPages/ReportCarePlans.tsx";
import DailyCareLogs from "./CarerPages/DailyCareLogs.tsx";
import IncidentReports from "./CarerPages/IncidentReports.tsx";
import DocumentListScreen from "./CarerPages/DocumentList.tsx";
import CarerTimesheet from "./CarerPages/MyShifts.tsx";
import UpcomingShifts from "./CarerPages/UpcomingShift.tsx";
import RequestLeave from "./CarerPages/RequestLeave.tsx";
import HolidayBalance from "./CarerPages/HolidayBalance.tsx";
import HolidayCalendar from "./CarerPages/HolidayCalendar.tsx";
import NotificationsScreen from "./CarerPages/Notifications.tsx";
import HandoverNotes from "./CarerPages/HandoverNotes.tsx";
import AccountSettings from "./CarerPages/AccountSettings.tsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.tsx";
import CarerDetailsLayout from "./pages/CarerPages/Details/CarerDetailsLayout.tsx";
import CarerSummaryDetails from "./pages/CarerPages/CarerSummaryProfile.tsx";
import CarerDetailsPage from "./pages/CarerPages/Details/CarerDetails.tsx";
import CarerSchedulePage from "./pages/CarerPages/Details/Schedules.tsx";
import CustomerPanelLayout from "./CusotmerPages/CusotmerLayout.tsx";
import CustomerDashboard from "./CusotmerPages/Dashboard.tsx";
import CustomerProfileScreen from "./CusotmerPages/Profile.tsx";
import CustomerResidentDirectory from "./CusotmerPages/Residents.tsx";
import CustomerVisitSchedule from "./CusotmerPages/VisitSchedule.tsx";
import CustomerLogsPage from "./CusotmerPages/CustomerLogsPage.tsx";
import CustomerEMARPage from "./CusotmerPages/EmarMedication.tsx";
import ReportsCustomerPlans from "./CusotmerPages/ReportCusotmerPlans.tsx";
import DailyCustomerLogs from "./CusotmerPages/DailyCusotmerLogs.tsx";
import CustomerDocumentListScreen from "./CusotmerPages/DocumentList.tsx";
import CustomerIncidentReports from "./CarerPages/IncidentReports.tsx";
import CustomerTimesheet from "./CusotmerPages/MyShifts.tsx";
import CustomerUpcomingShifts from "./CusotmerPages/UpcomingShift.tsx";
import CustomerRequestLeave from "./CusotmerPages/RequestLeave.tsx";
import CustomerHolidayBalance from "./CusotmerPages/HolidayBalance.tsx";
import CustomerHolidayCalendar from "./CusotmerPages/HolidayCalendar.tsx";
import CustomerNotificationsScreen from "./CusotmerPages/Notifications.tsx";
import CustomerHandoverNotes from "./CusotmerPages/HandoverNotes.tsx";
import CustomerAccountSettings from "./CusotmerPages/AccountSettings.tsx";

export default function App() {
  const [showInitialLoader, setShowInitialLoader] = useState(() => {
    // 👇 only true if not seen before in this browser session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    return !hasSeenLoader;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (showInitialLoader) {
      const timer = setTimeout(() => {
        sessionStorage.setItem("hasSeenLoader", "true");
        setShowInitialLoader(false);
        navigate("/"); // go to signin automatically
      }, 4000); // show for 4 seconds
      return () => clearTimeout(timer);
    }
  }, [showInitialLoader, navigate]);

  if (showInitialLoader) {
    return <LoadingScreen isAppLoading={true} onFinish={() => {}} />;
  }

  return (
    <>
      <Toaster containerStyle={{ zIndex: 999999999999 }} position="top-right" />
      <ScrollToTop />

      <Routes>
        {/* Auth Page */}
        <Route path="/" element={<SignIn />} />

        {/* Protected Admin Routes */}
        <Route>
          <Route element={
              <ProtectedRoute role="admin">
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index path="/dashboard" element={<Home />} />
          </Route>
        </Route>

        {/* customer layouts screens */}
        <Route
          element={
            <ProtectedRoute role="admin">
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/customers/all" element={<CustomerPage />} />
          <Route path="/customers/addClient" element={<AddCustomerPage />} />

          <Route
            path="/customers/reports/action-summary"
            element={<ClientActionsSummary />}
          />
          <Route
            path="/customers/reports/summary-pdf"
            element={<ClientSummaryReport />}
          />
          <Route
            path="/customers/reports/summary-pdf"
            element={<ClientSummaryReport />}
          />
          <Route
            path="/customers/reports/documents"
            element={<DocumentListReport />}
          />
          <Route
            path="/customers/reports/print-schedule"
            element={<SchedulesForPrinting />}
          />
          <Route
            path="/customers/reports/referrals"
            element={<ReferralReportsPage />}
          />
          <Route
            path="/customers/reports/future-status"
            element={<ClientsFutureStatusTable />}
          />
          <Route
            path="/customers/reports/letters"
            element={<ClientLettersReportMuiGrid />}
          />
          <Route
            path="/customers/reports/status-hours"
            element={<StatusChangeHoursAffectedMuiGrid />}
          />
          <Route
            path="/customers/reports/all"
            element={<AllClientsMuiGrid />}
          />

          <Route
            path="/customers/plan/categories"
            element={<PlanCategoryManagerStatic />}
          />

          <Route
            path="/customers/outcomes/setup"
            element={<AssignEventsToOutcomes />}
          />
          <Route path="/customers/outcomes/tags" element={<ClientTagSetup />} />
          <Route
            path="/customers/outcomes/overview"
            element={<OutcomeOverviewReport />}
          />

          <Route
            path="/customers/advanced-search/contact"
            element={<ClientContactSearch />}
          />
          <Route
            path="/customers/advanced-search/travel"
            element={<CustomerTravelDistanceSearch />}
          />
          <Route
            path="/customers/advanced-search/travel-both"
            element={<CarerSearch />}
          />
          <Route
            path="/customers/advanced-search/tags"
            element={<ClientTagSetupSearch />}
          />
          <Route
            path="/customers/advanced-search/plans"
            element={<AllPlansTaken />}
          />

          <Route path="/customers/audit" element={<AuditPages />} />
          <Route
            path="/customers/audit/all-notes"
            element={<AllClientsNotes />}
          />
          <Route
            path="/customers/audit/medication-tasks-overview"
            element={<MedicationTaskOverview />}
          />
          <Route
            path="/customers/audit/emar-overview"
            element={<EMARReview />}
          />

          <Route
            path="/customers/settings/assigned-hours"
            element={<AssignedHours />}
          />
          <Route
            path="/customers/settings/preferred-carer"
            element={<PreferredCarer />}
          />
          <Route
            path="/customers/settings/job-types"
            element={<AssignJobType />}
          />
          <Route
            path="/customers/settings/assessment-type"
            element={<AssessmentType />}
          />
        </Route>

        <Route
          element={
            <ProtectedRoute role="admin">
              <CustomerDetailsLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/customer/view" element={<ClientSummaryProfile />} />
          <Route path="/customer/details" element={<CustomerDetailsPage />} />

          <Route path="/customer/medication" element={<CustomerMedication />} />
          <Route path="/customer/medication/emar" element={<EMARTracker />} />
          <Route
            path="/customer/medication/list"
            element={<MedicationList />}
          />
          <Route
            path="/customer/medication/list"
            element={<MedicationList />}
          />
          <Route
            path="/customer/medication/cabinet"
            element={<MedsCabinet />}
          />
          <Route
            path="/customer/medication/history-report"
            element={<MedicationHistory />}
          />
          <Route
            path="/customer/medication/audit-history"
            element={<EMARHistory />}
          />
          <Route
            path="/customer/medication/review-report"
            element={<EMARReviewReport />}
          />
          <Route
            path="/customer/medication/skip-report"
            element={<MandatoryMedicationReport />}
          />
          <Route
            path="/customer/medication/review-date-report"
            element={<MedicationReviewDateReport />}
          />
          <Route
            path="/customer/medication/alerts-dashboard"
            element={<AlertsDashboard />}
          />

          <Route path="/customer/schedule" element={<ClientSchedulePage />} />

          <Route path="/customer/edit/details" element={<EditClientForm />} />
          <Route
            path="/customer/edit/contacts"
            element={<ClientContactsTable />}
          />
          <Route path="/customer/edit/about-me" element={<AboutMePage />} />

          {/* customer plans  */}
          <Route path="/customer/plans" element={<ClientPlans />} />
          <Route
            path="/customer/plans/details"
            element={<ClientPlansOverview />}
          />
          <Route
            path="/customer/plans/start-plan/:id"
            element={<StartPlan />}
          />
          <Route
            path="/customer/plans/start-plan/care-assessment"
            element={<IntakeForm />}
          />
          <Route
            path="/customer/plans/start-plan/tags-view"
            element={<TagsView />}
          />
          <Route
            path="/customer/plans/plan/web-view"
            element={<ClientPlanWebView />}
          />

          {/* customer assessments  */}
          <Route
            path="/customer/assessments/dates"
            element={<AssessmentPage />}
          />
          <Route
            path="/customer/assessments/calendar"
            element={<AssessmentCalendar />}
          />
          <Route
            path="/customer/assessments/body"
            element={<BodyAssessment />}
          />
          <Route
            path="/customer/assessments/body/history"
            element={<BodyAssessmentHistory />}
          />
          <Route
            path="/customer/assessments/skin"
            element={<SkinAssessment />}
          />
          <Route
            path="/customer/assessments/skin/history"
            element={<SkinAssessmentHistory />}
          />

          <Route
            path="/customer/tasks/tracker"
            element={<DigitalTaskSheet />}
          />
          <Route
            path="/customer/tasks/history"
            element={<DigitalTaskSheetHistory />}
          />
        </Route>
        {/* customer layouts screens */}

        {/* Carer layouts screens */}
        <Route
          element={
            <ProtectedRoute role="admin">
              <CarerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/carers/all" element={<CarersPage />} />
          <Route path="/carer/add" element={<AddCarerPage />} />
          <Route
            path="/carers/advanced-search/hr-renewal"
            element={<AllHrFiles />}
          />
          <Route
            path="/carers/advanced-search/hr-calendar"
            element={<HrFileCalendar />}
          />
          <Route
            path="/carers/advanced-search/carer"
            element={<CarerAdvanceSearch />}
          />
          <Route
            path="/carers/advanced-search/sent-email-report"
            element={<CarerEmailLog />}
          />
          <Route
            path="/carers/advanced-search/availability"
            element={<CarerAvailability />}
          />

          <Route
            path="/carers/schedule-search/conflict"
            element={<CarerConflicts />}
          />
          <Route
            path="/carers/schedule-search/contract-capacity"
            element={<ContractedCapacityAnalysis />}
          />
          <Route
            path="/carers/schedule-search/availability-capacity"
            element={<AvailabilityCapacityAnalysis />}
          />
          <Route
            path="/carers/schedule-search/area-capacity"
            element={<AreaCapacityAnalysis />}
          />
          <Route
            path="/carers/schedule-search/carer-event-analysis"
            element={<AreaEventTypeAnalysis />}
          />
          <Route
            path="/carers/schedule-search/client-event-analysis"
            element={<ClientEventCapacityAnalysis />}
          />

          <Route
            path="/carers/reports/action-summary"
            element={<ActionsReport />}
          />
          <Route
            path="/carers/reports/status-changes"
            element={<CarersFutureStatusChanges />}
          />
          <Route
            path="/carers/reports/letters"
            element={<CarerLettersReport />}
          />
          <Route path="/carers/reports/all" element={<AllCarersReport />} />

          <Route
            path="/carers/holidays/calendar"
            element={<CarerHolidayCalendar />}
          />
          <Route
            path="/carers/holidays/overview-year"
            element={<HolidaysOverviewYear />}
          />
        </Route>
        <Route
          element={
            <ProtectedRoute role="admin">
              <CarerDetailsLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/carer/view" element={<CarerSummaryDetails />} />
          <Route path="/carer/details" element={<CarerDetailsPage />} />
          <Route path="/carer/schedule" element={<CarerSchedulePage />} />
        </Route>
        {/* Carer layouts screens */}

        {/* carer panel screens after carer login */}
        <Route
          element={
            <ProtectedRoute role="carer">
              <CarerPanelLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/carer/dashboard" element={<Dashboard />} />
          <Route path="/carer/me/profile" element={<CarerProfileScreen />} />
          <Route
            path="/carer/residents/my-list"
            element={<ResidentDirectory />}
          />
          <Route path="/carer/residents/schedule" element={<VisitSchedule />} />
          <Route path="/carer/residents/logs" element={<CareLogsPage />} />
          <Route path="/carer/residents/medication" element={<EMARPage />} />
          <Route
            path="/carer/residents/reports/summary"
            element={<ReportsCarePlans />}
          />
          <Route
            path="/carer/residents/reports/daily-logs"
            element={<DailyCareLogs />}
          />
          <Route
            path="/carer/residents/reports/incidents"
            element={<IncidentReports />}
          />
          <Route
            path="/carer/residents/reports/documents"
            element={<DocumentListScreen />}
          />
          <Route
            path="/carer/me/hours/timesheets"
            element={<CarerTimesheet />}
          />
          <Route path="/carer/me/hours/upcoming" element={<UpcomingShifts />} />
          <Route path="/carer/me/holidays/request" element={<RequestLeave />} />
          <Route
            path="/carer/me/holidays/balance"
            element={<HolidayBalance />}
          />
          <Route
            path="/carer/me/holidays/calendar"
            element={<HolidayCalendar />}
          />
          <Route
            path="/carer/me/notifications"
            element={<NotificationsScreen />}
          />
          <Route path="/carer/me/handover" element={<HandoverNotes />} />
          <Route path="/carer/me/settings" element={<AccountSettings />} />
        </Route>


           {/* customer panel screens after customer login */}
        <Route
          element={
            <ProtectedRoute role="client">
              <CustomerPanelLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/me/profile" element={<CustomerProfileScreen />} />
          <Route path="/customer/residents/my-list" element={<CustomerResidentDirectory />}/>
          <Route path="/customer/residents/schedule" element={<CustomerVisitSchedule />} />
          <Route path="/customer/residents/logs" element={<CustomerLogsPage />} />
          <Route path="/customer/residents/medication" element={<CustomerEMARPage />} />
          <Route path="/customer/residents/reports/summary"  element={<ReportsCustomerPlans />}/>
          <Route path="/customer/residents/reports/daily-logs" element={<DailyCustomerLogs />}/>
          <Route path="/customer/residents/reports/incidents" element={<CustomerIncidentReports />}/>
          <Route path="/customer/residents/reports/documents" element={<CustomerDocumentListScreen />}/>
          <Route path="/customer/me/hours/timesheets" element={<CustomerTimesheet />}/>
          <Route path="/customer/me/hours/upcoming" element={<CustomerUpcomingShifts />} />
          <Route path="/customer/me/holidays/request" element={<CustomerRequestLeave />} />
          <Route  path="/customer/me/holidays/balance" element={<CustomerHolidayBalance />}/>
          <Route path="/customer/me/holidays/calendar" element={<CustomerHolidayCalendar />}/>
          <Route path="/customer/me/notifications" element={<CustomerNotificationsScreen />}/>
          <Route path="/customer/me/handover" element={<CustomerHandoverNotes />} />
          <Route path="/customer/me/settings" element={<CustomerAccountSettings />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
