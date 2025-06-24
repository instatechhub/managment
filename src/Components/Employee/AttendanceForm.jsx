import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  ButtonGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  BsPersonCheckFill,
  BsPersonXFill,
  BsClockFill,
  BsHouse,
  BsBriefcase,
} from "react-icons/bs";
import useManagerStore from "../../Store/AuthStore/ManagerStore";
import useAuthStore from "../../Store/AuthStore/AuthStore";
import { toast } from "react-toastify";

const attendanceOptions = [
  {
    label: "Present",
    icon: <BsPersonCheckFill className="me-2 text-success" />,
  },
  { label: "Absent", icon: <BsPersonXFill className="me-2 text-danger" /> },
  { label: "Half Day", icon: <BsClockFill className="me-2 text-warning" /> },
  { label: "Leave", icon: <BsBriefcase className="me-2 text-info" /> },
  { label: "WFH", icon: <BsHouse className="me-2 text-primary" /> },
];

const AttendanceForm = () => {
  const {
    getActiveEmployees,
    activeEmployees,
    markedAttendance,
    employeeDateWiseAttandace,
  } = useManagerStore();
  const { user } = useAuthStore();

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [dateWiseAttandance, setDateWiseAttandance] = useState([]);

  const isToday = selectedDate === today;

  useEffect(() => {
    if (!user) return;

    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError(null);
        await getActiveEmployees(user._id);
      } catch (err) {
        setError("Please Add Employee First then try again");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [user, getActiveEmployees]);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!user) return;

      try {
        const response = await employeeDateWiseAttandace(
          user?._id,
          selectedDate
        );

        if (response?.success) {
          const prevAttendance = response.attendance;

          const initialAttendance = activeEmployees?.reduce((acc, emp) => {
            const found = prevAttendance.find(
              (a) => a.employeeId === emp._id
            );
            acc[emp._id] = found ? found.status : "Present";
            return acc;
          }, {});

          setAttendance(initialAttendance);
          setDateWiseAttandance(prevAttendance);
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendance();
  }, [user, selectedDate, activeEmployees]);

  const changeStatus = (empId, status) => {
    setAttendance((prev) => ({ ...prev, [empId]: status }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const records = Object.entries(attendance).map(
        ([employeeId, status]) => ({
          employeeId,
          status,
        })
      );

      await markedAttendance({
        date: selectedDate,
        records,
      });

      toast.success("Attendance marked successfully!");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong while submitting attendance.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Present":
        return "success";
      case "Absent":
        return "danger";
      case "Half Day":
        return "warning";
      case "Leave":
        return "info";
      case "WFH":
        return "primary";
      default:
        return "secondary";
    }
  };

  const getPreviousStatus = (empId) => {
    const record = dateWiseAttandance.find((a) => a.employeeId === empId);
    return record?.status || null;
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h3 className="fw-bold">Daily Attendance</h3>
        <p className="text-muted mb-2">Mark attendance for your team members.</p>

        <input
          type="date"
          className="form-control d-inline-block shadow-sm"
          value={selectedDate}
          max={today}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            maxWidth: "300px",
            borderRadius: "30px",
            padding: "10px 20px",
            textAlign: "center",
          }}
        />
        <div className="small text-muted mt-1">Select Date</div>
      </div>

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="dark" />
          <div className="mt-2 text-muted">Loading employees...</div>
        </div>
      ) : (
        <>
          <Row className="g-4 mt-3">
            {activeEmployees.length === 0 ? (
              <Col>
                <div className="text-center text-muted fw-semibold fs-5 py-5">
                  No Employee Active
                </div>
              </Col>
            ) : (
              activeEmployees.map((emp) => (
                <Col xs={12} sm={6} md={4} lg={3} key={emp._id}>
                  <Card className="h-100 shadow-sm border-0 rounded-4 p-3">
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div>
                        <h6 className="fw-semibold text-truncate">
                          {emp.name?.toUpperCase()}
                        </h6>
                        {/* <div className="text-muted small">{emp._id}</div> */}
                        {getPreviousStatus(emp._id) && (
                          <div className="text-muted small mt-1">
                            Previous:{" "}
                            <span
                              className={`text-${getStatusVariant(
                                getPreviousStatus(emp._id)
                              )}`}
                            >
                              {getPreviousStatus(emp._id)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 d-flex justify-content-between align-items-center">
                        <Dropdown as={ButtonGroup} className="w-100" disabled={!isToday}>
                          <Button
                            variant={getStatusVariant(attendance[emp._id])}
                            className="rounded-pill w-100 text-truncate"
                          >
                            {attendance[emp._id]}
                          </Button>
                          <Dropdown.Toggle
                            split
                            variant="light"
                            className="rounded-pill border"
                            id={`dropdown-${emp._id}`}
                          />
                          <Dropdown.Menu className="shadow-sm rounded-3 w-100">
                            {attendanceOptions.map((option) => (
                              <Dropdown.Item
                                key={option.label}
                                onClick={() => changeStatus(emp._id, option.label)}
                                className="d-flex align-items-center"
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
              ))
            )}
          </Row>
          
          {isToday && (
            <div className="text-center mt-5">
{Array.isArray(activeEmployees) && activeEmployees.length > 0 && (
  <Button
    variant="primary"
    size="lg"
    className="px-5 py-2 rounded-pill shadow"
    onClick={handleSubmit}
    disabled={submitting}
  >
    {submitting ? (
      <>
        <Spinner animation="border" size="sm" className="me-2" />
        Submitting...
      </>
    ) : (
      "Submit Attendance"
    )}
  </Button>
)}

            </div>
          )}
          
        </>
      )}
    </Container>
  );
};

export default AttendanceForm;
