import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { FaUserTie } from 'react-icons/fa';

const employees = [
  { id: 1, name: 'Ravi Kumar', status: 'Active' },
  { id: 2, name: 'Anjali Sharma', status: 'Inactive' },
  { id: 3, name: 'Aman Verma', status: 'Active' },
];

const EmployeeList = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4 text-dark">
        Employees List
      </h3>

      <Row className="g-4">
        {employees.map((emp) => (
          <Col key={emp.id} xs={12} sm={6} md={4}>
            <Card
              className="employee-card shadow-sm border-0 rounded-4"
              onClick={() => navigate(`/employee/${emp.id}`)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'translateY(-4px)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'translateY(0)')
              }
            >
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="mb-1">{emp.name}</h5>
                    <Badge
                      bg={emp.status === 'Active' ? 'success' : 'secondary'}
                      className="px-3 py-1 rounded-pill"
                    >
                      {emp.status}
                    </Badge>
                  </div>
                  <FaUserTie className="fs-3 text-muted" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EmployeeList;
