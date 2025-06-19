import React, { useState } from 'react';
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
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
} from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardStats = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const stats = [
    {
      title: 'Total Employees',
      value: 12,
      bg: 'linear-gradient(135deg, #007bff, #6610f2)',
      icon: <FaUsers />,
      status: 'All',
    },
    {
      title: 'Present Today',
      value: 8,
      bg: 'linear-gradient(135deg, #28a745, #218838)',
      icon: <FaUserCheck />,
      status: 'Present',
    },
    {
      title: 'Absent Today',
      value: 2,
      bg: 'linear-gradient(135deg, #dc3545, #c82333)',
      icon: <FaUserTimes />,
      status: 'Absent',
    },
    {
      title: 'Half Day',
      value: 2,
      bg: 'linear-gradient(135deg, #ffc107, #e0a800)',
      icon: <FaUserClock />,
      status: 'Half Day',
    },
  ];

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

  const filteredEmployees =
    selectedStatus === 'All'
      ? employees
      : employees.filter((emp) => emp.status === selectedStatus);

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

  return (
    <div className="px-3">
      {/* Monthly Chart */}
      <Row className="mt-4 mb-5">
        <Col>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body>
              <Bar data={chartData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Stat Cards */}
      <Row className="g-4 mb-4">
        <h2>Today's Employee</h2>
        {stats.map((item, idx) => (
          <Col xs={12} sm={6} md={3} key={idx}>
            <div
              onClick={() => setSelectedStatus(item.status)}
              style={{
                background: item.bg,
                color: '#fff',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow:
                  selectedStatus === item.status
                    ? '0 0 12px 4px rgba(0, 0, 0, 0.25)'
                    : '0 4px 12px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                transform:
                  selectedStatus === item.status ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{item.title}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{item.value}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Filtered Employee Cards */}
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">
            {selectedStatus === 'All'
              ? "All Employees"
              : `${selectedStatus} Employees`}
          </h5>
          <Row>
            {filteredEmployees.map((emp, idx) => (
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
    </div>
  );
};

export default DashboardStats;
