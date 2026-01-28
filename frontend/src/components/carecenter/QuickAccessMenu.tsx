export default function QuickAccessMenu() {
  const shortcuts = [
    { title: "Wall Chart" },
    { title: "Clock-in Status" },
    { title: "Timesheet Maps" },
    { title: "KPI" },
    { title: "Assessments" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-3">Quick Access</h3>
      <div>
        {shortcuts.map((s, i) => (
          <button
            key={i}
            className="w-[100%] mb-2 p-4 text-sm font-medium bg-gray-50 rounded-lg dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {s.title}
          </button>
        ))}
      </div>
    </div>
  );
}
