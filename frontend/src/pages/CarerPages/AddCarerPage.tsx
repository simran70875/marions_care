import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Select from "../../components/form/Select";
import DatePicker from "../../components/form/date-picker";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";

import { useApi } from "../../hooks/useApi";

import { useLocation } from "react-router";
import { carerServices } from "../../services/carerServices";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

// --- End Utility Functions ---

export default function AddCarerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { call, loading } = useApi<any>();
  const { call: getCarerDetails } = useApi<any>();
  const id = location.state?.id;

  const [formData, setFormData] = useState({
    // 🔗 Optional login account
    userId: "",

    // 🆔 IDs
    carerIdNo: "",

    // 👤 Basic info
    title: "",
    firstName: "",
    lastName: "",
    knownAs: "",
    gender: "",
    nationality: "",
    dateOfBirth: "",

    // 📧 Contact
    email: "",
    secondaryEmail: "",
    primaryContactNo: "",
    secondaryContactNo: "",
    workPhone: "",

    // 🪪 Identity
    niNumber: "",

    // 💼 Work details
    position: "",
    startDate: "",
    recruitmentSource: "",
    area: "",

    // 🚗 Travel & transport
    drivingLicense: false,
    transportType: "",

    // 📍 Address (array as per schema)
    address: [
      {
        address: "",
        town: "",
        county: "",
        postcode: "",
        country: "england",
      },
    ],

    // ⚙️ Status & settings
    status: "active",
    sendActivationEmail: false,
  });

  useEffect(() => {
    if (!id) return;

    // Fetch carer details to edit
    const fetchCarer = async () => {
      try {
        const res = await getCarerDetails(carerServices.getCarerDetail(id));
        console.log(res);
        if (res) {
          // Populate formData with API response
          const carer = res;

          setFormData(carer);
        }
      } catch (err) {
        console.error("Failed to fetch carer details", err);
      }
    };

    fetchCarer();
  }, [id]);

  const handleChange = (path: string, value: any) => {
    setFormData((prev: any) => {
      const keys = path.split(".");
      const updated = { ...prev };
      let obj = updated;

      keys.slice(0, -1).forEach((key) => {
        if (Array.isArray(obj[key])) {
          obj[key] = [...obj[key]]; // clone array
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          obj[key] = { ...obj[key] }; // clone object
        } else {
          obj[key] = {};
        }
        obj = obj[key];
      });

      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // Utility function to render a label and input/select/date picker in a grid cell
  const renderField = (
    label: string,
    id: string, // can be "firstName" OR "address.area" OR "finance.contractFee"
    required: boolean,
    type: "text" | "select" | "date" | "textarea" = "text",
    options?: { value: string; label: string }[],
    placeholder: string = "",
  ) => {
    const value = id.split(".").reduce((acc: any, key) => acc?.[key], formData);

    let component;

    switch (type) {
      case "select":
        component = (
          <Select
            options={options || []}
            placeholder="Select"
            value={
              id === "drivingLicense" || id === "sendActivationEmail"
                ? value === true
                  ? "true"
                  : value === false
                    ? "false"
                    : ""
                : value || ""
            }
            onChange={(val: string) =>
              handleChange(
                id,
                id === "drivingLicense" || id === "sendActivationEmail"
                  ? val === "true"
                  : val,
              )
            }
            className="dark:bg-dark-900"
          />
        );
        break;

      case "date":
        component = (
          <DatePicker
            id={id}
            placeholder="DD-MM-YYYY"
            defaultDate={value}
            onChange={(date: any) =>
              handleChange(id, date ? new Date(date).toISOString() : "")
            }
          />
        );
        break;

      case "textarea":
        component = (
          <textarea
            id={id}
            rows={3}
            value={value || ""}
            onChange={(e) => handleChange(id, e.target.value)}
            className="dark:bg-dark-900 h-auto w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-sm"
          />
        );
        break;

      default:
        component = (
          <Input
            type="text"
            id={id}
            value={value || ""}
            placeholder={placeholder}
            onChange={(e: any) => handleChange(id, e.target.value)}
          />
        );
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Saving carer...");

    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (id) {
        await call(carerServices.editCarer(id, formData));
      } else {
        await call(carerServices.addCarer(formData));
      }

      toast.success("Carer added successfully", { id: toastId });
      navigate("/carers/all");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save", {
        id: toastId,
      });
    }
  };

  const SaveButton = () => (
    <button
      type="submit"
      disabled={loading}
      className="mt-6 w-full max-w-xs rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold uppercase text-white shadow-md transition duration-150 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
    >
      {loading ? (id ? "Updating..." : "Saving...") : id ? "Update" : "Save"}
    </button>
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
            {/* Page Header */}
      <header className="mb-4">
               {" "}
        <h1
          onClick={() => navigate("/carers")}
          className="text-xl font-bold text-black-700 cursor-pointer dark:text-blue-500"
        >
                    Carer &gt; Add Carer        {" "}
        </h1>
               {" "}
        <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                    New Carer go into Active Table as status Active        {" "}
        </p>
             {" "}
      </header>
            {/* Form Content */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <>
          {/* ================= Carer Details ================= */}
          <h2 className="text-lg font-bold text-gray-800 dark:text-white pb-2 border-b">
            Carer Details
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renderField("Carer ID No.", "carerIdNo", true)}
            {renderField("Title", "title", false)}
            {renderField("First Name", "firstName", true)}
            {renderField("Last Name", "lastName", true)}
            {renderField("Known As", "knownAs", false)}
            {renderField("Gender", "gender", false, "select", genderOptions)}
            {renderField("Nationality", "nationality", false)}
            {renderField("Date of Birth", "dateOfBirth", true, "date")}
            {renderField("Position", "position", false)}
            {renderField("Start Date", "startDate", false, "date")}
            {renderField("Recruitment Source", "recruitmentSource", false)}
            {renderField("Area", "area", true)}
            {renderField("Transport Type", "transportType", false, "select", [
              { value: "Car", label: "Car" },
              { value: "Public Transport", label: "Public Transport" },
              { value: "Bike", label: "Bike" },
            ])}
            {renderField("Driving License", "drivingLicense", false, "select", [
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ])}
            {renderField("Status", "status", false, "select", [
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "archived", label: "Archived" },
            ])}
            {renderField(
              "Send Activation Email",
              "sendActivationEmail",
              false,
              "select",
              [
                { value: "true", label: "Yes" },
                { value: "false", label: "No" },
              ],
            )}
          </div>

          {/* ================= Contact Details ================= */}
          <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b">
            Contact Details
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renderField("Primary Contact No.", "primaryContactNo", false)}
            {renderField("Secondary Contact No.", "secondaryContactNo", false)}
            {renderField("Work Phone", "workPhone", false)}
            {renderField("Email", "email", false)}
            {renderField("Secondary Email", "secondaryEmail", false)}
            {renderField("NI Number", "niNumber", false)}
          </div>

          {/* ================= Address ================= */}
          <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b">
            Address
          </h2>

          {formData.address.map((_addr, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {renderField("Address Line", `address.${idx}.address`, false)}
              {renderField("Town", `address.${idx}.town`, false)}
              {renderField("County", `address.${idx}.county`, false)}
              {renderField("Postcode", `address.${idx}.postcode`, false)}
              {renderField("Country", `address.${idx}.country`, false)}
            </div>
          ))}

          {/* ================= Submit ================= */}
          <div className="flex justify-center pt-8">
            <SaveButton />
          </div>
        </>
      </form>
    </div>
  );
}
