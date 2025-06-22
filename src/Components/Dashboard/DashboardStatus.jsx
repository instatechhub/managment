import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
} from "react-icons/fa";
import useManagerStore from "../../Store/AuthStore/ManagerStore";
import useAuthStore from "../../Store/AuthStore/AuthStore";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const iconMap = {
  All: <FaUsers />,
  Present: <FaUserCheck />,
  Absent: <FaUserTimes />,
  "Half Day": <FaUserClock />,
};

const DashboardStats = ({ managerId }) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [stats, setStats] = useState([]);
  const [todayEmployees, setTodayEmployees] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {getAttandanceTrack}=useManagerStore();
  const {user} = useAuthStore();

useEffect(() => {
  if (!user?._id) return;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAttandanceTrack(user._id);
      console.log(response, "kklk");

      if (response.status !== 200) throw new Error("Failed to fetch data");

      // Axios response data is in response.data
      const data = response.data;

      setStats(data.stats);
      setTodayEmployees(data.todayEmployees);
      setChartData(data.chartData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [user]);


  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "success";
      case "Absent":
        return "danger";
      case "Half Day":
        return "warning";
      case "Not Marked":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const filteredEmployees =
    selectedStatus === "All"
      ? todayEmployees
      : todayEmployees.filter((emp) => emp.status === selectedStatus);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="px-3">
      {/* Monthly Chart */}
      <Row className="mt-4 mb-5">
        <Col>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body>
              {chartData ? (
                <Bar data={chartData} options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Monthly Attendance Overview" },
                  },
                }} />
              ) : (
                <p>No attendance data available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Stat Cards */}
      <Row className="g-4 mb-4">
        <h2>Today's Employees</h2>
        {stats.map((item, idx) => (
          <Col xs={12} sm={6} md={3} key={idx}>
            <div
              onClick={() => setSelectedStatus(item.status)}
              style={{
                background: item.status === "All"
                  ? "linear-gradient(135deg, #007bff, #6610f2)"
                  : item.status === "Present"
                    ? "linear-gradient(135deg, #28a745, #218838)"
                    : item.status === "Absent"
                      ? "linear-gradient(135deg, #dc3545, #c82333)"
                      : "linear-gradient(135deg, #ffc107, #e0a800)",
                color: "#fff",
                borderRadius: "16px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  selectedStatus === item.status
                    ? "0 0 12px 4px rgba(0, 0, 0, 0.25)"
                    : "0 4px 12px rgba(0,0,0,0.15)",
                cursor: "pointer",
                transform:
                  selectedStatus === item.status ? "scale(1.03)" : "scale(1)",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {iconMap[item.status] || <FaUsers />}
              </div>
              <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {item.value}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Filtered Employee Cards */}
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">
            {selectedStatus === "All"
              ? "All Employees"
              : `${selectedStatus} Employees`}
          </h5>
          <Row>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <Col md={3} sm={6} xs={12} key={emp._id} className="mb-3">
                  <Card border={getStatusColor(emp.status)}>
                    <Card.Body className="text-center">
                      <h6>{emp.name}</h6>
                      <span className={`badge bg-${getStatusColor(emp.status)}`}>
                        {emp.status}
                      </span>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No employees with status "{selectedStatus}" today.</p>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardStats;
