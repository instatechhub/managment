import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import useManagerStore from '../../Store/AuthStore/ManagerStore';
import useAuthStore from '../../Store/AuthStore/AuthStore';

const ViewAttendance = () => {
  const { viewAttendanceList } = useManagerStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const today = useMemo(() => new Date(), []);
  const maxMonth = useMemo(() => today.toISOString().slice(0, 7), [today]);
  const [selectedMonth, setSelectedMonth] = useState(maxMonth);
  const [attendanceData, setAttendanceData] = useState([]);

  const fetchAttendanceData = useCallback(async () => {
    if (!user?._id || !selectedMonth) return;
    const [year, month] = selectedMonth.split('-');
    try {
      const response = await viewAttendanceList({
        managerId: user._id,
        month: parseInt(month),
        year: parseInt(year),
      });
      setAttendanceData(response);
    } catch (error) {
      console.error("Failed to fetch attendance data:", error);
    }
  }, [user?._id, selectedMonth, viewAttendanceList]);

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);

  const handleCardClick = useCallback((id) => {
    navigate(`/employee-attendance/${id}`);
  }, [navigate]);

  const displayMonth = useCallback((monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }, []);

  const filteredEmployees = useMemo(() => {
    return attendanceData.map((emp) => ({
      id: emp.employeeId,
      name: emp.name,
      month: `${emp.year}-${String(emp.month).padStart(2, '0')}`,
      presentCount: emp.presentDays
    })).filter(emp => emp.month === selectedMonth);
  }, [attendanceData, selectedMonth]);

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
        <p className="text-center text-muted">
          No attendance records found for {displayMonth(selectedMonth)}
        </p>
      ) : (
        <Row className="g-4">
          {filteredEmployees.map((emp) => (
            <Col xs={12} md={6} lg={4} key={`${emp.id}-${emp.month}`}>
              <Card
                onClick={() => handleCardClick(emp.id)}
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