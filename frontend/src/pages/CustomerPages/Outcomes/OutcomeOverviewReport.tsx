import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

// --- Color Constants (Matching the theme and chart legends) ---
const PRIMARY_PURPLE = '#6D28D9';

// --- Chart Data Definitions for Legends ---
const overallOutcomeStatuses = [
    { label: "Not Started", color: "#C7C7C7" }, // Gray
    { label: "Complete", color: "#6AA84F" },    // Green
    { label: "Partial", color: "#FF9900" },     // Orange
    { label: "Incomplete", color: "#CC0000" }   // Red
];

const alertsData = [
    { label: "Missed", color: "#3C78D8" },                   // Blue
    { label: "Incomplete without Reason", color: "#CC0000" },// Red
    { label: "Incomplete with Reason", color: "#F1C232" }    // Yellow
];

const overallMedicationStatuses = [
    { label: "Administered", color: "#4A90E2" },
    { label: "Self Administered", color: "#FF6347" },
    { label: "Missed", color: "#FFD700" },
    { label: "Due", color: "#8A2BE2" },
    { label: "Not Administered", color: "#DA70D6" },
    { label: "Other", color: "#C0C0C0" }
];

const overallTaskStatuses = [
    { label: "Completed", color: "#4A90E2" },
    { label: "Partially Completed", color: "#FF6347" },
    { label: "Due", color: "#FFD700" },
    { label: "Missed", color: "#8A2BE2" },
    { label: "Other", color: "#C0C0C0" }
];

// =================================================================
// 1. UTILITY COMPONENTS
// =================================================================

interface LegendItemProps {
    label: string;
    color: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ label, color }) => (
    <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="w-4 h-2 rounded" style={{ backgroundColor: color }}></span>
        <span className="text-xs text-gray-700">{label}</span>
    </div>
);

interface ChartPlaceholderProps {
    title: string;
    legends: LegendItemProps[];
    children?: React.ReactNode;
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ title, legends, children }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 h-full flex flex-col">
        <Typography variant="subtitle1" className="text-lg font-semibold text-gray-800 text-center mb-4">
            {title}
        </Typography>
        <div className="flex-grow flex items-center justify-center p-4 bg-gray-50 rounded-md border border-dashed border-gray-300">
            {children || (
                <span className="text-gray-400 italic">Chart visualization area</span>
            )}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {legends.map((item, index) => (
                <LegendItem key={index} label={item.label} color={item.color} />
            ))}
        </div>
    </div>
);

// =================================================================
// 2. MAIN COMPONENT 
// =================================================================

const OutcomeOverviewReport: React.FC = () => {
    // Dummy state for date range
    const [startDate, setStartDate] = useState<string>('02-11-2025');
    const [endDate, setEndDate] = useState<string>('02-11-2025');

    const handleSearch = () => {
        console.log(`Searching for time period: ${startDate} to ${endDate}`);
        // In a real app, this would trigger data fetching
    };

    return (
        <Box>
            
            {/* Header and Time Period Selector */}
            <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-0 py-2 border-b border-gray-300 mb-6 backdrop-blur-sm">
                <Typography variant="h5" className="text-2xl font-normal text-gray-800 mb-3 sm:mb-0 ml-2">
                    Medication & Task Overview (Outcome)
                </Typography>
                
                {/* Date Picker and Search */}
                <Box className="flex items-center gap-2 mr-2">
                    <Typography variant="body2" className="text-gray-600 font-medium whitespace-nowrap">Time Period:</Typography>
                    <TextField
                        type="date"
                        size="small"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-32 bg-white"
                    />
                    <Typography variant="body2" className="text-gray-600 font-medium">to</Typography>
                    <TextField
                        type="date"
                        size="small"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-32 bg-white"
                    />
                    <Button 
                        onClick={handleSearch} 
                        variant="contained" 
                        size="small" 
                        className="normal-case font-semibold shadow-md"
                        style={{ backgroundColor: PRIMARY_PURPLE }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>

            {/* Main Grid: 4 Chart Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[70vh]">
                
                {/* Quadrant 1: Overall Outcome Statuses */}
                <div className="min-h-[300px]">
                    <ChartPlaceholder 
                        title="Overall Outcome Statuses" 
                        legends={overallOutcomeStatuses}
                    >
                        {/* Placeholder Bar Chart - Faux Visual */}
                        <div className="flex gap-4 w-full max-w-sm h-full items-end justify-center">
                            <div className="flex flex-col items-center">
                                <div className="w-12 rounded-t-md h-32" style={{ backgroundColor: '#C7C7C7' }}></div>
                                <span className="text-xs text-gray-600 mt-1">Not Started</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 rounded-t-md h-48" style={{ backgroundColor: '#6AA84F' }}></div>
                                <span className="text-xs text-gray-600 mt-1">Complete</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 rounded-t-md h-20" style={{ backgroundColor: '#FF9900' }}></div>
                                <span className="text-xs text-gray-600 mt-1">Partial</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 rounded-t-md h-16" style={{ backgroundColor: '#CC0000' }}></div>
                                <span className="text-xs text-gray-600 mt-1">Incomplete</span>
                            </div>
                        </div>
                    </ChartPlaceholder>
                </div>

                {/* Quadrant 2: Alerts (Medication/Digital TaskSheet) */}
                <div className="min-h-[300px]">
                    <ChartPlaceholder 
                        title="Alerts" 
                        legends={alertsData}
                    >
                        {/* Placeholder Line/Bar Chart for Alerts - Faux Visual */}
                        <div className="w-full h-full p-4 relative">
                            {/* Y-Axis Labels */}
                            <div className="absolute left-0 top-1/4 -translate-y-1/2 text-xs text-gray-500 font-semibold">Medication</div>
                            <div className="absolute left-0 bottom-1/4 -translate-y-1/2 text-xs text-gray-500 font-semibold">Digital TaskSheet</div>
                            
                            {/* X-Axis (Numerical scale) */}
                            <div className="absolute bottom-0 left-10 right-4 h-0.5 bg-gray-400">
                                <div className="flex justify-between text-xs text-gray-600 mt-1">
                                    {['-1.0', '-0.8', '-0.6', '-0.4', '-0.2', '0', '0.2', '0.4', '0.6', '0.8', '1.0'].map(val => (
                                        <span key={val} className="w-4 text-center">{val}</span>
                                    ))}
                                </div>
                                {/* Zero Line */}
                                <div className="absolute top-0 transform -translate-y-full h-full w-0.5 bg-gray-600" style={{ left: '50%' }}></div>
                            </div>
                        </div>
                    </ChartPlaceholder>
                </div>

                {/* Quadrant 3: Overall Medication Statuses */}
                <div className="min-h-[300px]">
                    <ChartPlaceholder 
                        title="Overall Medication Statuses" 
                        legends={overallMedicationStatuses}
                    >
                        {/* Placeholder Pie Chart - Faux Visual */}
                        <div className="w-48 h-48 rounded-full border-8 border-gray-300 relative">
                            <div className="w-full h-full rounded-full absolute" style={{ 
                                background: `conic-gradient(#4A90E2 0 40%, #FF6347 40% 60%, #FFD700 60% 75%, #8A2BE2 75% 85%, #DA70D6 85% 95%, #C0C0C0 95% 100%)` 
                            }}></div>
                        </div>
                    </ChartPlaceholder>
                </div>

                {/* Quadrant 4: Overall Task Statuses */}
                <div className="min-h-[300px]">
                    <ChartPlaceholder 
                        title="Overall Task Statuses" 
                        legends={overallTaskStatuses}
                    >
                        {/* Placeholder Bar Chart 2 - Faux Visual */}
                        <div className="flex gap-4 w-full max-w-sm h-full items-end justify-center">
                            <div className="flex flex-col items-center">
                                <div className="w-12 rounded-t-md h-40" style={{ backgroundColor: '#4A90E2' }}></div>
                                <span className="text-xs text-gray-600 mt-1">Completed</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 rounded-t-md h-28" style={{ backgroundColor: '#FF6347' }}></div>
                                <span className="text-xs text-gray-600 mt-1">Partial</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 rounded-t-md h-12" style={{ backgroundColor: '#FFD700' }}></div>
                                <span className="text-xs text-gray-600 mt-1">Due</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 rounded-t-md h-16" style={{ backgroundColor: '#8A2BE2' }}></div>
                                <span className="text-xs text-gray-600 mt-1">Missed</span>
                            </div>
                        </div>
                    </ChartPlaceholder>
                </div>
                
            </div>
            
        </Box>
    );
}

export default OutcomeOverviewReport;
