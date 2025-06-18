import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import AddEmployee from '../Components/Employee/EmployeeForm';
import MarkAttendance from '../Components/Employee/AttendanceForm';
import ViewAttendance from '../Components/Employee/ViewAttendance';
import Reports from '../Components/Employee/ViewReport';
import EmployeeAttendance from '../Components/Employee/EmployeeAttendance'

const AppRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/add-employee" element={<AddEmployee />} />
    <Route path="/mark-attendance" element={<MarkAttendance />} />
    <Route path="/view-attendance" element={<ViewAttendance />} />
    <Route path="/employee-attendance/:id" element={<EmployeeAttendance />} />
    <Route path="/reports" element={<Reports />} />
  </Routes>
);

export default AppRoutes;
