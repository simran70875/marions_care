import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Divider,
} from "@mui/material";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";

// FullCalendar Imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventContentArg, CalendarApi } from "@fullcalendar/core";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

// Define Tailwind color classes
const PRIMARY_PURPLE = "bg-purple-600 hover:bg-purple-700";
const TEXT_PURPLE = "text-purple-600";

interface HrCalendarEvent {
  id: string;
  title: string;
  start: string;
  allDay: boolean;
  type: "Required" | "Additional";
  status: "Active" | "Expired" | "Due" | "End of Service" | "Required";
}

const initialHrEvents: HrCalendarEvent[] = [
  {
    id: "1",
    title: "Tilles T Aid Certificate (Required)",
    start: "2025-12-04",
    type: "Required",
    status: "Active",
    allDay: true,
  },
  {
    id: "2",
    title: "Tilles Aid Expired HR File",
    start: "2025-12-05",
    type: "Required",
    status: "Expired",
    allDay: true,
  },
  {
    id: "3",
    title: "First Aid Certificate (Additional Requirement)",
    start: "2025-12-05",
    type: "Additional",
    status: "Required",
    allDay: true,
  },
  {
    id: "4",
    title: "Tilles T Aid Certificate (Required)",
    start: "2025-12-11",
    type: "Required",
    status: "Active",
    allDay: true,
  },
  {
    id: "5",
    title: "Tilles T Aid Certificate (Required)",
    start: "2025-12-12",
    type: "Required",
    status: "Expired",
    allDay: true,
  },
  {
    id: "6",
    title: "Tilles T Aid Certificate (Required)",
    start: "2025-12-13",
    type: "Required",
    status: "Due",
    allDay: true,
  },
  {
    id: "7",
    title: "Due HR File Expired HR File",
    start: "2025-12-15",
    type: "Required",
    status: "Due",
    allDay: true,
  },
  {
    id: "8",
    title: "Tilles T Aid Certificate (Additional Req)",
    start: "2025-12-17",
    type: "Additional",
    status: "Active",
    allDay: true,
  },
  {
    id: "9",
    title: "Pancoast HR File (Expired HR File)",
    start: "2025-12-18",
    type: "Required",
    status: "Expired",
    allDay: true,
  },
  {
    id: "10",
    title: "First Aid Certificate (Additional Req)",
    start: "2025-12-22",
    type: "Additional",
    status: "Active",
    allDay: true,
  },
];

// Helper to determine Tailwind classes based on event status
const getStatusClasses = (status: HrCalendarEvent["status"]) => {
  if (status === "Expired" || status === "Due") {
    return {
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      text: "text-yellow-800",
    };
  }
  return {
    bg: "bg-white",
    border: "border-gray-300",
    text: "text-gray-800",
  };
};

// =================================================================
// 2. CUSTOM CALENDAR HEADER COMPONENT
// =================================================================

interface CustomToolbarProps {
  calendarApi: CalendarApi;
  title: string;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  calendarApi,
  title,
}) => {
  const views = [
    { name: "year", label: "year", viewName: "dayGridYear" },
    { name: "month", label: "month", viewName: "dayGridMonth" },
    { name: "week", label: "week", viewName: "dayGridWeek" },
    { name: "day", label: "day", viewName: "dayGridDay" },
  ];

  // Get the current view name to highlight the active button
  const currentView = calendarApi.view.type;

  return (
    <div className="flex justify-between items-center py-2 px-0 mb-4">
      {/* Left side: Navigation */}
      <div className="flex items-center">
        <IconButton
          size="small"
          onClick={() => calendarApi.prev()}
          className="hover:bg-gray-100 p-1"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => calendarApi.next()}
          className="hover:bg-gray-100 p-1"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </IconButton>
      </div>

      {/* Center: Title (December 2025) */}
      <Typography variant="h5" className="font-light text-xl text-gray-800">
        {title}
      </Typography>

      {/* Right side: View Buttons */}
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        {views.map((view, index) => (
          <button
            key={view.name}
            onClick={() => calendarApi.changeView(view.viewName)}
            className={`
                            text-sm py-1 px-3 lowercase font-normal border-r border-gray-300
                            ${
                              currentView === view.viewName
                                ? "bg-gray-100 text-gray-800 font-medium"
                                : "bg-white text-gray-600 hover:bg-gray-50"
                            }
                            ${index === views.length - 1 ? "border-r-0" : ""}
                        `}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// =================================================================
// 3. MAIN CALENDAR COMPONENT
// =================================================================

const HrFileCalendar: React.FC = () => {
  const [filterText, setFilterText] = useState("");
  const [filters, setFilters] = useState({
    allHrFile: true,
    firstAid: true,
  });
  const calendarRef = useRef<FullCalendar>(null);
  const [calendarTitle, setCalendarTitle] = useState("December 2025");

  const calendarApi = calendarRef.current?.getApi();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClearSearch = useCallback(() => {
    setFilterText("");
    setFilters({ allHrFile: true, firstAid: true });
  }, []);

  const filteredEvents = useMemo(() => {
    return initialHrEvents.filter((event) => {
      const textMatch = filterText === "" || event.title.toLowerCase().includes(filterText.toLowerCase());

      const typeMatch =
        (filters.allHrFile && event.type === "Required") ||
        (filters.firstAid && event.title.includes("First Aid"));

      return textMatch && typeMatch;
    });
  }, [filters, filterText]);


  // Custom function to render event content with Tailwind styling
  const renderEventContent = (eventInfo: EventContentArg) => {
    const event = eventInfo.event.extendedProps as HrCalendarEvent;
    const { bg, border, text } = getStatusClasses(event.status);

    return (
      <div
        className={`p-1 text-xs border-l-4 ${bg} ${border} ${text} h-full overflow-hidden shadow-sm`}
      >
        <div className="font-medium truncate">{eventInfo.event.title}</div>
      </div>
    );
  };

  // Update the title when the dates change
  const handleDatesSet = (dateInfo: { view: { title: string } }) => {
    setCalendarTitle(dateInfo.view.title);
  };

  return (
    <Box className="flex h-screen bg-white">
      {/* ========================================================= */}
      {/* LEFT SIDEBAR (Search and Filters) */}
      {/* ========================================================= */}
      <div className="w-80 p-4 border-r border-gray-200 flex flex-col shadow-lg">
        <Typography
          variant="h6"
          className={`font-semibold ${TEXT_PURPLE} mb-2`}
        >
          &gt; HR File Calendar
        </Typography>

        <Divider className="my-4" />

        {/* Search Field */}
        <div className="relative my-4">
          <TextField
            fullWidth
            size="small"
            placeholder="Search"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm"
            InputProps={{
              startAdornment: (
                <Search size={16} className="text-gray-400 mr-2" />
              ),
              endAdornment: filterText ? (
                <IconButton
                  onClick={() => setFilterText("")}
                  size="small"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </IconButton>
              ) : null,
              className: "pl-2",
            }}
          />
        </div>

        {/* Buttons */}
        <Button
          variant="outlined"
          onClick={handleClearSearch}
          className="normal-case text-gray-600 border-gray-300 hover:bg-gray-100"
        >
          Clear Search
        </Button>

        <div className="flex items-center justify-between my-4">
          <Button
            variant="contained"
            className={`normal-case text-white shadow-md w-1/2 mr-2 ${PRIMARY_PURPLE}`}
          >
            All Search
          </Button>
          <div className="flex items-center border border-gray-300 rounded-lg p-1 bg-gray-50">
            <Typography variant="body2" className="text-gray-700 mr-2 text-sm">
              Show Filter ilte
            </Typography>
            <IconButton
              size="small"
              onClick={() => {
                /* Toggle filter visibility */
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </IconButton>
          </div>
        </div>

        <Divider className="mb-4" />

        {/* Filter Checkboxes */}
        <Typography
          variant="subtitle1"
          className="font-semibold text-gray-800 mb-2"
        >
          Filters
        </Typography>

        <div className="flex flex-col space-y-2">
          {/* All HR File Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.allHrFile}
                onChange={handleFilterChange}
                name="allHrFile"
                size="small"
                className={TEXT_PURPLE}
              />
            }
            label={
              <div className="border border-gray-300 rounded-md py-1 pl-5 flex items-center gap-5 bg-gray-50 text-sm">
                <Typography
                  variant="body2"
                  className="text-gray-700 font-medium mr-1"
                >
                  All HR File
                </Typography>
                <Search size={14} className="text-gray-500 " />
              </div>
            }
          />

          {/* First Aid Certificate Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.firstAid}
                onChange={handleFilterChange}
                name="firstAid"
                size="small"
                className={TEXT_PURPLE}
              />
            }
            label={
              <div className="border border-gray-300 rounded-md py-1 px-2 flex flex-col items-start bg-purple-50">
                <Typography
                  variant="body2"
                  className={`font-medium text-sm ${TEXT_PURPLE}`}
                >
                  First Aid Certificate
                </Typography>
                <Typography variant="caption" className="text-gray-500 text-xs">
                  (Additional Requirement)
                </Typography>
              </div>
            }
          />
        </div>

        {/* Bottom Action Buttons (Tids, Today, etc.) */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <Button
            variant="outlined"
            size="small"
            className="normal-case text-gray-600 border-gray-300 hover:bg-gray-100"
          >
            Tids
          </Button>
          <Button
            variant="contained"
            size="small"
            className={`normal-case text-white ${PRIMARY_PURPLE}`}
          >
            Today
          </Button>
          <Button
            variant="outlined"
            size="small"
            className="normal-case text-gray-600 border-gray-300 hover:bg-gray-100 ml-auto"
          >
            Dushay ouHors
          </Button>
          <Button
            variant="outlined"
            size="small"
            className="normal-case text-gray-600 border-gray-300 hover:bg-gray-100 w-full mt-2"
          >
            Coas skkers kpe Peant
          </Button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT CALENDAR VIEW */}
      {/* ========================================================= */}
      <div className="flex-grow p-4">
       
        {/* Calendar Container */}
        <div className="h-[85%]">
          {calendarApi && (
            <CustomToolbar calendarApi={calendarApi} title={calendarTitle} />
          )}

          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate="2025-12-01"
            events={filteredEvents}
            eventContent={renderEventContent}
            dayMaxEvents={true}
            weekends={true}
            height="100%"
            datesSet={handleDatesSet}
            // Disable the default header to use our custom one
            headerToolbar={false}
            // Apply Tailwind classes directly to FullCalendar elements via classNames
            viewClassNames="bg-white rounded-lg shadow-md border border-gray-200"
            // Custom day cell styling
            dayCellDidMount={({ el }) => {
              el.classList.add("border-gray-200");
            }}
            // Custom weekday header styling
            dayHeaderClassNames="bg-gray-50 text-gray-700 text-sm font-normal uppercase py-1"
            // Remove default FC event styling
            eventClassNames="p-0 m-0"
          />
        </div>
      </div>
    </Box>
  );
};

export default HrFileCalendar;
