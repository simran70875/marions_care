import api from "../api/axios";
import { API_PATHS } from "../utils/config";

export const customerServices = {
  addCustomer: (data: any) => api.post(API_PATHS.ADD_CUSTOMER, data),
  getUsers: (params?: { page?: number; limit?: number; search?: string; status: string; }) => api.get(API_PATHS.GET_ALL_CUSTOMER, { params }),
  getUserDetail: (id?: string) => api.get(`${API_PATHS.GET_CUSTOMER_DETAILS}/${id}`),
  editCustomer: (id: string, data: any) => api.put(`${API_PATHS.EDIT_CUSTOMER}/${id}`, data),
  editCustomerContacts: (id: string, data: any) => api.put(`${API_PATHS.EDIT_CUSTOMER_CONTACTS}/${id}`, data),
  updateStatus: (id: string, status : string) => api.put(`${API_PATHS.UPDATE_STATUS}/${id}`, { status }),
  deleteCustomer: (id: string) => api.delete(`${API_PATHS.DELETE_CUSTOMER}/${id}`),

  uploadBulk: (formData: FormData, config = {}) =>
    api.post(API_PATHS.UPLOAD_BULK_CUSTOMER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    }),

};