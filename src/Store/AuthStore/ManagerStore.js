import { create } from "zustand";
import api from "../Axios/api";

const useManagerStore = create((set) => ({
  isLoading: false,
  error: null,
  employees: [],
  OneEmployee: {},
  activeEmployees: [],

  addEmployees: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/manager/addEmployee/", payload);
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getEmployees: async (managerId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(
        `/manager/getEmployeesByManager/${managerId}`
      );
      set({ employees: response?.data?.data, loading: false });
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  getEmployeeData: async (employeeId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/manager/getEmployeeData/${employeeId}`);

      console.log(response, "store");
      set({ OneEmployee: response?.data?.data, loading: false });
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getActiveEmployees: async (managerId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(
        `/manager/getActiveEmployees/${managerId}`
      );
      set({ activeEmployees: response?.data?.data, loading: false });
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  markedAttendance: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/manager/attandanceMarked", payload);
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

viewAttendanceList: async ({ managerId, month, year }) => {
  set({ loading: true, error: null });
  try {
    const response = await api.get("/manager/viewAttendance", {
      params: { managerId, month, year }
    });
    return response.data;
  } catch (error) {
    set({ error: error.message, loading: false });
    throw error;
  }
}

}));

export default useManagerStore;
