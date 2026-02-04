import {
  Printer,
  FileEdit,
  Truck,
  MapPin,
  User,
  ArrowRight,
  Eye,
  Edit3,
  Star,
  Camera,
  ArrowLeft,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useApi } from "../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import toast from "react-hot-toast";

import { CustomerDetailsSkeleton } from "../CustomerPages/CustomerDetailsSkeleton";
import { carerServices } from "../../services/carerServices";
import {
  goToNextCarer,
  goToPreviousCarer,
} from "../../store/slices/selectedCarerSlice";

// =================================================================
// 1. HELPER COMPONENTS
// =================================================================

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className="flex text-sm py-1">
    <span className="font-medium text-gray-500 w-1/3 min-w-[120px]">
      {label}:
    </span>
    <span className="text-gray-800 font-normal flex-1">{value}</span>
  </div>
);

const InfoCard: React.FC<{
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
  icon?: React.ReactNode;
  editable?: boolean;
  onEdit?: () => void;
}> = ({
  title,
  children,
  isActive = false,
  icon,
  editable = false,
  onEdit,
}) => (
  <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 h-full">
    <div className="flex justify-between items-start pb-2 mb-2">
      <h3 className="text-base font-semibold text-gray-700">{title}</h3>
      <div className="flex items-center gap-2">
        {isActive && (
          <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full flex items-center gap-1">
            Active <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          </span>
        )}
        {icon && (
          <div className="flex gap-2 text-white bg-purple-600 p-2 rounded-lg">
            {icon}
          </div>
        )}
        {editable && (
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Edit3 size={16} />
          </button>
        )}
      </div>
    </div>
    <div className="text-sm text-gray-700 space-y-0.5">{children}</div>
  </div>
);

const SectionCard: React.FC<{
  title: string;
  children: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  onEdit?: () => void;
}> = ({ title, children, badge, badgeColor = "bg-gray-100", onEdit }) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 h-full flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-sm font-semibold text-gray-700 uppercase">{title}</h4>
      <div className="flex items-center space-x-2">
        {badge && (
          <span
            className={`text-xs font-medium ${badgeColor} text-gray-700 px-2 py-0.5 rounded-full`}
          >
            {badge}
          </span>
        )}
        <button
          onClick={onEdit}
          className="text-gray-400 hover:text-purple-600 transition-colors"
        >
          <Edit3 size={14} />
        </button>
      </div>
    </div>
    <div className="text-xs text-gray-600 flex-grow">{children}</div>
  </div>
);

// =================================================================
// 3. MAIN COMPONENT
// =================================================================

export default function CarerDetails() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [details, setDetails] = useState<any | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [contactForm, setContactForm] = useState<{
    _id?: string;
    name: string;
    contact: string;
  }>({
    name: "",
    contact: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { call, loading } = useApi<any>();
  const { carerId, firstName, lastName, carerList } = useSelector(
    (state: RootState) => state.selectedCarer,
  );

  const currentIndex = carerList.findIndex((c) => c.carerId === carerId);
  const hasNext = currentIndex < carerList.length - 1;
  const hasPrevious = currentIndex > 0;

  // Fetch carer details to edit
  const fetchCustomer = async () => {
    try {
      if (!carerId) return toast("Carer id is required to fetch details");
      const res = await call(carerServices.getCarerDetail(carerId));
      if (res) {
        setDetails(res);
      }
    } catch (err) {
      console.error("Failed to fetch carer details", err);
    }
  };

  useEffect(() => {
    if (!carerId) return;

    fetchCustomer();
  }, [carerId]);

  // Navigation Handler (Simulated)
  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    window.location.href = path; // Replace with navigate(path) if using react-router-dom
  };

  // Profile Picture Upload Handler
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const NotFoundWithAdd: React.FC<{ label: string; onAdd: () => void }> = ({
    label,
    onAdd,
  }) => (
    <div className="flex items-center justify-between text-xs text-gray-400 italic">
      <span>{label} not found</span>
      <button
        onClick={onAdd}
        className="text-purple-600 font-medium hover:underline"
      >
        + Add
      </button>
    </div>
  );

  const handleSaveContact = async () => {
    if (!contactForm.name || !contactForm.contact || !carerId) return;

    await call(
      carerServices.editCarerContacts(carerId, {
        contact: contactForm, // _id included automatically if editing
      }),
    );

    setOpenContactModal(false);
    setContactForm({ name: "", contact: "" });
    fetchCustomer();
  };

  if (loading) {
    return <CustomerDetailsSkeleton />;
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Bar / Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2 text-lg font-medium text-gray-700">
          <button className="flex items-center px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 transition-colors">
            <Printer size={14} className="mr-1" /> Print
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 transition-colors">
            <FileEdit size={14} className="mr-1" /> Add Private Note
          </button>
        </div>

        <div className="flex flex-col items-end gap-1">
          {/* Navigation Row */}
          <div className="flex items-center gap-3 text-sm font-semibold">
            {/* Previous */}
            <button
              onClick={() => {
                dispatch(goToPreviousCarer());
                navigate("/carer/view");
              }}
              disabled={!hasPrevious}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition ${hasPrevious ? "text-purple-600 hover:bg-purple-50" : "text-gray-300 cursor-not-allowed"}`}
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </button>

            {/* Counter */}
            <span className="text-xs font-medium text-gray-500">
              {currentIndex + 1} <span className="mx-0.5">of</span>{" "}
              {carerList.length}
            </span>

            {/* Next */}
            <button
              onClick={() => {
                dispatch(goToNextCarer());
                navigate("/carer/view");
              }}
              disabled={!hasNext}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition
        ${
          hasNext
            ? "text-purple-600 hover:bg-purple-50"
            : "text-gray-300 cursor-not-allowed"
        }`}
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Subtext */}
          <div className="text-xs text-gray-500">
            {firstName} {lastName} —{" "}
            <span className="font-semibold text-purple-600">in</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* COLUMN 1: Profile Picture Implementation */}
        <div className="col-span-1 flex flex-col">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center justify-center shadow-md border border-gray-200 h-full">
            <div className="relative w-48 h-48 mb-6">
              <div className="w-full h-full bg-purple-600 rounded-full border-4 border-purple-300 flex items-center justify-center text-white shadow-xl overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={96} />
                )}
              </div>

              {/* Image Upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-3 bg-purple-700 hover:bg-purple-800 text-white rounded-full shadow-lg border-2 border-white transition-all transform hover:scale-105"
                title="Click to upload profile picture"
              >
                <Camera size={18} />
              </button>
            </div>

            <p className="text-xs text-gray-400">Click icon to change photo</p>
          </div>
        </div>

        {/* COLUMN 2: Personal Details */}
        <div className="col-span-1">
          <InfoCard
            title="Personal Details"
            isActive={details?.status === "active"}
            editable
            onEdit={() =>
              navigate("/carer/add", {
                state: { id: carerId },
              })
            }
          >
            <DetailItem
              label="Name"
              value={`${details?.firstName || "—"} ${details?.lastName || ""}`}
            />

            <DetailItem label="Carer No" value={details?.carerIdNo || "—"} />

            <DetailItem label="Gender" value={details?.gender || "—"} />

            <DetailItem label="Position" value={details?.position || "—"} />

            <DetailItem
              label="Recruitment Source"
              value={details?.recruitmentSource || "—"}
            />

            <DetailItem label="Status" value={details?.status || "—"} />
          </InfoCard>
        </div>

        {/* COLUMN 3: Contact */}
        <div className="col-span-1">
          <InfoCard
            title="Contact"
            icon={
              <>
                <MapPin size={18} /> <Truck size={18} />
              </>
            }
            editable
            onEdit={() =>
              navigate("/carer/add", {
                state: { id: carerId },
              })
            }
          >
            <DetailItem label="Area" value={details?.area || "—"} />

            <DetailItem
              label="Address"
              value={details?.address?.[0]?.address || "—"}
            />

            <DetailItem
              label="Country"
              value={details?.address?.[0]?.country || "—"}
            />

            <DetailItem
              label="Phone"
              value={details?.primaryContactNo || "—"}
            />

            <DetailItem
              label="Transport"
              value={details?.transportType || "—"}
            />

            <DetailItem
              label="Driving License"
              value={details?.drivingLicense ? "Yes" : "No"}
            />
          </InfoCard>
        </div>
      </div>

      {/* Add Tag Button */}
      <div className="mt-6">
        <button className="px-6 py-2 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500 transition-colors text-sm font-medium">
          Add Tag
        </button>
      </div>

      {/* SECTION 2: About Me (Navigation Implementation) */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
          <div className="text-xl font-semibold text-gray-700">About Me</div>
          <div className="flex space-x-2">
            <button
              onClick={() =>
                navigate("/carer/add/about-me", {
                  state: { id: carerId },
                })
              }
              className="flex items-center p-2 text-gray-600 hover:text-purple-600 bg-gray-100 hover:bg-purple-50 rounded-full transition-colors"
            >
              <Edit3 size={18} />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          (Click <Eye size={14} className="inline-block mx-1 text-purple-600" />{" "}
          to view all)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {details?.aboutMe?.length ? (
            details?.aboutMe.map((item: any, index: number) => (
              <div key={index} className="space-y-1">
                <p className="font-semibold text-gray-800">{item.question}</p>
                <p className="text-gray-700 pl-4">{item.answer}</p>
              </div>
            ))
          ) : (
            <NotFoundWithAdd
              label="About Me information"
              onAdd={() =>
                navigate("/carer/add/about-me", {
                  state: { id: carerId },
                })
              }
            />
          )}
        </div>

        <div className="text-right text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
          Last Saved : {new Date(details?.createdAt).toLocaleString()}
        </div>
      </div>

      {/* SECTION 3: New Four Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <SectionCard
          title="Client Bio"
          badge={new Date(details?.createdAt).toLocaleString()}
          badgeColor="bg-blue-100"
          onEdit={() =>
            navigate("/carer/add", {
              state: { id: carerId },
            })
          }
        >
          <p className="line-clamp-4 text-gray-600">{details?.clientBio}</p>
          {/* <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">
            View all
          </button> */}
        </SectionCard>

        <SectionCard title="Contacts">
          <div className="space-y-2">
            {details?.contacts?.length > 0 ? (
              details?.contacts.map((contact: any, index: number) => (
                <div
                  key={index}
                  className="pb-1 border-b border-gray-100 last:border-b-0 cursor-pointer"
                >
                  <p
                    onClick={() => {
                      setContactForm({
                        _id: contact._id, // 👈 THIS IS IMPORTANT
                        name: contact.name,
                        contact: contact.contact,
                      });
                      setOpenContactModal(true);
                    }}
                    className="text-gray-900 font-medium"
                  >
                    {contact.name} – {contact.contact}
                  </p>
                  <button
                    onClick={() => {
                      setContactForm({ name: "", contact: "" }); // 👈 no _id
                      setOpenContactModal(true);
                    }}
                    className="text-purple-600 font-medium hover:underline mt-4"
                  >
                    + Add More
                  </button>
                </div>
              ))
            ) : (
              <NotFoundWithAdd
                label="Contacts"
                onAdd={() => {
                  setContactForm({ name: "", contact: "" }); // 👈 no _id
                  setOpenContactModal(true);
                }}
              />
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Admin Comments"
          badge={details?.adminComments?.length?.toString()}
          badgeColor="bg-orange-100"
          onEdit={() =>
            handleNavigation(`/customers/adminComments/${details?._id}`)
          }
        >
          {details?.adminComments?.length ? (
            <>
              <p className="text-gray-800 font-medium mb-1">
                {details?.adminComments[0]?.title || "Latest Comment"}
              </p>
              <p className="line-clamp-5">
                {details?.adminComments[0]?.comment}
              </p>
            </>
          ) : (
            <NotFoundWithAdd
              label="Admin comments"
              onAdd={() =>
                handleNavigation(`/carer/add/admin-comments/${details?._id}`)
              }
            />
          )}
        </SectionCard>

        <SectionCard
          title="Preferred Carer"
          badge={
            details?.totalPreferredCarerHours
              ? `${details?.totalPreferredCarerHours} Total`
              : undefined
          }
          badgeColor="bg-green-100"
          onEdit={() =>
            handleNavigation(`/carer/add/preferred-carers/${details?._id}`)
          }
        >
          {details?.preferredCarers?.length ? (
            <>
              <div className="grid grid-cols-[1fr_auto_auto] text-xs text-gray-500 border-b pb-1">
                <span>Name</span>
                <span>Hrs</span>
                <span>Rating</span>
              </div>

              {details?.preferredCarers.map((carer: any, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_auto_auto] items-center py-1"
                >
                  <span className="font-semibold">{carer.name}</span>
                  <span>{carer.hours}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        fill={i < carer.rating ? "orange" : "gray"}
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-right mt-2 text-xs font-semibold">
                Total Hours: {details?.totalPreferredCarerHours}
              </div>
            </>
          ) : (
            <NotFoundWithAdd
              label="Preferred carers"
              onAdd={() =>
                handleNavigation(`/carer/add/preferred-carers/${details?._id}`)
              }
            />
          )}
        </SectionCard>
      </div>

      {openContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add Contact</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Contact Name"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                className="w-full rounded border px-3 py-2 text-sm"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={contactForm.contact}
                onChange={(e) =>
                  setContactForm({ ...contactForm, contact: e.target.value })
                }
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpenContactModal(false)}
                className="text-sm text-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveContact}
                className="rounded bg-purple-600 px-4 py-2 text-sm text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
