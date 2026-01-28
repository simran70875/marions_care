import { useState } from "react";
import Select from "../../components/form/Select";
import DatePicker from "../../components/form/date-picker";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { useNavigate } from "react-router";

// --- Mock Data (Use your actual data source) ---
const titleOptions = [
  { value: "mr", label: "Mr" },
  { value: "ms", label: "Ms" },
  { value: "mrs", label: "Mrs" },
  { value: "dr", label: "Dr" },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const maritalStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
];

const contactMethodOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

// Custom styled Checkbox (You might need to create this component)
const StyledCheckbox = ({ label, id }: { label: string; id: string }) => (
  <div className="flex items-center space-x-2">
    <input
      id={id}
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
    />
    <label htmlFor={id} className="text-sm text-gray-700 dark:text-gray-300">
      {label}
    </label>
  </div>
);

// Utility function to render a label and input/select/date picker in a grid cell
const renderField = (
  label: string,
  id: string,
  required: boolean,
  type: "text" | "select" | "date" | "textarea" = "text",
  options?: { value: string; label: string }[],
  placeholder: string = ""
) => {
  let component;

  switch (type) {
    case "select":
      component = (
        <Select
          options={options || []}
          placeholder="Select"
          onChange={() => { }}
          className="dark:bg-dark-900"
        />
      );
      break;
    case "date":
      component = (
        <DatePicker id={id} placeholder="DD-MM-YYYY" onChange={() => { }} />
      );
      break;
    case "textarea":
      component = (
        <textarea
          id={id}
          rows={3}
          className="dark:bg-dark-900 h-auto w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      );
      break;
    case "text":
    default:
      component = <Input type="text" id={id} placeholder={placeholder} />;
      break;
  }

  return (
    <div className="flex flex-col space-y-1" key={id}>
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {component}
    </div>
  );
};
// --- End Utility Functions ---

export default function AddCustomerPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Customer Details", "Other Address", "Phones and Emails"];

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  // Define tab style to match the theme
  const tabClasses = (index: number) =>
    `px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${activeTab === index
      ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  // Define Save Button style to match the theme (using a basic Tailwind button)
  const SaveButton = () => (
    <button
      type="submit"
      className="mt-6 w-full max-w-xs rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold uppercase text-white shadow-md transition duration-150 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
    >
      Save
    </button>
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Page Header */}
      <header className="mb-4">
        <h1
          onClick={() => navigate("/customers")}
          className="text-xl font-bold text-black-700 cursor-pointer dark:text-blue-500"
        >
          Customer &gt; Add Customer
        </h1>
        <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
          New Customer go into Active Table as status Active
        </p>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-4">
          {tabs.map((label, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={tabClasses(index)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Form Content */}
      <form className="space-y-6">
        {activeTab === 0 && (
          <>
            {/* Customer Details Section */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
              Customer Details
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {renderField("Customer ID", "clientId", false)}
              {renderField("Title", "title", true, "select", titleOptions)}
              {renderField("First Name", "firstName", true)}
              {renderField("Last Name", "lastName", true)}
              {renderField("Suffix", "suffix", false)}
              {renderField(
                "Customer Known As/Preferred Name",
                "preferredName",
                false
              )}
              {renderField("NHS Number", "nhsNumber", false)}
              {renderField("Area", "area", false)}
              {renderField("Date of Birth", "dob", true, "date")}
              {renderField(
                "Marital Status",
                "maritalStatus",
                false,
                "select",
                maritalStatusOptions
              )}
              {renderField("Spouse/Partner Name", "spousePartnerName", false)}
              {renderField("Gender", "gender", false, "select", genderOptions)}
              {renderField(
                "First Contact Date",
                "firstContactDate",
                false,
                "date"
              )}
              {renderField("Service Start", "serviceStart", false, "date")}
            </div>

            {/* Additional Information Section */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
              Additional Information
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {renderField("Place of Birth", "placeOfBirth", false)}
              {renderField(
                "Nationality",
                "nationality",
                false,
                "select",
                genderOptions
              )}{" "}
              {/* Use appropriate options */}
              {renderField(
                "Ethnicity",
                "ethnicity",
                false,
                "select",
                genderOptions
              )}{" "}
              {/* Use appropriate options */}
              {renderField("Religion", "religion", false)}
              {renderField(
                "Customer Full Name",
                "clientFullName",
                false,
                "text",
                undefined,
                "i.e. name on official document"
              )}
              {renderField("Customer Alias", "clientAlias", false)}
              {renderField("Data Sharing", "dataSharing", false, "select", [
                { value: "yes", label: "Yes" },
              ])}{" "}
              {/* Placeholder select */}
              {renderField("Unit", "unit", false)}
            </div>

            {/* Referral Info Section */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
              Referral Info
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {renderField("Referral By", "referralBy", false)}
              {renderField("Referral Reason", "referralReason", false)}
              <div className="lg:col-span-3">
                {renderField(
                  "Referral Note",
                  "referralNote",
                  false,
                  "textarea"
                )}
              </div>
            </div>

            {/* Other Identifier Section */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
              Other Identifier
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <StyledCheckbox
                id="lpi"
                label="Local Patient Identifier (if applicable)"
              />
              <StyledCheckbox id="hcn" label="Health and Care Number" />
              <StyledCheckbox id="chin" label="Community Health Index Number" />
              <StyledCheckbox id="other_id" label="Other" />
            </div>

            {/* Contact Details Section (In Tab 0 for Main Contacts) */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
              Main Contact Details
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {renderField("Contact Number", "contactNumber", false)}
              {renderField("Mobile Number", "mobileNumber", false)}
              {renderField("Email", "email", false)}
              {renderField(
                "Preferred Contact Method",
                "preferredContactMethod",
                false,
                "select",
                contactMethodOptions
              )}
            </div>

            {/* Add Address Section (In Tab 0 for Main Address) */}
            <div className="flex items-center justify-between pt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                Main Address{" "}
                <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">
                  (Permanent Residence)
                </span>
              </h2>
              <button
                type="button"
                className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
              >
                Use Location Address
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {renderField("Search Address/Postcode", "searchAddress", false)}
            </div>
            {/* Address Lines - two columns */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {renderField("Address Line 1", "addressLine1", false)}
              {renderField("Address Line 2", "addressLine2", false)}
              {renderField("Address Line 3", "addressLine3", false)}
              {renderField("Address Line 4", "addressLine4", false)}
              {renderField("Address Line 5", "addressLine5", false)}
              {renderField("Postcode", "postcode", false)}
            </div>

            {/* Finance Settings Section */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
              Finance Settings
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {renderField("Council ID No.", "councilIdNo", false)}
              {renderField("Contract Hours", "contractHours", false)}
              {renderField("Contract Fee", "contractFee", false)}
              {renderField("Billing Code", "billingCode", false)}
              {renderField("Invoice Discount (%)", "invoiceDiscount", false)}
              {renderField("Invoice Cycle", "invoiceCycle", false)}
              {renderField("Pay for Travel", "payForTravel", false, "select", [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ])}
              {renderField("Travel Deduction", "travelDeduction", false)}
              {renderField(
                "Travel Calculations Include",
                "travelCalculationsInclude",
                false
              )}
              {renderField("Commission", "commission", false)}
              {renderField("Job Type", "jobType", false)}
            </div>
            {/* Save Button - Displayed in every tab for submission */}
            <div className="flex justify-center pt-8">
              <SaveButton />
            </div>
          </>
        )}

        {activeTab === 1 && (
          <>
            {/* Other Address Tab Content */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
              Other Address (Secondary Residence)
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {renderField("Address Type", "otherAddressType", false, "select", [
                { value: "temp", label: "Temporary" },
                { value: "sec", label: "Secondary" },
              ])}
              {renderField("Search Address/Postcode", "otherSearchAddress", false)}
            </div>

            {/* Address Lines - two columns */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {renderField("Address Line 1", "otherAddressLine1", false)}
              {renderField("Address Line 2", "otherAddressLine2", false)}
              {renderField("Address Line 3", "otherAddressLine3", false)}
              {renderField("Address Line 4", "otherAddressLine4", false)}
              {renderField("Address Line 5", "otherAddressLine5", false)}
              {renderField("Postcode", "otherPostcode", false)}
            </div>

            {/* Additional Notes for Other Address */}
            <div className="pt-4">
              {renderField(
                "Notes for this Address",
                "otherAddressNotes",
                false,
                "textarea"
              )}
            </div>

            {/* Add Another Address Button */}
            <div className="flex justify-start pt-4">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                + Add Another Address
              </button>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-8">
              <SaveButton />
            </div>
          </>
        )}

        {activeTab === 2 && (
          <>
            {/* Phones and Emails Tab Content */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
              Additional Contact Details
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {renderField(
                "Secondary Contact Number",
                "secondaryContactNumber",
                false
              )}
              {renderField(
                "Work/Other Mobile",
                "workMobile",
                false
              )}
              {renderField(
                "Secondary Email",
                "secondaryEmail",
                false
              )}
              {renderField(
                "Emergency Contact",
                "emergencyContact",
                false
              )}
            </div>

            {/* Notes on Communication */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
              Communication Preference Notes
            </h2>
            <div>
              {renderField(
                "Contact Notes",
                "contactNotes",
                false,
                "textarea"
              )}
            </div>

            {/* Add Contact Button */}
            <div className="flex justify-start pt-4">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                + Add Phone/Email (e.g., landline, other work email)
              </button>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-8">
              <SaveButton />
            </div>
          </>
        )}
      </form>
    </div>
  );
}