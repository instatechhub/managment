import React, { useState } from 'react';
import { Container, Table, Form, Button, Row, Col, Card } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const attendanceData = [
  // Ravi Kumar
  { date: '2025-06-01', employee: 'Ravi Kumar', status: 'Present' },
  { date: '2025-06-02', employee: 'Ravi Kumar', status: 'Absent' },
  { date: '2025-06-03', employee: 'Ravi Kumar', status: 'Half Day' },
  { date: '2025-06-04', employee: 'Ravi Kumar', status: 'Week Off' },
  { date: '2025-06-05', employee: 'Ravi Kumar', status: 'Week Off' },
  { date: '2025-06-06', employee: 'Ravi Kumar', status: 'Present' },

  // Anjali Sharma
  { date: '2025-06-01', employee: 'Anjali Sharma', status: 'Present' },
  { date: '2025-06-02', employee: 'Anjali Sharma', status: 'Half Day' },
  { date: '2025-06-03', employee: 'Anjali Sharma', status: 'Half Day' },
  { date: '2025-06-04', employee: 'Anjali Sharma', status: 'Week Off' },
  { date: '2025-06-05', employee: 'Anjali Sharma', status: 'Week Off' },
  { date: '2025-06-06', employee: 'Anjali Sharma', status: 'Week Off' },
  { date: '2025-06-07', employee: 'Anjali Sharma', status: 'Week Off' },

  // Mohit Singh - All Absent
  { date: '2025-06-01', employee: 'Mohit Singh', status: 'Absent' },
  { date: '2025-06-02', employee: 'Mohit Singh', status: 'Absent' },
  { date: '2025-06-03', employee: 'Mohit Singh', status: 'Absent' },
  { date: '2025-06-04', employee: 'Mohit Singh', status: 'Week Off' },

  // Priya Verma - All Present
  { date: '2025-06-01', employee: 'Priya Verma', status: 'Present' },
  { date: '2025-06-02', employee: 'Priya Verma', status: 'Present' },
  { date: '2025-06-03', employee: 'Priya Verma', status: 'Present' },
  { date: '2025-06-04', employee: 'Priya Verma', status: 'Present' },
  { date: '2025-06-05', employee: 'Priya Verma', status: 'Week Off' },
  { date: '2025-06-06', employee: 'Priya Verma', status: 'Week Off' },
];

const initialEmployeeData = {
  'Ravi Kumar':       { monthlySalary: 30000, allowedWeekOffs: 4 },
  'Anjali Sharma':    { monthlySalary: 36000, allowedWeekOffs: 3 },
  'Mohit Singh':      { monthlySalary: 25000, allowedWeekOffs: 2 },
  'Priya Verma':      { monthlySalary: 28000, allowedWeekOffs: 4 },
};

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const ViewReport = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);

  const handleEmployeeChange = (emp, field, value) => {
    setEmployeeData((prev) => ({
      ...prev,
      [emp]: {
        ...prev[emp],
        [field]: Number(value) || 0,
      },
    }));
  };

  const calculateSummary = () => {
    const summary = {};

    attendanceData.forEach(({ date, employee, status }) => {
      const d = new Date(date);
      if (d.getMonth() !== month || d.getFullYear() !== year) return;

      if (!summary[employee]) {
        summary[employee] = { Present: 0, Absent: 0, 'Half Day': 0, WeekOffTaken: 0 };
      }

      if (status === 'Week Off') {
        summary[employee].WeekOffTaken += 1;
      } else {
        summary[employee][status] += 1;
      }
    });

    const daysInMonth = getDaysInMonth(month, year);

    Object.keys(summary).forEach((emp) => {
      const empData = employeeData[emp] || {};
      const monthlySalary = empData.monthlySalary || 0;
      const allowedWeekOffs = empData.allowedWeekOffs || 0;
      const weekOffTaken = summary[emp].WeekOffTaken || 0;

      const perDaySalary = monthlySalary / daysInMonth;
      const totalPayableDays = summary[emp].Present + 0.5 * summary[emp]['Half Day'];
      const basicPayable = totalPayableDays * perDaySalary;

      const extraWeekOff = Math.max(0, weekOffTaken - allowedWeekOffs);
      const deduction = extraWeekOff * perDaySalary;

      summary[emp].perDaySalary = perDaySalary;
      summary[emp].Payable = basicPayable - deduction;
      summary[emp].deduction = deduction;
      summary[emp].monthlySalary = monthlySalary;
      summary[emp].extraWeekOff = extraWeekOff;
      summary[emp].allowedWeekOffs = allowedWeekOffs;
    });

    return summary;
  };

  const handleDownload = () => {
    const summary = calculateSummary();

    const exportData = Object.entries(summary).map(([emp, data]) => ({
      Employee: emp,
      'Monthly Salary (₹)': employeeData[emp]?.monthlySalary || 0,
      'Per Day Salary (₹)': data.perDaySalary.toFixed(2),
      Present: data.Present,
      'Half Day': data['Half Day'],
      Absent: data.Absent,
      'Allowed Week Offs': employeeData[emp]?.allowedWeekOffs || 0,
      'Taken Week Offs': data.WeekOffTaken,
      'Extra Week Offs': data.extraWeekOff,
      'Deduction (₹)': data.deduction.toFixed(2),
      'Final Salary (₹)': data.Payable.toFixed(2),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Summary');

    const fileName = `Attendance_Report_${year}_${month + 1}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const monthlySummary = calculateSummary();

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Monthly Attendance & Salary Report</h3>

      <Card className="p-4 mb-4 shadow-sm">
        <Form>
          <Row>
            <Col md={4}>
              <Form.Label>Select Month</Form.Label>
              <Form.Select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label>Select Year</Form.Label>
              <Form.Control
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                min="2000"
                max="2099"
              />
            </Col>
            <Col md={4} className="d-flex align-items-end justify-content-between">
              <Button variant="secondary" onClick={() => {
                setMonth(today.getMonth());
                setYear(today.getFullYear());
              }}>
                Reset to Current
              </Button>
              <Button variant="success" onClick={handleDownload}>
                Download Excel
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Table bordered responsive hover className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Employee</th>
            <th>Monthly Salary (₹)</th>
            <th>Per Day Salary (₹)</th>
            <th>Present</th>
            <th>Half Day</th>
            <th>Absent</th>
            <th>Allowed Week Offs</th>
            <th>Taken Week Offs</th>
            <th>Extra Week Offs</th>
            <th>Deduction (₹)</th>
            <th>Final Salary (₹)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(monthlySummary).length === 0 ? (
            <tr>
              <td colSpan="11" className="text-center">No data available for this month.</td>
            </tr>
          ) : (
            Object.entries(monthlySummary).map(([emp, data], idx) => (
              <tr key={idx}>
                <td>{emp}</td>
                <td>
                  <Form.Control
                    type="number"
                    value={employeeData[emp]?.monthlySalary || 0}
                    onChange={(e) => handleEmployeeChange(emp, 'monthlySalary', e.target.value)}
                  />
                </td>
                <td>₹ {data.perDaySalary.toFixed(2)}</td>
                <td>{data.Present}</td>
                <td>{data['Half Day']}</td>
                <td>{data.Absent}</td>
                <td>
                  <Form.Control
                    type="number"
                    value={employeeData[emp]?.allowedWeekOffs || 0}
                    onChange={(e) => handleEmployeeChange(emp, 'allowedWeekOffs', e.target.value)}
                  />
                </td>
                <td>{data.WeekOffTaken}</td>
                <td>{data.extraWeekOff}</td>
                <td>₹ {data.deduction.toFixed(2)}</td>
                <td><strong>₹ {data.Payable.toFixed(2)}</strong></td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewReport;
