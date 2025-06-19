import React, { useState } from 'react';
import { Card, Row, Col, ListGroup, Modal, Button, Form } from 'react-bootstrap';
import dayjs from 'dayjs';

const employees = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Davis' },
];

const leaveTypes = [
  'Full Day',
  'Half Day',
  'Emergency Full Day',
  'Emergency Half Day'
];

const LeavePlan = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveData, setLeaveData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveType, setLeaveType] = useState('Full Day');

  const currentMonth = dayjs().month(); // 0-11
  const currentYear = dayjs().year();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const getDaysInMonth = (year, month) => {
    const days = [];
    const totalDays = dayjs(`${year}-${month + 1}-01`).daysInMonth();

    for (let i = 1; i <= totalDays; i++) {
      days.push(dayjs(`${year}-${month + 1}-${i}`).format('YYYY-MM-DD'));
    }

    return days;
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    const existing = leaveData[selectedEmployee?.id]?.[date];
    setLeaveType(existing?.type || 'Full Day');
    setLeaveReason(existing?.reason || '');
    setShowModal(true);
  };

  const handleSaveLeave = () => {
    setLeaveData((prev) => {
      const empLeaves = { ...(prev[selectedEmployee.id] || {}) };
      empLeaves[selectedDate] = {
        type: leaveType,
        reason: leaveReason
      };

      return {
        ...prev,
        [selectedEmployee.id]: empLeaves,
      };
    });

    setShowModal(false);
    setLeaveReason('');
    setLeaveType('Full Day');
    setSelectedDate('');
  };

  const getLeaveTypeClass = (date) => {
    const leave = leaveData[selectedEmployee?.id]?.[date];
    if (!leave) return 'bg-light';

    switch (leave.type) {
      case 'Full Day':
        return 'bg-warning text-dark';
      case 'Half Day':
        return 'bg-info text-dark';
      case 'Emergency Full Day':
        return 'bg-danger text-white';
      case 'Emergency Half Day':
        return 'bg-secondary text-white';
      default:
        return 'bg-light';
    }
  };

  const days = getDaysInMonth(year, month);

  return (
    <div className="p-4">
      <h4 className="mb-4 fw-bold">🗓️ Leave Planning</h4>

      <Row>
        <Col md={4}>
          <Card className="shadow border-0 rounded-4">
            <Card.Header className="fw-semibold">Employees</Card.Header>
            <ListGroup variant="flush">
              {employees.map((emp) => (
                <ListGroup.Item
                  key={emp.id}
                  action
                  active={selectedEmployee?.id === emp.id}
                  onClick={() => setSelectedEmployee(emp)}
                  className="d-flex justify-content-between align-items-center"
                >
                  {emp.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col md={8}>
          {selectedEmployee ? (
            <>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0 fw-semibold">
                  {selectedEmployee.name} - {months[month]} {year}
                </h5>
                <div className="d-flex gap-2">
                  <Form.Select
                    size="sm"
                    value={month}
                    onChange={(e) => setMonth(parseInt(e.target.value))}
                  >
                    {months.map((m, idx) => (
                      <option value={idx} key={idx}>{m}</option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    size="sm"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2">
                {days.map((date) => (
                  <div
                    key={date}
                    onClick={() => handleDayClick(date)}
                    className={`p-2 calendar-cell border text-center ${getLeaveTypeClass(date)}`}
                    style={{
                      width: '14.28%',
                      minHeight: '80px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '4px',
                    }}
                  >
                    <div>{dayjs(date).date()}</div>
                    {leaveData[selectedEmployee.id]?.[date] && (
                      <small className="d-block mt-1">{leaveData[selectedEmployee.id][date].type}</small>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted mt-4">Select an employee to view or assign leaves.</p>
          )}
        </Col>
      </Row>

      {/* Modal for leave input */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Mark Leave - {dayjs(selectedDate).format('DD MMM YYYY')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Leave Type</Form.Label>
            <Form.Select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              {leaveTypes.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Reason/Comment</Form.Label>
            <Form.Control
              type="text"
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              placeholder="Enter reason"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveLeave}>Save Leave</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeavePlan;
