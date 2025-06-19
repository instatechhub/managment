import React, { useState } from 'react';
import { Card, Row, Col, ListGroup, Modal, Button, Form } from 'react-bootstrap';
import dayjs from 'dayjs';

const employees = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Davis' },
];

const LeavePlan = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveData, setLeaveData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

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
    const start = dayjs(`${year}-${month + 1}-01`);
    const totalDays = start.daysInMonth();

    for (let i = 1; i <= totalDays; i++) {
      days.push(dayjs(`${year}-${month + 1}-${i}`).format('YYYY-MM-DD'));
    }

    return days;
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    const existing = leaveData[selectedEmployee?.id]?.[date] || '';
    setLeaveReason(existing);
    setShowModal(true);
  };

  const handleSaveLeave = () => {
    setLeaveData((prev) => {
      const empLeaves = { ...(prev[selectedEmployee.id] || {}) };
      empLeaves[selectedDate] = leaveReason;

      return {
        ...prev,
        [selectedEmployee.id]: empLeaves,
      };
    });

    setShowModal(false);
    setLeaveReason('');
    setSelectedDate('');
  };

  const isLeaveMarked = (date) => {
    return leaveData[selectedEmployee?.id]?.[date];
  };

  const days = getDaysInMonth(year, month);

  return (
    <div>
      <h4 className="mb-4">Leave Planning</h4>

      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>Employees List</Card.Header>
            <ListGroup variant="flush">
              {employees.map((emp) => (
                <ListGroup.Item
                  key={emp.id}
                  action
                  active={selectedEmployee?.id === emp.id}
                  onClick={() => setSelectedEmployee(emp)}
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
                <h5 className="mb-0">{selectedEmployee.name}</h5>
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
                    className={`p-3 border rounded text-center calendar-cell ${
                      isLeaveMarked(date) ? 'bg-warning text-dark' : 'bg-light'
                    }`}
                    style={{ width: '14.28%', cursor: 'pointer', minHeight: '80px' }}
                  >
                    <div>{dayjs(date).date()}</div>
                    {isLeaveMarked(date) && (
                      <small>{leaveData[selectedEmployee.id][date]}</small>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Select an employee to view or plan their leaves.</p>
          )}
        </Col>
      </Row>

      {/* Leave Reason Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Leave on {dayjs(selectedDate).format('DD MMM YYYY')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="leaveReason">
            <Form.Label>Reason/Comment</Form.Label>
            <Form.Control
              type="text"
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              placeholder="Enter leave reason"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveLeave}>
            Save Leave
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeavePlan;
