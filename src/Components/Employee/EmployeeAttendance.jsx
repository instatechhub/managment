// src/pages/EmployeeAttendance.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import './EmployeeAttendance.css';

const attendanceRecords = {
  1: [
    { date: '2025-06-01', status: 'Present' },
    { date: '2025-06-02', status: 'Absent' },
    { date: '2025-06-03', status: 'Half Day' },
    { date: '2025-06-04', status: 'Present' },
    { date: '2025-06-05', status: 'Absent' },
    { date: '2025-06-06', status: 'Present' },
    { date: '2025-06-07', status: 'Present' },
  ],
  2: [
    { date: '2025-06-01', status: 'Present' },
    { date: '2025-06-02', status: 'Present' },
    { date: '2025-06-03', status: 'Absent' },
  ],

   3: [
    { date: '2025-06-01', status: 'Present' },
    { date: '2025-06-02', status: 'Present' },
    { date: '2025-06-03', status: 'Absent' },
  ],
};

const employeeNames = {
  1: 'Ravi Kumar',
  2: 'Anjali Sharma',
};

const statusColors = {
  Present: 'success',
  Absent: 'danger',
  'Half Day': 'warning',
};

const EmployeeAttendance = () => {
  const { id } = useParams();
  const records = attendanceRecords[id] || [];
  const employeeName = employeeNames[id] || 'Unknown';

  return (
    <Container className="mt-4">
      <h4 className="mb-4 text-center">{employeeName}'s Monthly Attendance</h4>

      <Row xs={2} sm={3} md={4} lg={5} className="g-3">
        {records.map((record, index) => (
          <Col key={index}>
            <Card className={`shadow-sm attendance-card border-${statusColors[record.status]}`}>
              <Card.Body className="text-center">
                <h6 className="mb-2">{new Date(record.date).toDateString()}</h6>
                <Badge bg={statusColors[record.status]}>{record.status}</Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EmployeeAttendance;
