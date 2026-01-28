import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Select from "../../components/form/Select";
import DatePicker from "../../components/form/date-picker";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";

import { useApi } from "../../hooks/useApi";
import { customerServices } from "../../services/customerServices";
import { useLocation } from "react-router";

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

// --- End Utility Functions ---

export default function AddCustomerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { call, loading } = useApi<any>();
  const { call: getCustomerDetails } = useApi<any>();
  const id = location.state?.id;

  const [formData, setFormData] = useState({
    // 🔗 Optional
    userId: "",

    // 🆔 IDs
    clientIdNo: "",
    clientBio: "",

    // 🏥 Health identifiers
    nhsNumber: "",
    localPatientIdentifier: "",
    healthAndCareNumber: "",
    communityHealthIndexNumber: "",

    // 👤 Personal info
    firstName: "",
    lastName: "",
    knownAs: "",
    fullNameOfficial: "",
    gender: "",
    maritalStatus: "",
    spouseName: "",
    nationality: "",
    dateOfBirth: "",

    // 📞 Contact
    email: "",
    contactNumber: "",
    mobileNumber: "",
    preferredContactMethod: "",

    // 📅 Service & referral
    firstContactDate: "",
    serviceCommenced: "",
    referralBy: "",
    referralReason: "",
    referralNote: "",
    referralDate: "",

    // 📍 Address
    address: {
      addressLine1: "",
      addressLine2: "",
      town: "",
      county: "",
      postcode: "",
      country: "England",
      unit: "",
      area: "",
    },

    // 💰 Finance (single source of truth)
    finance: {
      councilIdNo: "",
      billingCode: "",
      contractHours: "",
      contractFee: "",
      invoiceDiscount: "",
      invoiceCycle: "",
      payForTravel: "",
      travelDeduction: "",
      commission: "",
      jobType: "",
    },

    // 📝 Other
    additionalInformation: "",
    dataSharing: "",

    // ⚙️ System
    status: "active",
  });

  useEffect(() => {
    if (!id) return;

    // Fetch customer details to edit
    const fetchCustomer = async () => {
      try {
        const res = await getCustomerDetails(
          customerServices.getUserDetail(id),
        );
        console.log(res);
        if (res) {
          // Populate formData with API response
          const customer = res;

          setFormData(customer);
        }
      } catch (err) {
        console.error("Failed to fetch customer details", err);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (path: string, value: any) => {
    setFormData((prev: any) => {
      const keys = path.split(".");
      const updated = { ...prev };
      let obj = updated;

      keys.slice(0, -1).forEach((k) => {
        obj[k] = { ...obj[k] };
        obj = obj[k];
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
            value={value || null} // ✅ correct
            onChange={(val: string) => handleChange(id, val)}
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
    const toastId = toast.loading("Saving customer...");

    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (id) {
        await call(customerServices.editCustomer(id, formData));
      } else {
        await call(customerServices.addCustomer(formData));
      }

      toast.success("Customer added successfully", { id: toastId });
      navigate("/customers/all");
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
          onClick={() => navigate("/customers")}
          className="text-xl font-bold text-black-700 cursor-pointer dark:text-blue-500"
        >
                    Customer &gt; Add Customer        {" "}
        </h1>
               {" "}
        <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                    New Customer go into Active Table as status Active      
           {" "}
        </p>
             {" "}
      </header>
            {/* Form Content */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <>
          {/* ================= Customer Details ================= */}
          <h2 className="text-lg font-bold text-gray-800 dark:text-white pb-2 border-b">
            Customer Details
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renderField("Customer ID No.", "clientIdNo", false)}
            {renderField("Customer Bio", "clientBio", false)}
            {renderField("First Name", "firstName", true)}
            {renderField("Last Name", "lastName", true)}
            {renderField("Known As", "knownAs", false)}
            {renderField("NHS Number", "nhsNumber", false)}
            {renderField("Gender", "gender", false, "select", genderOptions)}
            {renderField(
              "Marital Status",
              "maritalStatus",
              false,
              "select",
              maritalStatusOptions,
            )}
            {renderField("Spouse Name", "spouseName", false)}
            {renderField("Nationality", "nationality", false)}
            {renderField("Date of Birth", "dateOfBirth", true, "date")}
            {renderField(
              "First Contact Date",
              "firstContactDate",
              false,
              "date",
            )}
            {renderField(
              "Service Commenced",
              "serviceCommenced",
              false,
              "date",
            )}
          </div>

          {/* ================= Additional Info ================= */}
          <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b">
            Additional Information
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renderField("Official Full Name", "fullNameOfficial", false)}
            {renderField("Data Sharing", "dataSharing", false, "select", [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ])}
            {renderField(
              "Additional Information",
              "additionalInformation",
              false,
            )}
          </div>

          {/* ================= Referral ================= */}
          <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b">
            Referral Info
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renderField("Referral By", "referralBy", false)}
            {renderField("Referral Reason", "referralReason", false)}
            <div className="lg:col-span-3">
              {renderField("Referral Note", "referralNote", false, "textarea")}
            </div>
            {renderField("Referral Date", "referralDate", false, "date")}
          </div>

          {/* ================= Contact ================= */}
          <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b">
            Contact Details
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
              contactMethodOptions,
            )}
          </div>

          {/* ================= Address ================= */}
          <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b">
            Main Address
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renderField("Address Line 1", "address.addressLine1", false)}
            {renderField("Address Line 2", "address.addressLine2", false)}
            {renderField("Town", "address.town", false)}
            {renderField("County", "address.county", false)}
            {renderField("Postcode", "address.postcode", false)}
            {renderField("Area", "address.area", true)}
            {renderField("Unit", "address.unit", false)}
          </div>

          {/* ================= Finance ================= */}
          <h2 className="text-lg font-bold text-gray-800 dark:text-white pt-4 pb-2 border-b">
            Finance Settings
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {renderField("Council ID No.", "finance.councilIdNo", false)}
            {renderField("Billing Code", "finance.billingCode", false)}
            {renderField("Contract Hours", "finance.contractHours", false)}
            {renderField("Contract Fee", "finance.contractFee", false)}
            {renderField("Invoice Discount", "finance.invoiceDiscount", false)}
            {renderField("Invoice Cycle", "finance.invoiceCycle", false)}
            {renderField(
              "Pay for Travel",
              "finance.payForTravel",
              false,
              "select",
              [
                { value: "", label: "" },
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ],
            )}
            {renderField("Travel Deduction", "finance.travelDeduction", false)}
            {renderField("Commission", "finance.commission", false)}
            {renderField("Job Type", "finance.jobType", false)}
          </div>

          {/* ================= Submit ================= */}
          <div className="flex justify-center pt-8">
            <SaveButton />
          </div>
        </>
      </form>
    </div>
  );
}
