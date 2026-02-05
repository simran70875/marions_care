import api from "../api/axios";
import { API_PATHS } from "../utils/config";

export const shiftServices = {
  getCustomerShifts: (customerId: string, month: string) => api.get(`${API_PATHS.GET_CUSTOMER_SHIFTS}/${customerId}?month=${month}`),
  getCarerShifts: (carerId: string, month: string) => api.get(`${API_PATHS.GET_CARER_SHIFTS}/${carerId}?month=${month}`),

  createShift: (payload: any) => api.post(API_PATHS.CREATE_SHIFT, payload),
  updateShift: (id: string, payload: any) => api.put(`${API_PATHS.UPDATE_SHIFT}/${id}`, payload),
  deleteShift: (id: string) => api.delete(`${API_PATHS.DELETE_SHIFT}/${id}`),


  getPrivateCustomerShifts:  (month: string) => api.get(`${API_PATHS.GET_PRIVATE_CUSTOMER_SHIFTS}?month=${month}`),
};
