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
        params: { managerId, month, year },
      });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  viewSingleAttendance: async ({ employeeId, month, year }) => {
    console.log(employeeId, month, year);
    set({ loading: true, error: null });
    try {
      const response = await api.get(
        `/manager/viewEmployeeAttendance/${employeeId}`,
        {
          params: { month, year },
        }
      );
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  employeeLeavePlan: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/manager/leavePlane/", payload);
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getLeavePlan: async (employeeId, month, year) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/manager/getleavePlan/${employeeId}`, {
        params: {
          month: Number(month),
          year: Number(year),
        },
      });
      set({ loading: false });
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getAttandanceTrack: async (managerId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/manager/attendanceTrack/${managerId}`);
      set({ loading: false });
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

 getMonthlyReport: async (managerId, month, year) => {
  console.log(managerId, month, year);
  set({ loading: true, error: null });
  try {
    const response = await api.get(`/manager/monthlyReport/${managerId}`, {
      params: { month: month + 1, year },
    });

    console.log("Monthly Report Response:", response.data);

    set({ loading: false });
    return response.data;
  } catch (error) {
    console.error("Monthly Report Error:", error);
    set({ error: error.message, loading: false });
    throw error;
  }
},

  employeeUpdateDetails: async (employeeId, payload) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(
        `/manager/editEmployeedetails/${employeeId}`,
        payload
      );
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

employeeDateWiseAttandace: async (managerId,date) => {

  console.log(managerId, date, "store")
  set({ loading: true, error: null });
  try {
    const response = await api.get(`/manager/getDateWiseAttandance`, {
      params: { managerId:managerId, date:date },
    });
    set({ loading: false });
    return response.data;
  } catch (error) {
    set({ error: error.message, loading: false });
    throw error;
  }
},

}));

export default useManagerStore;
