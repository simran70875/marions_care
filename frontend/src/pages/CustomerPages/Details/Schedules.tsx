import React, { useState, useMemo } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addDays,
  getDay
} from 'date-fns';

// =================================================================
// 1. TYPES
// =================================================================

type ShiftStatus = 'Scheduled' | 'Medication' | 'Overnight' | 'NoCarer' | 'Cancelled' | 'Recurring';

interface Shift {
    id: string | number;
    time: string;
    staff: string;
    tags: string[];
    status: ShiftStatus;
    date: Date;
}

// =================================================================
// 2. MOCK DATA GENERATOR (Consistent with your previous logic)
// =================================================================

const generateInitialShifts = (monthDate: Date): Shift[] => {
    const shifts: Shift[] = [];
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    
    for (let day = 1; day <= 31; day++) {
        const date = new Date(year, month, day);
        if (date.getMonth() !== month) break;

        const dayNum = date.getDate();
        const dayOfWeek = getDay(date); 

        if (dayOfWeek !== 0 && dayOfWeek !== 6) { 
            shifts.push({ id: `s1-${dayNum}`, date, time: "07:25 - 08:10", staff: "Even Weldedawet", tags: ["M", "S"], status: "Scheduled" });
            shifts.push({ id: `s2-${dayNum}`, date, time: "13:55 - 14:25", staff: "Even Weldedawet", tags: ["M", "S"], status: "Scheduled" });
        }
        if (dayNum % 5 === 0) { 
            shifts.push({ id: `s3-${dayNum}`, date, time: "18:40 - 19:10", staff: "Mercy Anukuawapo", tags: ["P", "M", "S"], status: "Medication" });
        }
        if (dayNum % 3 === 0) {
            shifts.push({ id: `s4-${dayNum}`, date, time: "22:30 - 22:50", staff: "Even Weldedawet", tags: ["OV"], status: "Overnight" });
        }
        if (dayNum === 27 || dayNum === 28) { 
            shifts.push({ id: `s5-${dayNum}`, date, time: "18:55 - 19:25", staff: "No Carer Entered", tags: [], status: "NoCarer" });
        }
    }
    return shifts;
};

// =================================================================
// 3. COMPONENTS
// =================================================================

const LegendItem: React.FC<{ color: string, label: string }> = ({ color, label }) => (
    <div className="flex items-center text-sm text-gray-700 mx-2 my-1">
        <span className={`w-3 h-3 rounded-full mr-2 ${color} border border-gray-300`}></span>
        {label}
    </div>
);

const ShiftCard: React.FC<{ shift: Shift; onClick: (s: Shift) => void }> = ({ shift, onClick }) => {
    let styles = 'bg-green-100 border-green-400 text-green-800';
    if (shift.status === 'Medication') styles = 'bg-pink-100 border-pink-400 text-pink-800';
    if (shift.status === 'Overnight') styles = 'bg-blue-100 border-blue-400 text-blue-800';
    if (shift.status === 'Cancelled') styles = 'bg-red-100 border-red-400 text-red-800';
    if (shift.status === 'NoCarer') styles = 'bg-yellow-200 border-yellow-500 text-yellow-900 font-bold';

    return (
        <div 
            onClick={(e) => { e.stopPropagation(); onClick(shift); }}
            className={`w-full text-[10px] p-1 mt-1 rounded-sm cursor-pointer shadow-sm border transition-all hover:shadow-md ${styles}`}
            title={`${shift.staff} (${shift.time}) - Status: ${shift.status}`}
        >
            <div className="flex justify-between items-center font-bold">
                <span className="leading-tight">{shift.time}</span>
                <span className="flex space-x-0.5">
                    {shift.tags.map((tag, i) => (
                        <span key={i} className="bg-gray-600 text-white px-[3px] rounded text-[8px] leading-none">{tag}</span>
                    ))}
                </span>
            </div>
            <p className="mt-0.5 truncate leading-tight opacity-90">{shift.staff}</p>
        </div>
    );
};

// =================================================================
// 4. MAIN PAGE
// =================================================================

const ClientSchedulePage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1));
    const [shifts, setShifts] = useState<Shift[]>(() => generateInitialShifts(new Date(2025, 9, 1)));
    
    // UI Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShift, setEditingShift] = useState<Partial<Shift> | null>(null);
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    const clientInfo = {
        name: "CHARLES 'O CONNOR",
        address: "Longmire Centre, 181 Langley Lane Wythenshawe Manchester",
        MAHrs: "55:20"
    };

    // Calendar Grid Logic
    const calendarDays = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
        const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
        let days = eachDayOfInterval({ start, end });
        
        // Ensure 6-week grid
        if (days.length < 42) {
            const lastDay = days[days.length - 1];
            const extraDays = eachDayOfInterval({
                start: addDays(lastDay, 1),
                end: addDays(lastDay, 42 - days.length)
            });
            days = [...days, ...extraDays];
        }
        return days;
    }, [currentDate]);

    // CRUD Handlers
    const openAddModal = (date: Date) => {
        setSelectedDay(date);
        setEditingShift({ time: '09:00 - 10:00', staff: '', status: 'Scheduled', tags: ['S'] });
        setIsModalOpen(true);
    };

    const openEditModal = (shift: Shift) => {
        setEditingShift(shift);
        setSelectedDay(shift.date);
        setIsModalOpen(true);
    };

    const handleSaveShift = () => {
        if (!editingShift || !selectedDay) return;
        if (editingShift.id) {
            setShifts(prev => prev.map(s => s.id === editingShift.id ? { ...editingShift, date: selectedDay } as Shift : s));
        } else {
            const newShift: Shift = {
                ...editingShift,
                id: Date.now(),
                date: selectedDay
            } as Shift;
            setShifts(prev => [...prev, newShift]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteShift = () => {
        setShifts(prev => prev.filter(s => s.id !== editingShift?.id));
        setIsModalOpen(false);
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {/* Top Header & Client Info Section */}
            <div className="bg-white rounded-lg shadow-xl p-4 mb-4 border-t-4 border-blue-600">
                <h1 className="text-2xl font-bold text-gray-800">
                    <span className="text-blue-600">&gt;</span> Schedule
                </h1>
                
                {/* NEW TOP CONTENT BLOCK */}
                <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 text-sm rounded-md border border-yellow-200">
                    <p className="font-medium">Hover over events for more details</p>
                    <div className="flex flex-wrap mt-1">
                        <LegendItem color="bg-blue-600" label="Recurring Event" />
                        <LegendItem color="bg-pink-500" label="Single Event" />
                    </div>
                </div>
                
                <p className="mt-3 text-sm text-gray-700 font-semibold">
                    Client selected: <span className="text-blue-700">{clientInfo.name}</span> - {clientInfo.address}
                </p>

                {/* Navigation and Stats */}
                <div className="flex flex-wrap justify-between items-center mt-6 pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors shadow-sm text-sm font-semibold">&lt; Prev Month</button>
                        <h2 className="text-xl font-bold text-gray-800 w-48 text-center uppercase">{format(currentDate, 'MMMM yyyy')}</h2>
                        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors shadow-sm text-sm font-semibold">Next Month &gt;</button>
                    </div>

                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                        <p className="text-lg font-bold text-gray-700">M.A.Hrs: <span className="text-blue-600">{clientInfo.MAHrs}</span></p>
                        <button className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm font-semibold">Print</button>
                    </div>
                </div>

                {/* Status Color Legend */}
                <div className="flex flex-wrap justify-center p-2 bg-white rounded-lg shadow-inner mt-4 border border-gray-200">
                    <LegendItem color="bg-lime-500" label="In-progress" />
                    <LegendItem color="bg-red-500" label="Cancelled" />
                    <LegendItem color="bg-yellow-400" label="Not Assigned" />
                    <LegendItem color="bg-indigo-500" label="Bank Holiday" />
                    <LegendItem color="bg-blue-600" label="Recurring Event" />
                    <LegendItem color="bg-pink-500" label="Single Event" />
                    <LegendItem color="bg-green-500" label="Change Status" />
                </div>

                {/* Calendar Grid */}
                <div className="mt-4 border rounded-lg overflow-hidden bg-gray-200 gap-px grid grid-cols-[50px_repeat(7,1fr)] shadow-inner">
                    <div className="bg-gray-200 p-2 text-center text-xs font-bold text-gray-700">AW</div>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                        <div key={d} className="bg-gray-50 p-2 text-center text-xs font-bold uppercase text-gray-600">{d}</div>
                    ))}

                    {calendarDays.map((day, i) => {
                        const isAW = i % 7 === 0;
                        const dayShifts = shifts.filter(s => isSameDay(s.date, day));
                        
                        if (isAW) {
                            return <div key={`aw-${i}`} className="bg-gray-200 flex flex-col items-center justify-start pt-2 border-r border-gray-300 font-bold text-gray-700">
                                <span className="text-[10px]">AW</span>
                                <span className="text-lg">{40 + Math.floor(i/7)}</span>
                            </div>;
                        }

                        return (
                            <div 
                                key={day.toString()} 
                                onClick={() => openAddModal(day)}
                                className={`min-h-[120px] p-1 transition-colors relative ${isSameMonth(day, currentDate) ? 'bg-white' : 'bg-gray-50 text-gray-400'} ${isSameDay(day, new Date()) ? 'bg-blue-100 ring-2 ring-blue-400 ring-inset' : ''} hover:bg-blue-50 cursor-pointer`}
                            >
                                <div className="flex justify-between items-start text-sm font-bold p-1">
                                    <span className="text-lg">{format(day, 'd')}</span>
                                    {dayShifts.length > 0 && <span className="w-2 h-2 rounded-full bg-lime-500"></span>}
                                </div>
                                {dayShifts.map(s => <ShiftCard key={s.id} shift={s} onClick={openEditModal} />)}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Action Bar */}
            <div className="flex flex-wrap justify-between items-center p-4 bg-white rounded-lg shadow-lg border">
                <div className="flex space-x-3">
                    <button onClick={() => openAddModal(new Date())} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition-all flex items-center">
                        <span className="text-xl mr-2">📅</span> Add Shift
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition-all flex items-center">
                        <span className="text-xl mr-2">🔄</span> Recur
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-green-700 transition-all flex items-center">
                        <span className="text-xl mr-2">✉️</span> Publish
                    </button>
                </div>
            </div>

            {/* Shift Modal (Admin Only View) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-blue-600 p-4 text-white">
                            <h3 className="text-lg font-bold">{editingShift?.id ? 'Modify Shift' : 'Create New Shift'}</h3>
                            <p className="text-xs opacity-80">{selectedDay && format(selectedDay, 'EEEE, MMMM do yyyy')}</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase">Staff Assigned</label>
                                <input type="text" className="w-full border-b-2 border-gray-200 focus:border-blue-600 outline-none p-2 text-sm font-medium" 
                                    value={editingShift?.staff || ''} onChange={e => setEditingShift({...editingShift, staff: e.target.value})} placeholder="Full name" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase">Shift Time</label>
                                    <input type="text" className="w-full border-b-2 border-gray-200 focus:border-blue-600 outline-none p-2 text-sm" 
                                        value={editingShift?.time || ''} onChange={e => setEditingShift({...editingShift, time: e.target.value})} placeholder="00:00 - 00:00" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase">Category</label>
                                    <select className="w-full border-b-2 border-gray-200 focus:border-blue-600 outline-none p-2 text-sm"
                                        value={editingShift?.status} onChange={e => setEditingShift({...editingShift, status: e.target.value as ShiftStatus})}>
                                        <option value="Scheduled">Scheduled</option>
                                        <option value="Medication">Medication</option>
                                        <option value="Overnight">Overnight</option>
                                        <option value="NoCarer">No Carer</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 flex justify-between">
                            {editingShift?.id && (
                                <button onClick={handleDeleteShift} className="text-red-500 text-sm font-bold hover:underline">Delete Entry</button>
                            )}
                            <div className="flex space-x-3 ml-auto">
                                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 text-sm font-bold">Close</button>
                                <button onClick={handleSaveShift} className="bg-blue-600 text-white px-6 py-2 rounded shadow-md text-sm font-bold hover:bg-blue-700">Apply Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientSchedulePage;