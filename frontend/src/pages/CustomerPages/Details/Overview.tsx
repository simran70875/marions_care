
// --- Mock Data ---
export const clientData = {
  clientNo: '230691',
  name: "Charles 'O Connor",
  dob: '23-Apr-1998 (Age:27)',
  sex: 'Male',
  address: 'Longmire Centre, 181 Langley Lane, Wythenshaw, Manchester',
  postCode: 'M22 4HY',
  phone: '07444180607',
  profileImage: 'https://atscaleconference.com/wp-content/uploads/2022/08/image-placeholder-person.jpg', // Placeholder URL
};

const activityData = [
  { time: '20 Oct 2025 09:37 am', text: "New Customer Comment added for **Charles 'O Connor** by Office Ch" },
  { time: '20 Oct 2025 08:07 am', text: 'Feven Weldeselawit Clocked Out For Work With **Charles \'O Connor** Early Logging Out by 0:00:17.' },
  { time: '20 Oct 2025 07:33 am', text: 'Feven Weldeselawit Clocked In For Work With **Charles \'O Connor** Late Logging In by 0:06:33.' },
  { time: '19 Oct 2025 10:17 pm', text: 'Mercy Anuoluwapo Clocked Out For Work With **Charles \'O Connor** Early Logging Out by 0:47:58.' },
  { time: '19 Oct 2025 09:54 pm', text: 'Mercy Anuoluwapo Clocked In For Work With **Charles \'O Connor** Early Logging In by 0:40:58.' },
  { time: '19 Oct 2025 07:02 pm', text: 'Bunmi Christiana Junaid Clocked Out For Work With **Charles \'O Connor** Early Logging Out by 0:22:58.' },
];

// --- Mock Components for Structure ---

// Component for the main customer information card
const ClientInformationCard = ({ data }: { data: typeof clientData }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-100 dark:border-gray-700 flex items-center">
      <i className="fas fa-info-circle mr-2 text-blue-600"></i> Customer Information
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">
      {/* Left Column: Profile Picture and Name */}
      <div className="flex flex-col items-start space-y-3">
        <img
          src={data.profileImage}
          alt="Customer Profile"
          className="w-24 h-24 rounded-full border-2 border-blue-400 object-cover"
        />
        <div className="text-left">
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {data.name}
          </p>
          <button className="mt-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition duration-150">
            Edit Details
          </button>
        </div>
      </div>

      {/* Middle Column: Core Details */}
      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">Customer No:</span> {data.clientNo}
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">Date of Birth:</span> {data.dob}
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">Sex:</span> {data.sex}
        </p>
      </div>

      {/* Right Column: Contact/Location */}
      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">Address:</span> {data.address}
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">Post Code:</span> {data.postCode}
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">Phone (Home):</span> {data.phone}
        </p>
      </div>
    </div>
  </div>
);

// Component for the Recent Activity card
const RecentActivityCard = ({ activity }: { activity: typeof activityData }) => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 md:col-span-2">
    <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Recent Activity
      </h2>
      <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
        View all
      </button>
    </div>
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {activity.map((item, index) => (
        <div key={index} className="border-l-2 border-orange-400 pl-3 text-sm">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {item.time}
          </p>
          {/* This uses a simple regex to bold text between ** which mimics the visual in the screenshot */}
          <p
            className="text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: item.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }}
          ></p>
        </div>
      ))}
    </div>
  </div>
);

// Component for the Plans card
const PlansCard = () => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
    <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Plans <span className="text-blue-600 dark:text-blue-400 ml-1">4</span>
      </h2>
      <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
        Click to view
      </button>
    </div>
    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
      <p className="font-semibold">
        <span className="text-green-600">4 Completed</span>
      </p>
      <p className="font-semibold">
        <span className="text-red-500">0 Pending</span>
      </p>
    </div>
  </div>
);

// --- The Overview Tab Component ---
export default function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Customer Information Card (Top Section) */}
      <ClientInformationCard data={clientData} />

      {/* Bottom Section: Activity and Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Activity (Takes up 2/3rds width) */}
        <RecentActivityCard activity={activityData} />

        {/* Plans (Takes up 1/3rd width) */}
        <PlansCard />
      </div>
    </div>
  );
}

// For use in a larger file, you would also export the individual mock components or ensure they are defined in scope.
// You will need to have Tailwind CSS configured in your project for these classes to work.