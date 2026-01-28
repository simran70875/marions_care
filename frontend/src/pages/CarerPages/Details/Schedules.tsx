import React, { useState, useMemo } from 'react';

// =================================================================
// 1. TYPE DEFINITIONS & SHIFT DATA
// =================================================================

type ShiftStatus = 'Scheduled' | 'Medication' | 'Overnight' | 'NoCarer' | 'Cancelled' | 'Recurring';

interface Shift {
    id: number;
    time: string;
    staff: string;
    tags: string[];
    status: ShiftStatus;
}

interface CalendarDay {
    date: number; // Day of the month
    week: number; // AW (Actual Week) number
    isCurrentMonth: boolean;
    shifts: Shift[];
    isToday: boolean;
}

// =================================================================
// 2. CORE CALENDAR LOGIC (The "Library")
// =================================================================

/**
 * Utility function to generate the 42-day grid for any given month.
 * This effectively acts as the core date logic of a calendar library.
 */
const getCalendarGrid = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const grid: CalendarDay[] = [];
    const today = new Date();
    const isCurrentMonthView = year === today.getFullYear() && month === today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Day of the week for the 1st of the month (0=Sun, 1=Mon, ..., 6=Sat)
    let startDayIndex = firstDayOfMonth.getDay(); 
    // Adjust index to start on Monday (0=Mon, 6=Sun)
    startDayIndex = startDayIndex === 0 ? 6 : startDayIndex - 1; 

    // --- MOCK SHIFT DATA GENERATOR ---
    const generateShifts = (day: number): Shift[] => {
        const shifts: Shift[] = [];
        if (day % 7 !== 0 && day % 7 !== 6) { 
            shifts.push({ id: 1, time: "07:25 - 08:10", staff: "Even Weldedawet", tags: ["M", "S"], status: "Scheduled" });
            shifts.push({ id: 2, time: "13:55 - 14:25", staff: "Even Weldedawet", tags: ["M", "S"], status: "Scheduled" });
        }
        if (day % 5 === 0) { 
            shifts.push({ id: 3, time: "18:40 - 19:10", staff: "Mercy Anukuawapo", tags: ["P", "M", "S"], status: "Medication" });
        }
        if (day % 3 === 0) {
            shifts.push({ id: 4, time: "22:30 - 22:50", staff: "Even Weldedawet", tags: ["OV"], status: "Overnight" });
        }
        if (day === 27 || day === 28) { 
            shifts.push({ id: 5, time: "18:55 - 19:25", staff: "No Carer Entered", tags: [], status: "NoCarer" });
        }
        return shifts;
    };
    // --- END MOCK SHIFT DATA GENERATOR ---

    // 1. Padding from previous month
    const prevMonthDaysToDisplay = startDayIndex; 
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    for (let i = prevMonthDaysToDisplay - 1; i >= 0; i--) {
        grid.push({ 
            date: prevMonthLastDate - i, 
            week: 0, 
            isCurrentMonth: false, 
            shifts: [],
            isToday: false,
        });
    }

    // 2. Days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
        grid.push({
            date: day,
            week: 0, 
            isCurrentMonth: true,
            shifts: generateShifts(day),
            isToday: isCurrentMonthView && day === today.getDate(),
        });
    }
    
    // 3. Padding from next month (ensure a total of 42 days for 6 weeks)
    const nextMonthDaysToDisplay = 42 - grid.length;
    for (let day = 1; day <= nextMonthDaysToDisplay; day++) {
        grid.push({ 
            date: day, 
            week: 0, 
            isCurrentMonth: false, 
            shifts: [],
            isToday: false,
        });
    }

    // 4. Assign AW (Actual Week) numbers starting from 40 (as seen in the image)
    let weekCounter = 40; 
    for (let i = 0; i < grid.length; i++) {
        if (i > 0 && i % 7 === 0) {
            weekCounter++;
        }
        grid[i].week = weekCounter;
    }

    return grid; 
};

// =================================================================
// 3. PRESENTATIONAL COMPONENTS
// =================================================================

const LegendItem: React.FC<{ color: string, label: string }> = ({ color, label }) => (
    <div className="flex items-center text-sm text-gray-700 mx-2 my-1">
        <span className={`w-3 h-3 rounded-full mr-2 ${color} border border-gray-300`}></span>
        {label}
    </div>
);

const StatusLegend: React.FC = () => (
    <div className="flex flex-wrap justify-center p-2 bg-white rounded-lg shadow-inner mt-2 border border-gray-200">
        <LegendItem color="bg-lime-500" label="In-progress" />
        <LegendItem color="bg-red-500" label="Cancelled" />
        <LegendItem color="bg-yellow-400" label="Not Assigned" />
        <LegendItem color="bg-indigo-500" label="Bank Holiday" />
        <LegendItem color="bg-blue-600" label="Recurring Event" />
        <LegendItem color="bg-pink-500" label="Single Event" />
        <LegendItem color="bg-green-500" label="Change Status" />
    </div>
);

interface ShiftCardProps {
    shift: Shift;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ shift }) => {
    let bgColor = 'bg-green-100 hover:bg-green-200 border-green-400';
    let textColor = 'text-green-800';
    let staffColor = 'text-green-700';

    switch (shift.status) {
        case 'Medication':
            bgColor = 'bg-pink-100 hover:bg-pink-200 border-pink-400';
            textColor = 'text-pink-800';
            staffColor = 'text-pink-700';
            break;
        case 'Overnight':
            bgColor = 'bg-blue-100 hover:bg-blue-200 border-blue-400';
            textColor = 'text-blue-800';
            staffColor = 'text-blue-700';
            break;
        case 'Cancelled':
            bgColor = 'bg-red-100 hover:bg-red-200 border-red-400';
            textColor = 'text-red-800';
            staffColor = 'text-red-700';
            break;
        case 'NoCarer':
             bgColor = 'bg-yellow-200 hover:bg-yellow-300 border-yellow-500';
             textColor = 'text-yellow-900';
             staffColor = 'text-red-700 font-bold';
             break;
        case 'Scheduled':
        default:
            break;
    }

    return (
        <div 
            className={`w-full text-xs p-1 mt-1 rounded-sm cursor-pointer transition-all duration-150 shadow-sm border ${bgColor}`}
            title={`${shift.staff} (${shift.time}) - Status: ${shift.status}`}
        >
            <div className="flex justify-between items-center font-bold">
                <span className={`leading-tight ${textColor}`}>{shift.time}</span>
                <span className="flex space-x-0.5">
                    {shift.tags.map((tag, index) => (
                        <span key={index} className={`font-mono text-[9px] px-[3px] rounded bg-gray-600 text-white leading-none`}>
                            {tag}
                        </span>
                    ))}
                </span>
            </div>
            <p className={`mt-0.5 leading-tight ${staffColor}`}>
                {shift.staff}
            </p>
        </div>
    );
};


// =================================================================
// 4. THE CUSTOM CALENDAR COMPONENT (The "Calendar Library")
// =================================================================

interface ScheduleCalendarProps {
    currentDate: Date;
    onDateChange: (newDate: Date) => void;
    maHours: string;
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ currentDate, onDateChange, maHours }) => {
    
    const daysOfWeek = ["AW", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // 1. Get the 42-day grid data
    const calendarGrid: CalendarDay[] = useMemo(() => getCalendarGrid(currentDate), [currentDate]);

    // 2. Group the flat grid array into weeks (rows)
    const weeks: CalendarDay[][] = calendarGrid.reduce<CalendarDay[][]>((acc, day) => {
        const weekKey = day.week; 
        acc[weekKey] = acc[weekKey] || [];
        acc[weekKey].push(day);
        return acc;
    }, []);
    
    const weekRows: CalendarDay[][] = Object.values(weeks);

    // 3. Navigation Handlers
    const goToPreviousMonth = (): void => {
        onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = (): void => {
        onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // 4. Display Label
    const currentMonthLabel: string = new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long' 
    }).format(currentDate);

    return (
        <>
            {/* Month and Navigation Controls */}
            <div className="flex flex-wrap justify-between items-center mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                    <button 
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors shadow-sm text-sm font-semibold"
                        onClick={goToPreviousMonth}
                    >
                        &lt; Prev Month
                    </button>
                    <h2 className="text-xl font-bold text-gray-800 w-40 text-center">{currentMonthLabel}</h2>
                    <button 
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors shadow-sm text-sm font-semibold"
                        onClick={goToNextMonth}
                    >
                        Next Month &gt;
                    </button>
                </div>

                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                    <p className="text-lg font-bold text-gray-700">M.A.Hrs: <span className="text-blue-600">{maHours}</span></p>
                    <button className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm font-semibold">
                        Print
                    </button>
                </div>
            </div>

            <StatusLegend />

            {/* Calendar Grid */}
            <div className="mt-4 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
                {/* Day Headers (AW, Mon, Tue, ...) */}
                <div 
                    className="grid text-center font-bold text-sm text-gray-600 bg-gray-50 border-b border-gray-200"
                    style={{ gridTemplateColumns: 'minmax(50px, 0.05fr) repeat(7, 1fr)' }}
                >
                    {daysOfWeek.map((day, index) => (
                        <div key={day} className={`p-2 uppercase ${index === 0 ? 'bg-gray-200 text-gray-700' : ''}`}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Week Rows */}
                <div className="calendar-body">
                    {weekRows.map((week, weekIndex) => (
                        <div 
                            key={weekIndex} 
                            className="grid border-b border-gray-200 last:border-b-0"
                            style={{ gridTemplateColumns: 'minmax(50px, 0.05fr) repeat(7, 1fr)' }}
                        >
                            {/* Week Number (AW column) */}
                            <div className="flex flex-col justify-start items-center p-2 bg-gray-200 text-gray-700 border-r border-gray-200 font-bold text-xs">
                                <span className="text-xs">AW</span>
                                <span className="text-lg">{week[0]?.week}</span>
                            </div>

                            {/* Days in the Week */}
                            {week.map((dayData, index) => (
                                <div 
                                    key={`${dayData.week}-${dayData.date}-${index}`}
                                    className={`relative p-1 border-r border-gray-100 min-h-[120px] transition-colors ${
                                        dayData.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                                    } ${
                                        dayData.isToday ? 'bg-blue-100 border-2 border-blue-400' : '' 
                                    }`}
                                >
                                    {/* Day Header */}
                                    <div className={`flex justify-between items-start mb-1 text-xs font-semibold ${!dayData.isCurrentMonth ? 'text-gray-400' : (index >= 5 ? 'text-red-500' : 'text-gray-800')}`}>
                                        <span className="text-lg">{dayData.date}</span>
                                        {/* Status Dots (Simulated) */}
                                        <div className="flex space-x-1">
                                            {dayData.shifts.length > 0 && (
                                                <span className="w-2 h-2 rounded-full bg-lime-500" title="In Progress"></span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Shifts */}
                                    {dayData.shifts.map(shift => (
                                        <ShiftCard key={shift.id} shift={shift} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

// =================================================================
// 5. MAIN APP COMPONENT
// =================================================================

const ClientSchedulePage: React.FC = () => {
    // State to track the currently displayed month (defaulting to October 2025 like the mockup)
    const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 9, 1)); 
    
    const clientInfo = {
        name: "CHARLES 'O CONNOR",
        address: "Longmire Centre, 181 Langley Lane Wythenshawe Manchester",
        MAHrs: "55:20"
    };

    return (
        <div>
            
            {/* Header & Client Info */}
            <div className="bg-white rounded-lg shadow-xl p-4 mb-4 border-t-4 border-blue-600">
                <h1 className="text-2xl font-bold text-gray-800">
                    <span className="text-blue-600">&gt;</span> Schedule
                </h1>
                <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 text-sm rounded-md border border-yellow-200">
                    <p>Hover over events for more details</p>
                    <div className="flex flex-wrap mt-1">
                        <LegendItem color="bg-blue-600" label="Recurring Event" />
                        <LegendItem color="bg-pink-500" label="Single Event" />
                    </div>
                </div>
                
                <p className="mt-3 text-sm text-gray-700 font-semibold">
                    Client selected: <span className="text-blue-700">{clientInfo.name}</span> - {clientInfo.address}
                </p>
                
                {/* Using the custom "library" component */}
                <ScheduleCalendar
                    currentDate={currentDate}
                    onDateChange={setCurrentDate}
                    maHours={clientInfo.MAHrs}
                />
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap justify-between items-center mt-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm font-semibold">
                        <span className="text-xl mr-2">📅</span> Add Shift
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm font-semibold">
                        <span className="text-xl mr-2">🔄</span> Recur
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md text-sm font-semibold">
                        <span className="text-xl mr-2">✉️</span> Publish
                    </button>
                </div>

                <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                    <label className="flex items-center text-sm text-gray-700">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 mr-2 border-gray-300" />
                        Send Outdated Schedule To Carer
                    </label>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md text-sm font-semibold">
                        <span className="text-xl mr-2">❌</span> Clear Unpublished
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientSchedulePage;
