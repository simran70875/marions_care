import api from "../api/axios";
import { API_PATHS } from "../utils/config";


export const authService = {
  login: (data: {email: string, password: string, role: string}) => api.post(API_PATHS.LOGIN, data),

  register: (formData: FormData) => api.post("/auth/candidate/register", formData),
  adminLogin: (data: { identifier: string; password: string }) => api.post("/auth/admin/login", data),
  logout: () => api.post("/auth/logout"),
  adminLogout: () => api.post("/auth/logout/admin"),
  getProfile: () => api.get("/candidate/profile"),
  
};
