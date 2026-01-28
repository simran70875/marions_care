import React from 'react';
import { Clock, CheckCircle, BookOpen, ChevronDown, Archive, Users, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';

// --- Type Definitions ---

interface ClientPlanRecord {
    id: string;
    plan: string;
    filledBy: string;
    started: string; // Date + Time
    lastUpdated: string; // Date + Time
    reviewDate: string; // Date
    planStatus: 'Completed' | 'Draft' | 'Pending Review';
    historyUpdates: number;
}

// --- Mock Data ---

const MOCK_RECORDS: ClientPlanRecord[] = [
    {
        id: '1',
        plan: 'Quality Assurance',
        filledBy: 'Office Charlton',
        started: '13 Oct 2025 08:58',
        lastUpdated: '13 Oct 2025 10:21',
        reviewDate: '13 Nov 2025', // Near future, highlight
        planStatus: 'Completed',
        historyUpdates: 0,
    },
    {
        id: '2',
        plan: 'Consent',
        filledBy: 'Office Ch',
        started: '03 Sep 2025 11:50',
        lastUpdated: '03 Sep 2025 11:53',
        reviewDate: '03 Feb 2026',
        planStatus: 'Completed',
        historyUpdates: 0,
    },
    {
        id: '3',
        plan: 'Quality Assurance',
        filledBy: 'Office Charlton',
        started: '01 Sep 2025 16:07',
        lastUpdated: '01 Sep 2025 16:15',
        reviewDate: '15 Sep 2026',
        planStatus: 'Completed',
        historyUpdates: 0,
    },
    {
        id: '4',
        plan: 'Client Onboarding',
        filledBy: 'Office Charlton',
        started: '29 Aug 2025 15:05',
        lastUpdated: '20 Oct 2025 13:35',
        reviewDate: '18 Mar 2026',
        planStatus: 'Completed',
        historyUpdates: 2, // Has updates
    },
    {
        id: '5',
        plan: 'Risk Assessment',
        filledBy: 'Jane Doe',
        started: '25 Oct 2025 09:00',
        lastUpdated: '25 Oct 2025 09:00',
        reviewDate: '25 Oct 2026',
        planStatus: 'Draft',
        historyUpdates: 0,
    },
];

// --- Sub-Components ---

const StatusChip: React.FC<{ status: ClientPlanRecord['planStatus'] }> = ({ status }) => {
    let classes = '';
    let icon = null;

    switch (status) {
        case 'Completed':
            classes = 'bg-green-100 text-green-800';
            icon = <CheckCircle className="w-4 h-4 mr-1" />;
            break;
        case 'Pending Review':
            classes = 'bg-yellow-100 text-yellow-800';
            icon = <Clock className="w-4 h-4 mr-1" />;
            break;
        case 'Draft':
            classes = 'bg-blue-100 text-blue-800';
            icon = <FileText className="w-4 h-4 mr-1" />;
            break;
        default:
            return null;
    }

    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full w-28 justify-center ${classes}`}>
            {icon}
            {status}
        </span>
    );
};

const PlansTable: React.FC<{ records: ClientPlanRecord[] }> = ({ records }) => {
    const handleAction = (planId: string, action: string) => {
        console.log(`Plan ID: ${planId}, Action: ${action} triggered.`);
    };

    const navigate = useNavigate();


    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div className="flex space-x-3 text-sm font-medium">
                    <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">Rows</button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">Print</button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">Excel</button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center">
                        Column visibility <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                </div>
                <input
                    type="search"
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded-md text-sm focus:ring-purple-500 focus:border-purple-500"
                />
            </div>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Filled by</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Started</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Review Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Signature</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">View Forms</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">View / Print</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">History</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Archive</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {records.map((record, index) => {
                        // Check if review date is in the near future (e.g., within 3 months) for highlighting
                        const reviewDate = new Date(record.reviewDate);
                        const today = new Date();
                        const threeMonthsFromNow = new Date();
                        threeMonthsFromNow.setMonth(today.getMonth() + 3);

                        const isReviewDue = reviewDate > today && reviewDate < threeMonthsFromNow;
                        const reviewDateClass = isReviewDue ? 'font-bold text-orange-600' : 'text-gray-800';

                        return (

                            
                            <tr key={record.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td onClick={() => navigate("/customer/plans/plan/web-view")}  className="px-4 py-3 whitespace-nowrap text-sm font-medium text-purple-600 hover:text-purple-700 cursor-pointer">
                                    {record.plan}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.filledBy}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.started}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.lastUpdated}</td>
                                <td className={`px-4 py-3 whitespace-nowrap text-sm ${reviewDateClass}`}>
                                    {record.reviewDate}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <StatusChip status={record.planStatus} />
                                </td>
                                {/* Action Buttons */}
                                <td className="px-2 py-3 whitespace-nowrap">
                                    <button
                                        onClick={() => handleAction(record.id, 'View Signature')}
                                        className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition-colors shadow-sm"
                                    >
                                        View Signature
                                    </button>
                                </td>
                                <td className="px-2 py-3 whitespace-nowrap">
                                    <button
                                        onClick={() => handleAction(record.id, 'View Forms')}
                                        className="text-xs bg-sky-500 text-white px-2 py-1 rounded hover:bg-sky-600 transition-colors shadow-sm"
                                    >
                                        View Forms
                                    </button>
                                </td>
                                <td className="px-2 py-3 whitespace-nowrap flex space-x-1">
                                    <button
                                        onClick={() => handleAction(record.id, 'Web View')}
                                        className="text-xs bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition-colors shadow-sm"
                                    >
                                        Web View
                                    </button>
                                    <button
                                        onClick={() => handleAction(record.id, 'Print All')}
                                        className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition-colors shadow-sm"
                                    >
                                        Print All
                                    </button>
                                </td>
                                <td className="px-2 py-3 whitespace-nowrap">
                                    {record.historyUpdates > 0 ? (
                                        <button
                                            onClick={() => handleAction(record.id, 'View Updated History')}
                                            className="text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 transition-colors shadow-sm flex items-center"
                                        >
                                            <Clock className="w-3 h-3 mr-1" />
                                            View Updated History ({record.historyUpdates})
                                        </button>
                                    ) : (
                                        <span className="text-xs text-gray-500">-</span>
                                    )}
                                </td>
                                <td className="px-2 py-3 whitespace-nowrap">
                                    <button
                                        onClick={() => handleAction(record.id, 'Archive')}
                                        className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors shadow-sm flex items-center"
                                    >
                                        <Archive className="w-3 h-3 mr-1" />
                                        Archive
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Pagination/Summary Footer */}
            <div className="flex justify-between items-center p-4 border-t border-gray-200 text-sm text-gray-700">
                <p>Showing 1 to {records.length} of {records.length} entries</p>
                <div className="flex items-center space-x-1">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed">Previous</button>
                    <button className="px-3 py-1 border border-purple-600 bg-purple-600 text-white rounded-md">1</button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">Next</button>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---


const ClientPlansOverview: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            {/* Header: Client Info and Top Actions */}
            <div className="mb-6 border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start flex-wrap gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Plan Details - Charles 'O CONNOR (Client ID: 10001)
                    </h1>
                    <div className="flex flex-wrap space-x-2">
                        <button className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors flex items-center">
                            <Archive className="w-4 h-4 inline mr-2" />
                            Archived Completed Plans
                        </button>
                        <button onClick={() => {
                            navigate('/customer/plans');
                        }} className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors flex items-center">
                            <BookOpen className="w-4 h-4 inline mr-2" />
                            Fill Out New Plan Form
                        </button>
                        <button className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-colors flex items-center">
                            <Users className="w-4 h-4 inline mr-2" />
                            Client Info
                        </button>
                    </div>
                </div>

                {/* Secondary Category Navigation (Mimicking the image) */}
                <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium">
                    <button className="px-3 py-1 bg-purple-600 text-white rounded-t-lg">All Categories</button>
                    <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-t-lg">Quality</button>
                    <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-t-lg">Care Planning</button>
                    <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-t-lg">Complaints</button>
                    <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-t-lg">Accidents and Incidents</button>
                    <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-t-lg">Safeguarding</button>
                </div>
            </div>

            <PlansTable records={MOCK_RECORDS} />

        </div>
    );
};

export default ClientPlansOverview;
