import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button, Row, Col, Card } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import useManagerStore from '../../Store/AuthStore/ManagerStore';
import useAuthStore from '../../Store/AuthStore/AuthStore';

const ViewReport = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [employeeData, setEmployeeData] = useState({});
  const { getMonthlyReport } = useManagerStore();
  const { user } = useAuthStore();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchData = async () => {
      try {
        const response = await getMonthlyReport(user._id, month, year);
        if (response?.success) {
          setRecords(response.report);

          const initialData = {};
          response.report.forEach(emp => {
            initialData[emp.employeeId] = {
              monthlySalary: Number(emp.salary) || 0,
              allowedWeekOffs: 4,
            };
          });
          setEmployeeData(initialData);
        }
      } catch (error) {
        console.error("Failed to fetch monthly report:", error);
      }
    };

    fetchData();
  }, [user, month, year]);

  const handleChange = (id, field, value) => {
    setEmployeeData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: Number(value),
      },
    }));
  };

  const handleDownload = () => {
    const exportData = records.map((emp) => {
      const empData = employeeData[emp.employeeId] || {};
      const salary = empData.monthlySalary || 0;
      const totalDays = emp.totalDays || 30;
      const allowedWeekOffs = empData.allowedWeekOffs || 0;
      const perDaySalary = salary / totalDays;
      const payableDays = emp.presentDays + 0.5 * emp.halfDays + allowedWeekOffs;
      const unpaidDays = Math.max(0, totalDays - payableDays);
      const deduction = unpaidDays * perDaySalary;
      const finalSalary = salary - deduction;

      return {
        Employee: emp.name,
        'Monthly Salary (₹)': salary,
        'Per Day Salary (₹)': perDaySalary.toFixed(2),
        Present: emp.presentDays,
        'Half Day': emp.halfDays,
        Absent: emp.absentDays,
        'Allowed Week Offs': allowedWeekOffs,
        'Unpaid Days': unpaidDays,
        'Deduction (₹)': deduction.toFixed(2),
        'Final Salary (₹)': finalSalary.toFixed(2),
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, `Attendance_Report_${year}_${month + 1}.xlsx`);
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Monthly Attendance & Salary Report</h3>

      <Card className="p-4 mb-4 shadow-sm">
        <Form>
          <Row>
            <Col md={4}>
              <Form.Label>Select Month</Form.Label>
              <Form.Select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
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
                onChange={(e) => setYear(Number(e.target.value))}
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
            <th>Unpaid Days</th>
            <th>Deduction (₹)</th>
            <th>Final Salary (₹)</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center">No data available for this month.</td>
            </tr>
          ) : (
            records.map((emp, idx) => {
              const empData = employeeData[emp.employeeId] || {};
              const salary = empData.monthlySalary || 0;
              const totalDays = emp.totalDays || 30;
              const allowedWeekOffs = empData.allowedWeekOffs || 0;
              const perDaySalary = salary / totalDays;
              const payableDays = emp.presentDays + 0.5 * emp.halfDays + allowedWeekOffs;
              const unpaidDays = Math.max(0, totalDays - payableDays);
              const deduction = unpaidDays * perDaySalary;
              const finalSalary = salary - deduction;

              return (
                <tr key={idx}>
                  <td>{emp.name?.toUpperCase()}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={salary}
                      onChange={(e) => handleChange(emp.employeeId, 'monthlySalary', e.target.value)}
                    />
                  </td>
                  <td>₹ {perDaySalary.toFixed(2)}</td>
                  <td>{emp.presentDays}</td>
                  <td>{emp.halfDays}</td>
                  <td>{emp.absentDays}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={allowedWeekOffs}
                      onChange={(e) => handleChange(emp.employeeId, 'allowedWeekOffs', e.target.value)}
                    />
                  </td>
                  <td>{unpaidDays}</td>
                  <td>₹ {deduction.toFixed(2)}</td>
                  <td><strong>₹ {finalSalary.toFixed(2)}</strong></td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewReport;
