import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { FaUserTie } from 'react-icons/fa';
import useManagerStore from '../../Store/AuthStore/ManagerStore';
import useAuthStore from '../../Store/AuthStore/AuthStore';

const EmployeeList = () => {
  const navigate = useNavigate();
  const {getEmployees,employees} = useManagerStore();
  const {user} = useAuthStore();

  useEffect(()=>{
    if(user){
    const fetchEmployee = async ()=>{
      await getEmployees(user._id);
    }
    fetchEmployee();
    }
  },[user])

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
              onClick={() => navigate(`/employee/${emp?._id}`)}
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
                    <h5 className="mb-1">{emp?.name?.toUpperCase()}</h5>
                    <Badge
                      bg={emp.status === 'active' ? 'success' : 'secondary'}
                      className="px-3 py-1 rounded-pill"
                    >
                      {emp?.status?.toUpperCase()}
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
