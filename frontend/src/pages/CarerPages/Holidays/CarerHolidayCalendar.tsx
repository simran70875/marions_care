import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

// FullCalendar Imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventContentArg, CalendarApi } from "@fullcalendar/core";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

// Color definitions (matching the screenshot: Red/Yellow/Blue for holiday blocks)
const RED_HOLIDAY = "#F44336"; // For the 4-day block (Dec 23-26)
const BLUE_HOLIDAY = "#B3E5FC"; // For the multi-day block (Dec 24 - Jan 1)
const YELLOW_DAY = "#FFF9C4"; // For a single highlighted day (Dec 2)

interface HolidayCalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string; // Optional end date for multi-day events
  color: string; // Background color for the event
  textColor: string; // Text color
}

// Mock data based on the Carer Holiday Calendar screenshot
const initialHolidayEvents: HolidayCalendarEvent[] = [
  // Red block events (Dec 23-26) - Appear as single-day events on top
  {
    id: "1",
    title: "Holiday Day 1",
    start: "2025-12-23",
    color: RED_HOLIDAY,
    textColor: 'white',
  },
  {
    id: "2",
    title: "Holiday Day 2",
    start: "2025-12-24",
    color: RED_HOLIDAY,
    textColor: 'white',
  },
  {
    id: "3",
    title: "Holiday Day 3",
    start: "2025-12-25",
    color: RED_HOLIDAY,
    textColor: 'white',
  },
  {
    id: "4",
    title: "Holiday Day 4",
    start: "2025-12-26",
    color: RED_HOLIDAY,
    textColor: 'white',
  },
  // Blue background event (Dec 24 - Jan 2) - This uses the background cell rendering
  // Note: FullCalendar only applies background color to *all day* events if a class is used on the event object.
  // We'll use a standard FullCalendar event style here for simplicity, focusing on the color.
  {
    id: "5",
    title: '', // Empty title to match the look of a background block
    start: "2025-12-24",
    end: "2026-01-03", // End date is exclusive, so covers up to Jan 2nd
    color: BLUE_HOLIDAY, 
    textColor: 'transparent', // Hide text
  
  },
];


// =================================================================
// 2. CUSTOM CALENDAR HEADER COMPONENT (Toolbar)
// =================================================================

interface CustomToolbarProps {
  calendarApi: CalendarApi | undefined;
  title: string;
  filterText: string;
  setFilterText: (text: string) => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  calendarApi,
  title,
  filterText,
  setFilterText,
}) => {
  if (!calendarApi) return null;

  const views = [
    { name: "year", label: "year", viewName: "dayGridYear" },
    { name: "month", label: "month", viewName: "dayGridMonth" },
    { name: "week", label: "week", viewName: "dayGridWeek" },
    { name: "day", label: "day", viewName: "dayGridDay" },
  ];

  const currentView = calendarApi.view.type;

  return (
    <Box className="flex justify-between items-center py-2 px-0 mb-4">
      
      {/* Left: Navigation and Title */}
      <Box className="flex items-center">
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
          className="hover:bg-gray-100 p-1 mr-4"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </IconButton>
        <Button
          variant="outlined"
          onClick={() => calendarApi.today()}
          size="small"
          sx={{ minWidth: 60, height: 28, fontSize: 12, borderColor: '#D1D5DB', color: '#4B5563' }}
        >
          Today
        </Button>
        <Typography variant="h5" className="font-light text-2xl text-gray-800 ml-8">
          {title}
        </Typography>
      </Box>

      {/* Right: Search, Heat Map Button, and View Buttons */}
      <Box className="flex items-center gap-3">
        {/* Search Field */}
        <TextField
          size="small"
          placeholder="Search"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          sx={{ width: 120, bgcolor: 'white' }}
          InputProps={{
            style: { height: 32 },
          }}
        />

        {/* Heat Map Button */}
        <Button
          variant="contained"
          size="small"
          sx={{ 
            backgroundColor: '#8E24AA', // Purple color for Heat Map button
            "&:hover": { backgroundColor: '#7B1FA2' },
            height: 32, 
            fontSize: 12,
            textTransform: 'none'
          }}
        >
          Heat Map
        </Button>
        
        {/* View Buttons */}
        <Box className="flex items-center border border-gray-300 rounded-md overflow-hidden ml-3">
          {views.map((view, index) => (
            <button
              key={view.name}
              onClick={() => calendarApi.changeView(view.viewName)}
              className={`
                text-sm py-1 px-3 lowercase font-normal border-r border-gray-300
                ${
                  currentView.includes(view.viewName.toLowerCase())
                    ? "bg-gray-200 text-gray-800 font-medium"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }
                ${index === views.length - 1 ? "border-r-0" : ""}
              `}
            >
              {view.label}
            </button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};


// =================================================================
// 3. MAIN CALENDAR COMPONENT
// =================================================================

const CarerHolidayCalendar: React.FC = () => {
  const [filterText, setFilterText] = useState("");
  const calendarRef = useRef<FullCalendar>(null);
  const [calendarTitle, setCalendarTitle] = useState("December 2025");
  const calendarApi = calendarRef.current?.getApi();

  // Custom function to color the background of a specific day (Dec 2nd in the screenshot)
  const dayCellDidMount = useCallback(({ el, date }: { el: HTMLElement, date: Date }) => {
    // Check if the date is December 2nd, 2025
    if (date.getFullYear() === 2025 && date.getMonth() === 11 && date.getDate() === 2) {
      // Apply the yellow background color to the cell content area
      el.style.backgroundColor = YELLOW_DAY;
      // Also ensure the event container inside doesn't override this
      const contentEl = el.querySelector('.fc-daygrid-day-frame');
      if (contentEl) {
         contentEl.parentElement!.style.backgroundColor = YELLOW_DAY; // Apply to the full cell
      }
    } else {
      // Reset color for other cells to ensure no bleed over from background events
      el.style.backgroundColor = '';
    }
  }, []);

  // Use the event data directly for FullCalendar
  const mappedEvents = useMemo(() => initialHolidayEvents, []);
  
  // Custom event rendering for the red blocks
  const renderEventContent = (eventInfo: EventContentArg) => {
    // Only apply custom rendering for non-background events
    if (eventInfo.event.display === 'background') {
        return null;
    }
    
    // For the red blocks: show title text (hidden in the screenshot, but good practice to include)
    return (
      <div 
        className={`p-0.5 text-xs h-full w-full overflow-hidden text-center`}
        style={{
          backgroundColor: eventInfo.event.backgroundColor,
          color: eventInfo.event.textColor,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          minHeight: '14px',
          borderRadius: 0,
        }}
      >
        {/* Text is visually present on the red blocks in the screenshot, but tiny. We'll show it. */}
        {eventInfo.event.title}
      </div>
    );
  };

  // Update the title when the dates change
  const handleDatesSet = (dateInfo: { view: { title: string } }) => {
    setCalendarTitle(dateInfo.view.title);
  };

  return (
    <Box className="p-4 bg-white min-h-screen">
      <Typography variant="h6" className="text-lg font-medium text-gray-800 mb-4">
        &gt; Carer Holiday Calendar
      </Typography>
      
      {/* Custom Toolbar */}
      <CustomToolbar
        calendarApi={calendarApi}
        title={calendarTitle}
        filterText={filterText}
        setFilterText={setFilterText}
      />

      {/* Calendar Container */}
      <Box className="h-[calc(100vh-120px)] border border-gray-200 rounded-md shadow-md">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate="2025-12-01" // Set initial date to match the screenshot
          events={mappedEvents}
          eventContent={renderEventContent}
          dayMaxEvents={true}
          weekends={true}
          height="100%"
          datesSet={handleDatesSet}
          headerToolbar={false} // Disable the default header
          
          // Custom class names for styling
          viewClassNames="bg-white"
          dayCellDidMount={dayCellDidMount} // Apply yellow color to Dec 2nd
          dayHeaderClassNames="bg-gray-100 text-gray-700 text-sm font-normal py-2 border-b border-gray-200"
          
          // // Cell and border styling
          // dayCellContentClassNames="p-0"
          // Ensure all events are small and tight
          eventClassNames="p-0 m-0" 
          
          // Disable default styling for event components
          eventDidMount={(info) => {
             // For red blocks, remove default styling and set height/margin
             if (info.event.backgroundColor === RED_HOLIDAY) {
                info.el.style.padding = '0';
                info.el.style.margin = '1px 0';
                info.el.style.border = 'none';
                info.el.style.borderRadius = '0';
                info.el.style.height = '16px'; // Keep them thin
             }
          }}
        />
      </Box>
    </Box>
  );
};

export default CarerHolidayCalendar;