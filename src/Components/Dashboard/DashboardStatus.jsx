import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardStats = () => {
  const stats = [
    { title: "Total Employees", value: 12, bg: "primary" },
    { title: "Present Today", value: 8, bg: "success" },
    { title: "Absent Today", value: 2, bg: "danger" },
    { title: "Half Day", value: 2, bg: "warning" },
  ];

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Present',
        data: [30, 32, 28, 35],
        backgroundColor: 'rgba(40, 167, 69, 0.6)',
      },
      {
        label: 'Absent',
        data: [5, 4, 6, 3],
        backgroundColor: 'rgba(220, 53, 69, 0.6)',
      },
      {
        label: 'Half Day',
        data: [2, 3, 1, 2],
        backgroundColor: 'rgba(255, 193, 7, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Attendance Overview' },
    },
  };

  const employees = [
    { name: 'Alice', status: 'Present' },
    { name: 'Bob', status: 'Absent' },
    { name: 'Charlie', status: 'Half Day' },
    { name: 'Diana', status: 'Present' },
    { name: 'Eve', status: 'Absent' },
    { name: 'Frank', status: 'Absent' },
    { name: 'Grace', status: 'Half Day' },
    { name: 'Heidi', status: 'Present' },
    { name: 'Ivan', status: 'Present' },
    { name: 'Judy', status: 'Present' },
    { name: 'Mallory', status: 'Present' },
    { name: 'Oscar', status: 'Present' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'success';
      case 'Absent':
        return 'danger';
      case 'Half Day':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <>
      {/* Monthly Chart First */}
      <Row className="mt-4 mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Bar data={chartData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

          <Row className="mb-4">
        {stats.map((item, idx) => (
          <Col md={3} key={idx}>
            <Card bg={item.bg} text="white" className="mb-3">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text style={{ fontSize: '1.5rem' }}>{item.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Employee Status Cards */}
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">Today's Employee Status</h5>
          <Row>
            {employees.map((emp, idx) => (
              <Col md={3} sm={6} xs={12} key={idx} className="mb-3">
                <Card border={getStatusColor(emp.status)}>
                  <Card.Body className="text-center">
                    <h6>{emp.name}</h6>
                    <span className={`badge bg-${getStatusColor(emp.status)}`}>
                      {emp.status}
                    </span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
  
    </>
  );
};

export default DashboardStats;
