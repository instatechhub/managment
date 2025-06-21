import { create } from 'zustand';
import api from "../Axios/api";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

login: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/manager/login", payload);
      set({ user: response.data });
      return response;
    } catch (error) {
      console.log(error)
      set({
        error: error.response?.data?.message || "Login failed",
        user: null,
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

getManager: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/manager/managerGetByToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data.success) {
        set({ user: response?.data?.data });
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch sub-admins:", error);
      localStorage.removeItem('token');
      set({
        error: error.response?.data?.message || "Failed to get sub-admins",
        user: null,
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

logout: async()=>{
   set({user: null,});
   localStorage.removeItem('token')
},

})
)

export default useAuthStore;