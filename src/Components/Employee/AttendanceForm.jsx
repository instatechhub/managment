import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { BsPersonCheckFill, BsPersonXFill, BsClockFill, BsHouse, BsBriefcase } from 'react-icons/bs';

const employees = [
  { id: 'EMP001', name: 'Ravi Kumar' },
  { id: 'EMP002', name: 'Anjali Sharma' },
  { id: 'EMP003', name: 'Aman Verma' },
  { id: 'EMP004', name: 'Sneha Mehta' },
  { id: 'EMP005', name: 'Rohit Singh' },
];

const attendanceOptions = [
  { label: 'Present', icon: <BsPersonCheckFill className="me-2 text-success" /> },
  { label: 'Absent', icon: <BsPersonXFill className="me-2 text-danger" /> },
  { label: 'Half Day', icon: <BsClockFill className="me-2 text-warning" /> },
  { label: 'Leave', icon: <BsBriefcase className="me-2 text-info" /> },
  { label: 'WFH', icon: <BsHouse className="me-2 text-primary" /> },
];

const AttendanceForm = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [attendance, setAttendance] = useState(
    employees.reduce((acc, emp) => {
      acc[emp.id] = 'Present';
      return acc;
    }, {})
  );

  const changeStatus = (empId, status) => {
    setAttendance((prev) => ({ ...prev, [empId]: status }));
  };

  const handleSubmit = () => {
    console.log({ selectedDate, attendance });
    alert('Attendance submitted successfully!');
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Present':
        return 'success';
      case 'Absent':
        return 'danger';
      case 'Half Day':
        return 'warning';
      case 'Leave':
        return 'info';
      case 'WFH':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="fw-bold">Daily Attendance</h3>
        <p className="text-muted mb-2">
          Mark today's attendance for your team members with just a few clicks.
        </p>

        <input
  type="date"
  className="form-control d-inline-block shadow-sm"
  value={selectedDate}
  max={today}       
  onChange={(e) => setSelectedDate(e.target.value)}
  style={{
    maxWidth: '300px',
    borderRadius: '30px',
    padding: '10px 20px',
    textAlign: 'center',
  }}
/>
        <div className="small text-muted mt-1">Select date</div>
      </div>

      {/* Employee Cards */}
      <Row className="g-4 mt-3">
        {employees.map((emp) => (
          <Col xs={12} sm={6} md={4} lg={3} key={emp.id}>
            <Card className="h-100 shadow-sm border-0 rounded-4">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <h6 className="fw-semibold">{emp.name}</h6>
                  <div className="text-muted small">{emp.id}</div>
                </div>

                <div className="mt-3">
                  <Dropdown as={ButtonGroup}>
                    <Button
                      variant={getStatusVariant(attendance[emp.id])}
                      className="rounded-pill"
                    >
                      {attendance[emp.id]}
                    </Button>
                    <Dropdown.Toggle
                      split
                      variant="light"
                      className="rounded-pill"
                    />
                    <Dropdown.Menu>
                      {attendanceOptions.map((option) => (
                        <Dropdown.Item
                          key={option.label}
                          onClick={() => changeStatus(emp.id, option.label)}
                        >
                          {option.icon}
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Submit Button */}
      <div className="text-center mt-5">
        <Button
          variant="primary"
          size="lg"
          className="px-5 py-2 rounded-pill shadow"
          onClick={handleSubmit}
        >
          Submit Attendance
        </Button>
      </div>
    </Container>
  );
};

export default AttendanceForm;
