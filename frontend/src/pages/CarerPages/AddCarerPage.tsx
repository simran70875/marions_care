import { useNavigate } from "react-router";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import DatePicker from "../../components/form/date-picker";
import Label from "../../components/form/Label";

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

const nationalityOptions = [
  { value: "english", label: "English" },
  { value: "british", label: "British" },
  { value: "other", label: "Other" },
];

export default function AddCarerPage() {
  const navigate = useNavigate();

  const renderField = (
    label: string,
    id: string,
    required = false,
    type: "text" | "select" | "date" = "text",
    options?: any
  ) => {
    let field;

    if (type === "select") {
      field = (
        <Select
          onChange={() => {}}
          options={options || []}
          placeholder="Select"
        />
      );
    } else if (type === "date") {
      field = (
        <DatePicker id={id} placeholder="DD-MM-YYYY" onChange={() => {}} />
      );
    } else {
      field = <Input id={id} type="text" placeholder="" />;
    }

    return (
      <div key={id} className="flex flex-col space-y-1">
        <Label htmlFor={id}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        {field}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* PAGE HEADER */}
      <header className="mb-6">
        <h1
          onClick={() => navigate("/carers")}
          className="text-xl font-bold cursor-pointer text-gray-800 dark:text-blue-400"
        >
          Carers &gt; Add New Carer
        </h1>

        <p className="text-sm font-semibold text-green-600 mt-1">
          New Carer goes into Active table as status Active
        </p>
      </header>

      {/* CARER DETAILS */}
      <h2 className="text-lg font-bold text-gray-700 dark:text-white border-b pb-2 mb-4">
        Carer Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderField("Carer ID No", "carerId")}
        {renderField("Title", "title", true, "select", titleOptions)}
        {renderField("First Name", "firstName", true)}
        {renderField("Last Name", "lastName", true)}
        {renderField("Gender", "gender", false, "select", genderOptions)}
        {renderField("Known As", "knownAs")}
        {renderField(
          "Nationality",
          "nationality",
          false,
          "select",
          nationalityOptions
        )}

        {/* Email + NI Number */}
        {renderField("Email", "email")}
        {renderField("NI Number", "niNumber")}

        {/* Contacts */}
        {renderField("Primary Contact No", "primaryContact")}
        {renderField("Secondary Contact No", "secondaryContact")}
        {renderField("Work Phone", "workPhone")}

        {renderField("Position", "position")}
        {renderField("Transport Type", "transportType")}
        {renderField("Start Date", "startDate", true, "date")}
        {renderField("Area", "area", true)}
        {renderField("Recruitment Source", "recruitmentSource")}
      </div>

      {/* PERSONAL DETAILS */}
      <h2 className="mt-10 text-lg font-bold text-gray-700 dark:text-white border-b pb-2 mb-4">
        Personal Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {renderField("Date of Birth", "dob", true, "date")}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        {renderField("Address", "address")}
        {renderField("Postcode", "postcode")}
        {renderField("Town", "town")}
        {renderField("County", "county")}
        {renderField("Country", "country")}
      </div>

      {/* SUBMIT */}
      <div className="flex justify-center mt-10">
        <button className="bg-purple-700 hover:bg-purple-800 text-white px-10 py-3 rounded-xl shadow-md font-semibold">
          Create Carer
        </button>
      </div>
    </div>
  );
}
