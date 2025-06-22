import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  Row,
  Col,
  ListGroup,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import dayjs from "dayjs";
import useManagerStore from "../../Store/AuthStore/ManagerStore";
import { toast } from "react-toastify";
import useAuthStore from "../../Store/AuthStore/AuthStore";

const leaveTypes = [
  "Full Day",
  "Half Day",
  "Emergency Full Day",
  "Emergency Half Day",
];

const LeavePlan = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveData, setLeaveData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveType, setLeaveType] = useState("Full Day");

  const { employees, getEmployees, employeeLeavePlan, getLeavePlan } = useManagerStore();
  const { user } = useAuthStore();

  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = useMemo(() => Array.from({ length: 12 }, (_, i) => currentYear - 1 + i), [currentYear]);

  const getDaysInMonth = useCallback((year, month) => {
    const totalDays = dayjs(`${year}-${month + 1}-01`).daysInMonth();
    return Array.from({ length: totalDays }, (_, i) =>
      dayjs(`${year}-${month + 1}-${i + 1}`).format("YYYY-MM-DD")
    );
  }, []);

  const days = useMemo(() => getDaysInMonth(year, month), [getDaysInMonth, month, year]);

  useEffect(() => {
    if (user) {
      getEmployees(user._id);
    }
  }, [user, getEmployees]);

  useEffect(() => {
    const fetchLeavePlan = async () => {
      if (!selectedEmployee) return;
      try {
        const data = await getLeavePlan(selectedEmployee._id, Number(month), Number(year));
        if (data?.data?.success) {
          const leaveMap = {};
          data.data.leaves.forEach((leave) => {
            leaveMap[dayjs(leave.date).format("YYYY-MM-DD")] = {
              type: leave.type,
              reason: leave.reason,
            };
          });

          setLeaveData((prev) => ({
            ...prev,
            [selectedEmployee._id]: leaveMap,
          }));
        } else {
          toast.error("Failed to load leave plan.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error loading leave data.");
      }
    };

    fetchLeavePlan();
  }, [selectedEmployee, month, year, getLeavePlan]);

  const handleDayClick = useCallback((date) => {
    const today = dayjs().startOf("day");
    const clickedDate = dayjs(date).startOf("day");

    if (clickedDate.isBefore(today)) {
      toast.info("You can only plan leaves for today or future dates.");
      return;
    }

    setSelectedDate(date);
    const existing = leaveData[selectedEmployee?._id]?.[date];
    setLeaveType(existing?.type || "Full Day");
    setLeaveReason(existing?.reason || "");
    setShowModal(true);
  }, [leaveData, selectedEmployee]);

  const handleSaveLeave = useCallback(async () => {
    try {
      const response = await employeeLeavePlan({
        employeeId: selectedEmployee._id,
        date: selectedDate,
        type: leaveType,
        reason: leaveReason,
      });

      if (response?.data?.success) {
        setLeaveData((prev) => {
          const empLeaves = { ...(prev[selectedEmployee._id] || {}) };
          empLeaves[selectedDate] = { type: leaveType, reason: leaveReason };
          return { ...prev, [selectedEmployee._id]: empLeaves };
        });

        toast.success("Leave saved successfully!");
        setShowModal(false);
        setLeaveReason("");
        setLeaveType("Full Day");
        setSelectedDate("");
      } else {
        toast.error("Failed to save leave.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while saving leave.");
    }
  }, [employeeLeavePlan, selectedEmployee, selectedDate, leaveType, leaveReason]);

  const getLeaveTypeClass = useCallback((date) => {
    const leave = leaveData[selectedEmployee?._id]?.[date];
    if (!leave) return "bg-light";

    switch (leave.type) {
      case "Full Day":
        return "bg-warning text-dark";
      case "Half Day":
        return "bg-info text-dark";
      case "Emergency Full Day":
        return "bg-danger text-white";
      case "Emergency Half Day":
        return "bg-secondary text-white";
      default:
        return "bg-light";
    }
  }, [leaveData, selectedEmployee]);

  return (
    <div className="p-4">
      <h4 className="mb-4 fw-bold">Leave Planning</h4>

      <Row>
        <Col md={4}>
          <Card className="shadow border-0 rounded-4">
            <Card.Header className="fw-semibold">Employees List</Card.Header>
            <ListGroup variant="flush">
              {employees.map((emp) => (
                <ListGroup.Item
                  key={emp._id}
                  action
                  active={selectedEmployee?._id === emp._id}
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
                      <option value={idx} key={idx}>
                        {m}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    size="sm"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
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
                      width: "14.28%",
                      minHeight: "80px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      border: "1px solid #dee2e6",
                      borderRadius: "4px",
                    }}
                  >
                    <div>{dayjs(date).date()}</div>
                    {leaveData[selectedEmployee._id]?.[date] && (
                      <small className="d-block mt-1">
                        {leaveData[selectedEmployee._id][date].type}
                      </small>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted mt-4">
              Select an employee to view or assign leaves.
            </p>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Mark Leave - {dayjs(selectedDate).format("DD MMM YYYY")}
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
                <option key={idx} value={type}>
                  {type}
                </option>
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
