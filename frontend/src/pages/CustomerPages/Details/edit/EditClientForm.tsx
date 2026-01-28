import React, { useState } from 'react';

// --- Type Definitions ---

interface SelectOption {
    label: string;
    value: string;
}

// Common props interface for both input and select components
interface CommonProps {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    checkable?: boolean;
    required?: boolean;
    isChecked?: boolean;
    name: string;
}

// Specific props for FormInput
interface FormInputProps extends CommonProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'date';
}

// Specific props for FormSelect
interface FormSelectProps extends CommonProps {
    options: SelectOption[];
}

interface ClientData {
    client_id: string;
    council_id: string;
    title: string;
    first_name: string;
    last_name: string;
    known_as: string;
    nationality: string;
    gender: string;
    marital_status: string;
    spouse_partner_name: string;
    travel_calculations: string;
    split_carer: string;
    email: string;
    invoice_discount: string;
    pay_for_travel: string;
    travel_deduction: string;
    contact_number: string;
    mobile_number: string;
    dob_day: string;
    dob_month: string;
    dob_year: string;
    first_contact_date: string;
    service_commenced: string;
    referral_by: string;
    referral_reason: string;
    referral_note: string;
    referral_date: string;
    contract_hours: string;
    contract_fee: string;
    nhs_number: string;
    invoice_cycle: string;
    current_address: string;
    town: string;
    county: string;
    postcode: string;
    unit: string;
    area: string;
    country: string;
    use_home_address: boolean;
    billing_code: string
}

// --- Helper Components ---

/**
 * Custom Input component to handle text inputs.
 */
const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, type = 'text', checkable = true, required = false, isChecked = true, name }) => (
    <div className="relative flex flex-col pt-5 pb-1">
        <label className="text-xs text-gray-600 font-medium absolute top-1.5 left-0">{label}{required && <span className="text-red-500">*</span>}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            className="w-full h-8 border border-gray-300 rounded-sm px-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
            disabled={!checkable}
        />
        {checkable && isChecked && (
            <svg className="w-4 h-4 text-green-500 absolute right-2 bottom-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
        )}
    </div>
);

/**
 * Custom Select component.
 */
const FormSelect: React.FC<FormSelectProps> = ({ label, value, onChange, options, checkable = true, required = false, isChecked = true, name }) => (
    <div className="relative flex flex-col pt-5 pb-1">
        <label className="text-xs text-gray-600 font-medium absolute top-1.5 left-0">{label}{required && <span className="text-red-500">*</span>}</label>
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                name={name}
                className="w-full h-8 border border-gray-300 rounded-sm px-2 text-sm text-gray-800 appearance-none bg-white pr-8 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                disabled={!checkable}
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <svg className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </div>
        {checkable && isChecked && (
            <svg className="w-4 h-4 text-green-500 absolute right-2 bottom-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
        )}
    </div>
);


// --- Main Form Component ---

const EditClientForm: React.FC = () => {
    // State to hold all form data
    const [clientData, setClientData] = useState<ClientData>({
        client_id: '230691',
        council_id: '',
        title: 'Mr',
        first_name: 'Charles',
        last_name: 'O\'CONNOR',
        known_as: 'Charles',
        nationality: 'English',
        gender: 'Male',
        marital_status: 'Partnered',
        spouse_partner_name: '',
        travel_calculations: 'No',
        split_carer: 'Yes',
        email: '',
        invoice_discount: '0',
        pay_for_travel: 'No',
        travel_deduction: '0',
        contact_number: '07444180807',
        mobile_number: '',
        dob_day: '23',
        dob_month: 'Apr',
        dob_year: '1988',
        first_contact_date: '19-08-2025',
        service_commenced: '0', // Invoice Cycle value in original image
        referral_by: 'Referral By',
        referral_reason: 'MCC',
        referral_note: '',
        referral_date: '0',
        contract_hours: '',
        contract_fee: '24',
        nhs_number: '638 134 4520',
        invoice_cycle: '',

        billing_code: "",
        // Address Details
        current_address: 'Longmire Centre, 181 Langley Lane',
        town: 'Wythenshaw',
        county: 'Manchester',
        postcode: 'M22 4HY',
        unit: 'Unit (if applies)',
        area: 'Wythenshawe',
        country: 'England',
        use_home_address: true, // Checkbox state
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const { name, value, type } = target;

        const newValue = type === 'checkbox' && 'checked' in target ? target.checked : value;

        setClientData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would send clientData to a server here.
        console.log('Client Data Submitted:', clientData);
        // Replaced alert with console log to comply with constraints
        console.log('Client details saved successfully!');
    };

    // Mock options for selects
    const mockOptions = {
        title: [{ label: 'Mr', value: 'Mr' }, { label: 'Ms', value: 'Ms' }, { label: 'Dr', value: 'Dr' }],
        gender: [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }],
        marital_status: [{ label: 'Partnered', value: 'Partnered' }, { label: 'Single', value: 'Single' }, { label: 'Married', value: 'Married' }],
        yes_no: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }],
        referral: [{ label: 'Referral By', value: 'Referral By' }, { label: 'Friend', value: 'Friend' }],
        reason: [{ label: 'MCC', value: 'MCC' }, { label: 'Private', value: 'Private' }],
        countries: [{ label: 'England', value: 'England' }, { label: 'Scotland', value: 'Scotland' }, { label: 'Wales', value: 'Wales' }],
        months: [
            { label: 'Jan', value: 'Jan' }, { label: 'Feb', value: 'Feb' }, { label: 'Mar', value: 'Mar' },
            { label: 'Apr', value: 'Apr' }, { label: 'May', value: 'May' }, { label: 'Jun', value: 'Jun' },
            { label: 'Jul', value: 'Jul' }, { label: 'Aug', value: 'Aug' }, { label: 'Sep', value: 'Sep' },
            { label: 'Oct', value: 'Oct' }, { label: 'Nov', value: 'Nov' }, { label: 'Dec', value: 'Dec' }
        ],
        days: Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` })),
        years: Array.from({ length: 50 }, (_, i) => ({ label: `${2025 - i}`, value: `${2025 - i}` }))
    };

    return (
        <div className="min-h-screen font-sans p-4 sm:p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">

                {/* Header Banner */}
                <div className="bg-blue-700 text-white p-3 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Client &gt; Edit Client &gt; Client Details</h1>

                </div>

                {/* Main Content Area */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6">

                    {/* Top Alert Bar */}
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg mb-4 text-sm font-medium">
                        Client Health Update! <a href="#" className="text-blue-700 underline ml-2">Click here to try out the new Client Edit Page</a>
                    </div>

                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-lg mb-6 text-sm">
                        <span className="font-bold">New</span> - Gender options can now be customised in Company Settings
                    </div>

                    {/* EDIT CLIENT SECTION */}
                    <div className="border border-gray-300 rounded-lg shadow-md mb-8">
                        <div className="bg-gray-200 px-4 py-3 border-b border-gray-300 flex justify-between items-center rounded-t-lg">
                            <h2 className="text-lg font-bold text-gray-800">&gt; Edit Client</h2>
                            <div className="text-sm font-medium text-green-600">
                                <span className="bg-green-200 px-2 py-0.5 rounded-full inline-flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Required Field
                                </span>
                            </div>
                        </div>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
                            {/* Column 1 */}
                            <div className="space-y-1">
                                <FormInput label="Client ID" value={clientData.client_id} onChange={(e) => handleChange(e)} name="client_id" checkable={false} />
                                <FormSelect label="Title" value={clientData.title} onChange={(e) => handleChange(e)} name="title" options={mockOptions.title} />
                                <FormInput label="First Name" value={clientData.first_name} onChange={(e) => handleChange(e)} name="first_name" required />
                                <FormInput label="Known As" value={clientData.known_as} onChange={(e) => handleChange(e)} name="known_as" />
                                <FormSelect label="Marital Status" value={clientData.marital_status} onChange={(e) => handleChange(e)} name="marital_status" options={mockOptions.marital_status} />
                                <div className="grid grid-cols-3 gap-2">
                                    <FormSelect label="Day" value={clientData.dob_day} onChange={(e) => handleChange(e)} name="dob_day" options={mockOptions.days} checkable={false} />
                                    <FormSelect label="Month" value={clientData.dob_month} onChange={(e) => handleChange(e)} name="dob_month" options={mockOptions.months} checkable={false} />
                                    <FormSelect label="Year" value={clientData.dob_year} onChange={(e) => handleChange(e)} name="dob_year" options={mockOptions.years} checkable={false} />
                                </div>
                                <FormInput label="Contact Number" value={clientData.contact_number} onChange={(e) => handleChange(e)} name="contact_number" required />
                                <FormInput label="First Contact Date" value={clientData.first_contact_date} onChange={(e) => handleChange(e)} name="first_contact_date" checkable={false} />
                                <FormSelect label="Referral By" value={clientData.referral_by} onChange={(e) => handleChange(e)} name="referral_by" options={mockOptions.referral} />
                                <FormInput label="Referral Note" value={clientData.referral_note} onChange={(e) => handleChange(e)} name="referral_note" />
                                <FormInput label="Contract Hours" value={clientData.contract_hours} onChange={(e) => handleChange(e)} name="contract_hours" checkable={false} />
                                <FormInput label="NHS Number" value={clientData.nhs_number} onChange={(e) => handleChange(e)} name="nhs_number" checkable={false} />
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-1">
                                <FormInput label="Council ID No." value={clientData.council_id} onChange={(e) => handleChange(e)} name="council_id" checkable={false} />
                                <FormInput label="Billing Code" value={clientData.billing_code} onChange={(e) => handleChange(e)} name="billing_code" checkable={false} />
                                <FormInput label="Last Name" value={clientData.last_name} onChange={(e) => handleChange(e)} name="last_name" required />
                                <FormSelect label="Nationality" value={clientData.nationality} onChange={(e) => handleChange(e)} name="nationality" options={mockOptions.countries} />
                                <FormSelect label="Gender" value={clientData.gender} onChange={(e) => handleChange(e)} name="gender" options={mockOptions.gender} />
                                <FormInput label="Spouse/Partner Name" value={clientData.spouse_partner_name} onChange={(e) => handleChange(e)} name="spouse_partner_name" />
                                <FormInput label="Email" value={clientData.email} onChange={(e) => handleChange(e)} name="email" />
                                <div className="grid grid-cols-2 gap-2">
                                    <FormSelect label="Travel Calculations Include" value={clientData.travel_calculations} onChange={(e) => handleChange(e)} name="travel_calculations" options={mockOptions.yes_no} />
                                    <FormSelect label="Split Carer" value={clientData.split_carer} onChange={(e) => handleChange(e)} name="split_carer" options={mockOptions.yes_no} />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <FormInput label="Invoice Discount (%)" value={clientData.invoice_discount} onChange={(e) => handleChange(e)} name="invoice_discount" />
                                    <FormSelect label="Pay for travel" value={clientData.pay_for_travel} onChange={(e) => handleChange(e)} name="pay_for_travel" options={mockOptions.yes_no} />
                                    <FormInput label="Travel Deduction" value={clientData.travel_deduction} onChange={(e) => handleChange(e)} name="travel_deduction" />
                                </div>
                                <FormInput label="Mobile Number" value={clientData.mobile_number} onChange={(e) => handleChange(e)} name="mobile_number" />
                                <FormInput label="Service Commenced" value={clientData.service_commenced} onChange={(e) => handleChange(e)} name="service_commenced" />
                                <FormSelect label="Referral Reason" value={clientData.referral_reason} onChange={(e) => handleChange(e)} name="referral_reason" options={mockOptions.reason} />
                                <FormInput label="Referral Date" value={clientData.referral_date} onChange={(e) => handleChange(e)} name="referral_date" />
                                <FormInput label="Contract Fee" value={clientData.contract_fee} onChange={(e) => handleChange(e)} name="contract_fee" checkable={false} />
                                <FormInput label="Invoice Cycle" value={clientData.invoice_cycle} onChange={(e) => handleChange(e)} name="invoice_cycle" />
                            </div>
                        </div>
                    </div>

                    {/* ADDRESS DETAILS SECTION */}
                    <div className="border border-gray-300 rounded-lg shadow-md mb-8">
                        <div className="bg-gray-200 px-4 py-3 border-b border-gray-300 rounded-t-lg">
                            <h2 className="text-lg font-bold text-gray-800">&gt; Address Details</h2>
                        </div>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
                            {/* Column 1 */}
                            <div className="space-y-1">
                                <div className="flex justify-end mb-2">
                                    <label className="flex items-center text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            name="use_home_address"
                                            checked={clientData.use_home_address}
                                            onChange={handleChange}
                                            className="rounded text-blue-600 focus:ring-blue-500 mr-2 border-gray-300"
                                        />
                                        Use Home Address
                                    </label>
                                </div>
                                <FormInput label="Current Address" value={clientData.current_address} onChange={(e) => handleChange(e)} name="current_address" isChecked={clientData.use_home_address} />
                                <FormInput label="Town" value={clientData.town} onChange={(e) => handleChange(e)} name="town" isChecked={clientData.use_home_address} />
                                <FormInput label="County" value={clientData.county} onChange={(e) => handleChange(e)} name="county" isChecked={clientData.use_home_address} />
                                <FormInput label="Unit (if applies)" value={clientData.unit} onChange={(e) => handleChange(e)} name="unit" />
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-1 sm:pt-10"> {/* Aligns the first field with the second column */}
                                <FormInput label="Postcode" value={clientData.postcode} onChange={(e) => handleChange(e)} name="postcode" isChecked={clientData.use_home_address} />
                                <FormSelect label="Country" value={clientData.country} onChange={(e) => handleChange(e)} name="country" options={mockOptions.countries} isChecked={clientData.use_home_address} required />
                                <FormInput label="Area (Required)" value={clientData.area} onChange={(e) => handleChange(e)} name="area" isChecked={clientData.use_home_address} required />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold"
                        >
                            Save Info
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-2">
                        * Please complete all required fields.
                    </p>

                </form>
            </div>
        </div>
    );
};

export default EditClientForm;
