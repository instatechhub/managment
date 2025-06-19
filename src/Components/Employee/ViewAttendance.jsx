import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

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
  const maxMonth = today.toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(maxMonth);

  const filteredEmployees = employees.filter(emp => emp.month === selectedMonth);

  const handleClick = (id) => {
    navigate(`/employee-attendance/${id}`);
  };

  const displayMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <Container className="mt-4">
      <h3 className="fw-bold text-center mb-4">Employee Attendance Overview</h3>

      <div className="d-flex justify-content-center mb-4">
        <input
          type="month"
          className="form-control shadow-sm"
          style={{ maxWidth: '250px', borderRadius: '8px' }}
          value={selectedMonth}
          max={maxMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      {filteredEmployees.length === 0 ? (
        <p className="text-center text-muted">No attendance records found for {displayMonth(selectedMonth)}</p>
      ) : (
        <Row className="g-4">
          {filteredEmployees.map((emp) => (
            <Col xs={12} md={6} lg={4} key={`${emp.id}-${emp.month}`}>
              <Card
              
                onClick={() => handleClick(emp.id)}
                className="border-1 shadow-sm rounded-4 attendance-card h-100"
                style={{ cursor: 'pointer', transition: 'transform 0.3s ease-in-out' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <FaUserCircle size={40} className="text-primary" />
                    <div>
                      <h5 className="mb-0 fw-semibold">{emp.name}</h5>
                      <small className="text-muted">ID: {emp.id}</small>
                    </div>
                  </div>

                  <hr />

                  <Row>
                    <Col xs={6}>
                      <div className="text-muted small">Month</div>
                      <div className="fw-semibold">{displayMonth(emp.month)}</div>
                    </Col>
                    <Col xs={6} className="text-end">
                      <div className="text-muted small">Present Days</div>
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
