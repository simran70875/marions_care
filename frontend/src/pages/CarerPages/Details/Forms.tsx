
// --- Mock Data for Forms Tab (Plans Completed) ---
const formsData = [
  {
    name: 'Customer Onboarding',
    createdBy: 'Office Chorlton',
    created: '20 Aug 2025 15:05',
    effectiveDate: '29-02-2026',
    completed: '20 Oct 2025 11:21',
    newAssessment: 'No',
    revisionNumber: 'Revision Number:',
    reviewDate: '14 Apr 2026',
  },
  {
    name: 'Quality Assurance',
    createdBy: 'Office Chorlton',
    created: '13 Oct 2025 08:58',
    effectiveDate: '29-04-2025',
    completed: '13 Oct 2025 10:21',
    newAssessment: 'No',
    revisionNumber: 'Revision Number:',
    reviewDate: '13 Nov 2025',
  },
  {
    name: 'Consent',
    createdBy: 'Office Ch',
    created: '03 Sep 2025 11:50',
    effectiveDate: '19-03-2025',
    completed: '03 Sep 2025 11:53',
    newAssessment: 'No',
    revisionNumber: 'Revision Number:',
    reviewDate: '03 Feb 2026',
  },
  {
    name: 'Quality Assurance',
    createdBy: 'Office Chorlton',
    created: '01 Sep 2025 16:07',
    effectiveDate: '29-04-2025',
    completed: '01 Sep 2025 16:15',
    newAssessment: 'Yes',
    revisionNumber: 'Revision Number:',
    reviewDate: '15 Sep 2025',
  },
];

// --- The Forms Tab Component (Plans Completed) ---
export default function FormsTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 p-4">
      
      {/* Information Banner */}
      <div className="p-3 mb-4 text-xs bg-blue-50 border-l-4 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200">
        <i className="fas fa-info-circle mr-2"></i>
        For an updated view of Plans/Forms, click on **"Plans Details"** on the left hand navigational menu of this customer profile. Alternatively, click **(here)**.
      </div>

      {/* Plans Header and Status */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Plans Completed
        </h2>
        <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition">
          Click to View List of Plans
        </button>
      </div>

      {/* Plans Summary and Fill Out Button */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="text-lg text-gray-700 dark:text-gray-300">
          <span className="font-bold text-green-600 dark:text-green-400">4 Completed</span>
          <span className="mx-2">|</span>
          <span className="font-bold text-red-600 dark:text-red-400">0 Pending</span>
        </div>
        <button className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900 transition">
          Fill Out New Plan/Form
        </button>
      </div>

      {/* Plans List (Card-like layout) */}
      <div className="space-y-6">
        {formsData.map((plan, index) => (
          <div key={index} className="flex space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/50 items-start">
            
            {/* Profile Avatar Placeholder */}
            <div className="w-16 flex-shrink-0 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mb-1">
                {/* SVG/Icon Placeholder */}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center">{plan.createdBy}</span>
            </div>

            {/* Form Details - Left Column */}
            <div className="w-1/3 text-xs space-y-1 text-gray-700 dark:text-gray-300">
              <p><strong>Created:</strong> {plan.created}</p>
              <p><strong>Effective Date:</strong> {plan.effectiveDate}</p>
              <p><strong>Completed:</strong> {plan.completed}</p>
            </div>

            {/* Form Details - Middle Column (Revision) */}
            <div className="w-1/3 text-xs space-y-1 text-gray-700 dark:text-gray-300">
              <p><strong>New Assessment Started:</strong> <span className={plan.newAssessment === 'Yes' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{plan.newAssessment}</span></p>
              <p><strong>Revision Number:</strong> <span className='font-normal'>Revision Number:</span></p>
              <p><strong>Review Date:</strong> {plan.reviewDate}</p>
            </div>

            {/* Form Details - Right Column (Actions) */}
            <div className="w-1/3 space-y-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Filled by {plan.createdBy}</p>
              <button className="px-3 py-1 text-sm bg-gray-200 text-blue-600 rounded-md border border-blue-300 hover:bg-gray-100 dark:bg-gray-600 dark:text-blue-300 dark:hover:bg-gray-500 transition">
                ( Click Here To View Forms )
              </button>
              <div className="flex space-x-2 pt-1">
                <button className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition">Print All (New)</button>
                <button className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition">Print All</button>
                <button className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition">Web View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}