import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Sample data: assume month is YYYY-MM format for easy comparison/filter
const employees = [
  { id: 1, name: 'Ravi Kumar', month: '2025-06', presentCount: 20 },
  { id: 2, name: 'Anjali Sharma', month: '2025-06', presentCount: 18 },
  { id: 3, name: 'Mohit Sinha', month: '2025-06', presentCount: 22 },
  { id: 1, name: 'Ravi Kumar', month: '2025-05', presentCount: 21 },
  { id: 2, name: 'Anjali Sharma', month: '2025-05', presentCount: 19 },
  { id: 3, name: 'Mohit Sinha', month: '2025-05', presentCount: 20 },
];

const ViewAttendance = () => {
  const navigate = useNavigate();
  const today = new Date();
  // Format YYYY-MM for max month restriction (current month)
  const maxMonth = today.toISOString().slice(0, 7);

  const [selectedMonth, setSelectedMonth] = useState(maxMonth); // default current month

  // Filter employees by selectedMonth
  const filteredEmployees = employees.filter(emp => emp.month === selectedMonth);

  const handleClick = (id) => {
    navigate(`/employee-attendance/${id}`);
  };

  // Format month to display nicely: "June 2025"
  const displayMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3 fw-bold text-center">Employee Monthly Attendance Summary</h3>

      <input
        type="month"
        className="form-control mb-4 mx-auto"
        style={{ maxWidth: '200px' }}
        value={selectedMonth}
        max={maxMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />

      {filteredEmployees.length === 0 ? (
        <p className="text-center text-muted">No attendance records found for {displayMonth(selectedMonth)}</p>
      ) : (
        <Row className="g-3">
          {filteredEmployees.map((emp) => (
            <Col xs={12} md={6} lg={4} key={`${emp.id}-${emp.month}`}>
              <Card
                onClick={() => handleClick(emp.id)}
                className="shadow-sm rounded-4 border-0"
                style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Card.Body>
                  <Card.Title className="fw-semibold mb-2">{emp.name}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    Employee ID: <span className="fw-bold">{emp.id}</span>
                  </Card.Subtitle>

                  <Row className="align-items-center">
                    <Col xs={7}>
                      <div className="text-secondary" style={{ fontSize: '0.9rem' }}>Month</div>
                      <div className="fw-semibold">{displayMonth(emp.month)}</div>
                    </Col>
                    <Col xs={5} className="text-end">
                      <div className="text-secondary" style={{ fontSize: '0.9rem' }}>Present Days</div>
                      <div className="fw-bold fs-4 text-success">{emp.presentCount}</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ViewAttendance;
