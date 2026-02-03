import api from "../api/axios";
import { API_PATHS } from "../utils/config";

export const carerServices = {
  addCarer: (data: any) => api.post(API_PATHS.ADD_CARER, data),
  getCarers: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status: string;
  }) => api.get(API_PATHS.GET_ALL_CARER, { params }),
  getCarerDetail: (id?: string) => api.get(`${API_PATHS.GET_CARER_DETAILS}/${id}`),
  
  editCarer: (id: string, data: any) => api.put(`${API_PATHS.EDIT_CARER}/${id}`, data),
  editCarerContacts: (id: string, data: any) => api.put(`${API_PATHS.EDIT_CARER_CONTACTS}/${id}`, data),
  updateStatus: (id: string, status: string) => api.put(`${API_PATHS.UPDATE_STATUS_CARER}/${id}`, { status }),
  deleteCarer: (id: string) => api.delete(`${API_PATHS.DELETE_CARER}/${id}`),

  uploadBulk: (formData: FormData, config = {}) =>
    api.post(API_PATHS.UPLOAD_BULK_CARER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    }),
};
