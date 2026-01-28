import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@mui/material";

const AssessmentCalendar = () => {
  const [events] = useState([
    {
      title: "Medical Assessment",
      date: "2025-11-03",
      backgroundColor: "#87CEFA",
      borderColor: "#87CEFA",
    },
    {
      title: "Medication Review",
      date: "2025-11-06",
      backgroundColor: "#D8BFD8",
      borderColor: "#D8BFD8",
    },
    {
      title: "Wound / Skin Assessment",
      date: "2025-11-10",
      backgroundColor: "#F0E68C",
      borderColor: "#F0E68C",
    },
  ]);

  return (
    <div className="p-6 bg-white min-h-screen rounded-md shadow-sm">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Schedule - Assessments / Plans
      </h2>

      {/* Client Info Section */}
      <div className="bg-green-100 border border-green-300 rounded-md p-4 mb-4 flex justify-between items-center">
        <div>
          <p className="font-semibold text-gray-800">
            Client: <span className="font-normal">Ellisha Bickerton</span>
          </p>
          <p className="font-semibold text-gray-800">
            Address:{" "}
            <span className="font-normal">
              101 Oakmoor Road, Manchester, Lancashire
            </span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3b9e9f",
              "&:hover": { backgroundColor: "#2c7f80" },
            }}
          >
            Plan & Assessments Reports
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#5E3AB2",
              borderColor: "#5E3AB2",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Next Client →
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-4 text-sm">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-400 rounded-sm"></span> Assessments
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-yellow-400 rounded-sm"></span> Wound / Skin Assessment
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-200 rounded-sm"></span> Plans
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-blue-200 rounded-sm"></span> Outcomes
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-purple-300 rounded-sm"></span> Medication Review
        </span>
      </div>

      {/* Calendar Container */}
      <div className="border rounded-md p-4 bg-white relative">
        {/* Print Button */}
        <div className="absolute top-2 right-3">
          <Button
            variant="outlined"
            sx={{
              fontSize: "0.8rem",
              textTransform: "none",
              borderColor: "#ccc",
              color: "#333",
            }}
          >
            Print
          </Button>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          events={events}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          titleFormat={{ year: "numeric", month: "long" }}
          fixedWeekCount={false}
          showNonCurrentDates={true}
          dayMaxEvents={2}
        />
      </div>


    </div>
  );
};

export default AssessmentCalendar;
