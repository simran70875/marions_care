import React, { useState } from 'react';

// ----------------------------------------------------------------------
// ADD NEW TAB FORM COMPONENT
// This component is extracted from the user's previous request.
// ----------------------------------------------------------------------
export const AddNewTabForm = ({
  tabs,
  setTabs,
  onClose,
}: {
  tabs: string[];
  setTabs: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: () => void;
}) => {
  const [tabName, setTabName] = useState("");
  const [hoverText, setHoverText] = useState("");
  const [description, setDescription] = useState("");
  const [accessAdmin, setAccessAdmin] = useState(true);
  const [accessCarer, setAccessCarer] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [setPassword, setSetPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTabName = tabName.trim();

    if (newTabName) {
      if (!tabs.includes(newTabName)) {
        setTabs([...tabs, newTabName]);
        // Optionally switch to the new tab upon creation
        // setActiveTab(newTabName);
      }
      onClose(); // Close the form after submission
    }
  };

  const inputClass =
    "w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 space-y-4 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        Add New Tab To All Customers
      </h2>

      {/* Tab Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tab Name <span className="text-red-500">(required)</span>
        </label>
        <input
          type="text"
          value={tabName}
          onChange={(e) => setTabName(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      {/* Hover over text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Hover over text <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          value={hoverText}
          onChange={(e) => setHoverText(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Tab description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tab description will appear in tab
          <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        ></textarea>
      </div>

      {/* Tab Access Checkboxes */}
      <div className="pt-2 space-y-2">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Tab Access
        </p>

        <div className="space-y-1">
          {/* Office Admin Access */}
          <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={accessAdmin}
              onChange={(e) => setAccessAdmin(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2">Office Admin</span>
          </label>

          {/* Carer Access */}
          <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={accessCarer}
              onChange={(e) => setAccessCarer(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2">
              Carer
              <span className="text-xs text-gray-500">
                (Access has to be set up in caring App)
              </span>
            </span>
          </label>

          {/* File Upload Option */}
          <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={fileUpload}
              onChange={(e) => setFileUpload(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2">File Upload Option</span>
          </label>

          {/* Set Password */}
          <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={setPassword}
              onChange={(e) => setSetPassword(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2">Set Password</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-150 shadow-md"
        >
          Save
        </button>
      </div>
    </form>
  );
};