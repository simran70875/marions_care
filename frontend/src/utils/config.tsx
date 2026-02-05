export const BASE_URL = "https://marions-care.onrender.com";
export const IMAGE_URL = "https://marions-care.onrender.com/static";

// export const BASE_URL = "http://localhost:8000";
// export const IMAGE_URL = "http://localhost:8000/static";


export const API_PATHS = {
  LOGIN: "/api/auth/login",


  // customers api's 
  ADD_CUSTOMER: "/api/customer",
  EDIT_CUSTOMER: "/api/customer",
  UPDATE_STATUS: "/api/customer/status",
  DELETE_CUSTOMER: "/api/customer",
  GET_ALL_CUSTOMER: "/api/customer",
  GET_CUSTOMER_DETAILS: "/api/customer",
  ARCHEIVE_CUSTOMER: "/api/customer/archive",
  RESTORE_ARCHEIVE_CUSTOMER: "/api/customer/archive/restore",
  EDIT_CUSTOMER_CONTACTS:"/api/customer/contacts",
  UPLOAD_BULK_CUSTOMER: "/api/customer/bulk-upload",


  // carer api's
  ADD_CARER: "/api/carer",
  EDIT_CARER: "/api/carer",
  UPDATE_STATUS_CARER: "/api/carer/status",
  DELETE_CARER: "/api/carer",
  GET_ALL_CARER: "/api/carer",
  GET_CARER_DETAILS: "/api/carer",
  ARCHEIVE_CARER: "/api/carer/archive",
  RESTORE_ARCHEIVE_CARER: "/api/carer/archive/restore",
  EDIT_CARER_CONTACTS:"/api/carer/contacts",
  UPLOAD_BULK_CARER: "/api/carer/bulk-upload",

  // customer shifts api's
  GET_CUSTOMER_SHIFTS: "/api/shifts/customer",
  CREATE_SHIFT: "/api/shifts",
  UPDATE_SHIFT: "/api/shifts",
  DELETE_SHIFT: "/api/shifts",


  GET_CARER_SHIFTS: "/api/shifts/carer",

  GET_PRIVATE_CUSTOMER_SHIFTS: "/customer/shifts",

  AGENTS_PROFIT: ``,
  COMPARE_ORDERS: ``,
  MONTHLY_PROFITS: ``,
};
