import React, { useState, useMemo, useEffect } from "react";
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
} from "date-fns";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { useApi } from "../../../hooks/useApi";
import { shiftServices } from "../../../services/shiftServices";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { customerServices } from "../../../services/customerServices";

// =================================================================
// 1. TYPES
// =================================================================

type ShiftStatus =
  | "Scheduled"
  | "Medication"
  | "Overnight"
  | "NoCarer"
  | "Cancelled"
  | "Recurring";

interface Shift {
  id: string | number;
  time: string;
  customer: string; // 👈 show customer name
  customerId?: string | null;
  tags: string[];
  status: ShiftStatus;
  date: Date;
  remarks?: string;
  isRecurring?: boolean;
}

// =================================================================
// 3. COMPONENTS
// =================================================================

const LegendItem: React.FC<{ color: string; label: string }> = ({
  color,
  label,
}) => (
  <div className="flex items-center text-sm text-gray-700 mx-2 my-1">
    <span
      className={`w-3 h-3 rounded-full mr-2 ${color} border border-gray-300`}
    ></span>
    {label}
  </div>
);

const ShiftCard: React.FC<{ shift: Shift; onClick: (s: Shift) => void }> = ({
  shift,
  onClick,
}) => {
  let styles = "bg-green-100 border-green-400 text-green-800";
  if (shift.status === "Medication")
    styles = "bg-pink-100 border-pink-400 text-pink-800";
  if (shift.status === "Overnight")
    styles = "bg-blue-100 border-blue-400 text-blue-800";
  if (shift.status === "Cancelled")
    styles = "bg-red-100 border-red-400 text-red-800";
  if (shift.status === "NoCarer")
    styles = "bg-yellow-200 border-yellow-500 text-yellow-900 font-bold";

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(shift);
      }}
      className={`w-full text-[10px] p-1 mt-1 rounded-sm cursor-pointer shadow-sm border transition-all hover:shadow-md ${styles}`}
      title={`${shift.customer} (${shift.time}) - Status: ${shift.status}`}
    >
      <div className="font-bold">
        {shift.isRecurring && (
          <span className="text-[9px] text-blue-700 font-bold mr-1">🔁</span>
        )}
        <p className="mt-0.5 truncate leading-tight opacity-90">
          {shift.customer}
        </p>
        <span className="leading-tight">{shift.time}</span>
        {shift.remarks && (
          <p className="text-[9px] italic text-gray-600 truncate pb-3">
            {shift.remarks}
          </p>
        )}
        <span className="flex space-x-0.5">
          {shift.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-600 text-white h-5 w-5 flex items-center justify-center rounded text-sm leading-none"
            >
              {tag}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

// =================================================================
// 4. MAIN PAGE
// =================================================================

const CarerSchedulePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [carers, setCarers] = useState<any[]>([]);

  const { call, loading } = useApi<any>();
  const { carerId, firstName, lastName } = useSelector(
    (state: RootState) => state.selectedCarer,
  );

  const fetchShifts = async () => {
    if (!carerId) return;

    const month = format(currentDate, "yyyy-MM");
    const res = await call(shiftServices.getCarerShifts(carerId, month));

    const mapped: Shift[] = res.data.map((s: any) => ({
      id: s._id,
      date: new Date(s.date),
      time: `${s.startTime} - ${s.endTime}`,
      customer: s.customerId
        ? `${s.customerId.firstName} ${s.customerId.lastName}`
        : "No Client",
      status: s.status,
      tags: s.tags || [],
      remarks: s.remarks || "",
      isRecurring: !!s.isRecurring,
      customerId: s.customerId?._id || null,
    }));

    setShifts(mapped);
  };

  const fetchCustomers = async () => {
    const res = await call(customerServices.getUsers());
    setCarers(res.data);
  };

  useEffect(() => {
    fetchShifts();
  }, [carerId, currentDate]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  // UI Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Partial<Shift> | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

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
        end: addDays(lastDay, 42 - days.length),
      });
      days = [...days, ...extraDays];
    }
    return days;
  }, [currentDate]);

  // CRUD Handlers
  const openAddModal = (date: Date) => {
    setSelectedDay(date);
    setEditingShift({
      time: "09:00 - 10:00",
      status: "Scheduled",
      tags: ["S"],
      customerId: null,
    });
    setIsModalOpen(true);
  };

  const SHIFT_TAGS = [
    { key: "S", label: "Support" },
    { key: "M", label: "Medication" },
    { key: "OV", label: "Overnight" },
    { key: "BH", label: "Bank Holiday" },
    { key: "2C", label: "Two Carers" },
  ];

  const openEditModal = (shift: Shift) => {
    setEditingShift({
      id: shift.id,
      time: shift.time,
      status: shift.status,
      tags: [...(shift.tags || [])],
      remarks: shift.remarks || "",
      isRecurring: !!shift.isRecurring,
      customerId: shift.customerId || null,
    });

    setSelectedDay(shift.date);
    setIsModalOpen(true);
  };

  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const handleSaveShift = async () => {
    if (!selectedDay || !editingShift) return;

    if (!carerId) return toast("Carer id is required");

    if (!editingShift?.time?.includes("-")) {
      return toast("Invalid time format");
    }

    const [startTime, endTime] = editingShift
      .time!.split(" - ")
      .map((t) => t.trim());

    if (!startTime || !endTime) {
      return toast("Start time and end time are required");
    }

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    // same time = invalid
    if (startMinutes === endMinutes) {
      return toast("Start time and end time cannot be the same");
    }

    // overnight shift allowed
    const isOvernight = endMinutes < startMinutes;

    // optional: auto-set status
    if (isOvernight && editingShift.status !== "Overnight") {
      setEditingShift((prev) =>
        prev ? { ...prev, status: "Overnight" } : prev,
      );
    }

    const payload = {
      carerId,
      customerId: editingShift.customerId || null,
      date: selectedDay,
      startTime,
      endTime,
      status: editingShift.status,
      tags: editingShift.tags,
      remarks: editingShift.remarks || "",
      isRecurring: editingShift.isRecurring || false,
    };

    if (editingShift.id) {
      await call(shiftServices.updateShift(editingShift.id as string, payload));
    } else {
      await call(shiftServices.createShift(payload));
    }

    setIsModalOpen(false);
    fetchShifts();
  };

  const handleDeleteShift = async () => {
    if (!editingShift?.id) return;

    await call(shiftServices.deleteShift(editingShift.id as string));
    setIsModalOpen(false);
    fetchShifts();
  };

  const disabledBtn =
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-inherit";
  const splitTime = (time?: string) => {
    if (!time || !time.includes("-")) return { start: "", end: "" };
    const [start, end] = time.split("-").map((t) => t.trim());
    return { start, end };
  };

  const getShiftExportRows = () => {
    return shifts.map((s) => {
      const [startTime, endTime] = s.time.split(" - ");

      return {
        Date: format(s.date, "dd/MM/yyyy"),
        Day: format(s.date, "EEEE"),
        StartTime: startTime,
        EndTime: endTime,
        Carer: s.customer,
        Status: s.status,
        Tags: s.tags.join(", "),
        Recurring: s.isRecurring ? "Yes" : "No",
        Remarks: s.remarks || "",
      };
    });
  };
  const handleExport = (type: "csv" | "excel" | "print" | "copy") => {
    if (!shifts.length) {
      return toast("No shifts to export");
    }

    const rows = getShiftExportRows();

    // COPY
    if (type === "copy") {
      const text = rows.map((r) => Object.values(r).join("\t")).join("\n");
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
      return;
    }

    // PRINT
    if (type === "print") {
      const html = `
      <html>
        <head>
          <title>Shift Schedule</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; font-size: 12px; }
            th { background: #f3f4f6; }
          </style>
        </head>
        <body>
          <h2>Shift Schedule – ${format(currentDate, "MMMM yyyy")}</h2>
          <table>
            <thead>
              <tr>
                ${Object.keys(rows[0])
                  .map((h) => `<th>${h}</th>`)
                  .join("")}
              </tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (r) =>
                    `<tr>${Object.values(r)
                      .map((v) => `<td>${v}</td>`)
                      .join("")}</tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

      const win = window.open("", "_blank");
      win?.document.write(html);
      win?.document.close();
      win?.print();
      return;
    }

    // CSV / EXCEL
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Shifts");

    const buffer = XLSX.write(workbook, {
      bookType: type === "csv" ? "csv" : "xlsx",
      type: "array",
    });

    const blob = new Blob([buffer], {
      type:
        type === "csv"
          ? "text/csv;charset=utf-8;"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      blob,
      `shifts-${format(currentDate, "yyyy-MM")}.${type === "csv" ? "csv" : "xlsx"}`,
    );
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
          Client selected:{" "}
          <span className="text-blue-700">
            {firstName} {lastName}
          </span>
        </p>

        {/* Navigation and Stats */}
        <div className="flex flex-wrap justify-between items-center mt-6 pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              disabled={loading}
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className={`bg-gray-200 text-gray-700 px-3 py-1 rounded-lg shadow-sm text-sm font-semibold ${disabledBtn}`}
            >
              {loading ? "Loading..." : "< Prev Month"}
            </button>
            <h2 className="text-xl font-bold text-gray-800 w-48 text-center uppercase">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <button
              disabled={loading}
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className={`bg-gray-200 text-gray-700 px-3 py-1 rounded-lg shadow-sm text-sm font-semibold ${disabledBtn}`}
            >
              {loading ? "Loading..." : "Next Month >"}
            </button>{" "}
          </div>

          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <button
              onClick={() => handleExport("excel")}
              className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm font-semibold"
            >
              Export Excel
            </button>

            <button onClick={() => handleExport("csv")}>CSV</button>
            <button onClick={() => handleExport("print")}>Print</button>
            <button onClick={() => handleExport("copy")}>Copy</button>
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
          <div className="bg-gray-200 p-2 text-center text-xs font-bold text-gray-700">
            AW
          </div>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((d) => (
            <div
              key={d}
              className="bg-gray-50 p-2 text-center text-xs font-bold uppercase text-gray-600"
            >
              {d}
            </div>
          ))}

          {calendarDays.map((day, i) => {
            const isAW = i % 7 === 0;
            const dayShifts = shifts.filter((s) => isSameDay(s.date, day));

            if (isAW) {
              return (
                <div
                  key={`aw-${i}`}
                  className="bg-gray-200 flex flex-col items-center justify-start pt-2 border-r border-gray-300 font-bold text-gray-700"
                >
                  <span className="text-[10px]">AW</span>
                  <span className="text-lg">{40 + Math.floor(i / 7)}</span>
                </div>
              );
            }

            return (
              <div
                key={day.toString()}
                onClick={() => openAddModal(day)}
                className={`min-h-[120px] p-1 transition-colors relative ${isSameMonth(day, currentDate) ? "bg-white" : "bg-gray-50 text-gray-400"} ${isSameDay(day, new Date()) ? "bg-blue-100 ring-2 ring-blue-400 ring-inset" : ""} hover:bg-blue-50 cursor-pointer`}
              >
                <div className="flex justify-between items-start text-sm font-bold p-1">
                  <span className="text-lg">{format(day, "d")}</span>
                  {dayShifts.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-lime-500"></span>
                  )}
                </div>
                {dayShifts.map((s) => (
                  <ShiftCard key={s.id} shift={s} onClick={openEditModal} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="flex flex-wrap justify-between items-center p-4 bg-white rounded-lg shadow-lg border">
        <div className="flex space-x-3">
          <button
            disabled={loading}
            onClick={() => openAddModal(new Date())}
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow flex items-center ${disabledBtn}`}
          >
            {loading ? (
              "Please wait..."
            ) : (
              <>
                <span className="text-xl mr-2">📅</span> Add Shift
              </>
            )}
          </button>
        </div>
      </div>

      {/* Shift Modal (Admin Only View) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-99999 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-600 p-4 text-white">
              <h3 className="text-lg font-bold">
                {editingShift?.id ? "Modify Shift" : "Create New Shift"}
              </h3>
              <p className="text-xs opacity-80">
                {selectedDay && format(selectedDay, "EEEE, MMMM do yyyy")}
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">
                  Client Assigned
                </label>
                <select
                  className="w-full border-b-2 border-gray-200 focus:border-blue-600 outline-none p-2 text-sm"
                  value={editingShift?.customerId || ""}
                  onChange={(e) =>
                    setEditingShift((prev) =>
                      prev
                        ? { ...prev, customerId: e.target.value || null }
                        : prev,
                    )
                  }
                >
                  <option value="">No Carer</option>
                  {carers.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.firstName} {c.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">
                  Remarks / Notes
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-200 rounded p-2 text-sm focus:border-blue-600 outline-none"
                  placeholder="Eg: Client requested late visit, extra meds given..."
                  value={editingShift?.remarks || ""}
                  onChange={(e) =>
                    setEditingShift((prev) =>
                      prev ? { ...prev, remarks: e.target.value } : prev,
                    )
                  }
                />

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Tags
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {SHIFT_TAGS.map((t) => (
                      <label
                        key={t.key}
                        className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={editingShift?.tags?.includes(t.key) || false}
                          onChange={(e) =>
                            setEditingShift((prev) => {
                              if (!prev) return prev;

                              const tags = new Set(prev.tags || []);
                              e.target.checked
                                ? tags.add(t.key)
                                : tags.delete(t.key);

                              return { ...prev, tags: Array.from(tags) };
                            })
                          }
                        />
                        {t.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">
                    Shift Time
                  </label>

                  {(() => {
                    const { start, end } = splitTime(editingShift?.time);

                    return (
                      <div className="flex gap-2">
                        <input
                          type="time"
                          value={start}
                          onChange={(e) =>
                            setEditingShift((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    time: `${e.target.value} - ${end}`,
                                  }
                                : prev,
                            )
                          }
                          className="w-1/2 border-b-2 border-gray-200 focus:border-blue-600 outline-none p-2 text-sm"
                        />

                        <input
                          type="time"
                          value={end}
                          onChange={(e) =>
                            setEditingShift((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    time: `${start} - ${e.target.value}`,
                                  }
                                : prev,
                            )
                          }
                          className="w-1/2 border-b-2 border-gray-200 focus:border-blue-600 outline-none p-2 text-sm"
                        />
                      </div>
                    );
                  })()}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">
                    Category
                  </label>
                  <select
                    className="w-full border-b-2 border-gray-200 focus:border-blue-600 outline-none p-2 text-sm"
                    value={editingShift?.status}
                    onChange={(e) =>
                      setEditingShift({
                        ...editingShift,
                        status: e.target.value as ShiftStatus,
                      })
                    }
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Medication">Medication</option>
                    <option value="Overnight">Overnight</option>
                    <option value="NoCarer">No Carer</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingShift?.isRecurring || false}
                  onChange={(e) =>
                    setEditingShift((prev) =>
                      prev ? { ...prev, isRecurring: e.target.checked } : prev,
                    )
                  }
                />
                <label className="text-sm text-gray-700 font-medium">
                  Recurring Shift
                </label>
              </div>
            </div>
            <div className="bg-gray-50 p-4 flex justify-between">
              {editingShift?.id && (
                <button
                  disabled={loading}
                  onClick={handleDeleteShift}
                  className={`text-red-500 text-sm font-bold hover:underline ${disabledBtn}`}
                >
                  {loading ? "Deleting..." : "Delete Entry"}
                </button>
              )}
              <div className="flex space-x-3 ml-auto">
                <button
                  disabled={loading}
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 text-gray-500 text-sm font-bold ${disabledBtn}`}
                >
                  Close
                </button>
                <button
                  disabled={loading}
                  onClick={handleSaveShift}
                  className={`bg-blue-600 text-white px-6 py-2 rounded shadow-md text-sm font-bold ${disabledBtn}`}
                >
                  {loading ? "Saving..." : "Apply Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarerSchedulePage;
