import { useState } from "react";
// Import all necessary tab components (Assuming these are defined elsewhere)
import OverviewTab from "./Overview";
import NotesTab from "./Notes";
import CommentsTab from "./Comments";
import TasksTab from "./Tasks";
import DocumentsTab from "./Documents";
import PostItTab from "./Postit";
import FormsTab from "./Forms";
import ExpensesTab from "./Expenses";
import DigitalTaskSheetTab from "./DigitalTaskSheet";
import { AddNewTabForm } from "./NewTab";

const initialTabs = [
  "Overview",
  "Notes",
  "Comments",
  "Tasks",
  "Documents",
  "Post-It",
  "Forms",
  "Expenses",
  "Digital Tasksheet",
];


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------------------------
export default function CarerDetailsPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [tabs, setTabs] = useState(initialTabs);
  // Use a separate state to show/hide the AddNewTabForms
  const [isAddingTab, setIsAddingTab] = useState(false);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    setIsAddingTab(false); // Hide form when clicking any content tab
  };

  const tabClass = (tabName: string) =>
    `px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
      activeTab === tabName
        ? "border-b-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    } whitespace-nowrap`;

  const addTabClass = `px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
    isAddingTab
      ? "border-b-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400" // Highlight when active
      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
  }`;

  // Map tab name to component
  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <OverviewTab />;
      case "Notes":
        return <NotesTab />;
      case "Comments":
        return <CommentsTab />;
      case "Tasks":
        return <TasksTab />;
      case "Documents":
        return <DocumentsTab />;
      case "Post-It":
        return <PostItTab />;
      case "Forms":
        return <FormsTab />;
      case "Expenses":
        return <ExpensesTab />;
      case "Digital Tasksheet":
        return <DigitalTaskSheetTab />;
      default:
        // Handle custom tabs
        if (tabs.includes(activeTab)) {
          return (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Custom Tab: {activeTab}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Content for the custom tab would go here.
              </p>
            </div>
          );
        }
        return (
          <div className="text-gray-500 dark:text-gray-400 p-6">
            Select a tab.
          </div>
        );
    }
  };

  return (
    <div className="p-0 bg-white dark:bg-gray-900 min-h-screen">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <nav className="-mb-px flex space-x-2 overflow-x-auto px-4">
          {/* Main Tabs */}
          {tabs.map((label) => (
            <button
              key={label}
              onClick={() => handleTabClick(label)}
              className={tabClass(label)}
            >
              {label}
            </button>
          ))}

          {/* Add New Tab Button */}
          <button
            onClick={() => {
              // Set isAddingTab to true and clear active content tab
              setIsAddingTab(true);
              setActiveTab("New Tab"); // Set a pseudo active tab for styling the button
            }}
            className={addTabClass}
            title="Add New Tab To All Carers"
          >
            <i className="fas fa-plus mr-1"></i> Add New Tab
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* Show AddNewTabForm when isAddingTab is true */}
        {isAddingTab ? (
          <div className="mb-6">
            <AddNewTabForm
              tabs={tabs}
              setTabs={setTabs}
              onClose={() => setIsAddingTab(false)}
            />
          </div>
        ) : (
          // Show active tab content otherwise
          renderTabContent()
        )}
      </div>
    </div>
  );
}
