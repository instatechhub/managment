import React from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import {
  FaUserCircle,
  FaPhoneAlt,
  FaCalendarAlt,
  FaBuilding,
  FaMoneyBillWave,
  FaVenusMars,
  FaCheckCircle,
  FaUniversity,
  FaHashtag,
  FaIdCard,
} from "react-icons/fa";

const employeeData = {
  1: {
    name: "Ravi Kumar",
    contact: "9876543210",
    joining: "2023-02-10",
    process: "Sales",
    salary: "30000",
    designation: "Executive",
    gender: "Male",
    status: "Active",
    accountNumber: "1234567890",
    ifscCode: "SBIN0001234",
    bankName: "State Bank of India",
  },
  2: {
    name: "Anjali Sharma",
    contact: "7894561230",
    joining: "2022-05-01",
    process: "Support",
    salary: "28000",
    designation: "Manager",
    gender: "Female",
    status: "Inactive",
    accountNumber: "9876543210",
    ifscCode: "ICIC0005678",
    bankName: "ICICI Bank",
  },
};

const EmployeeData = () => {
  const { id } = useParams();
  const emp = employeeData[id];

  if (!emp) return <div className="text-center mt-5">Employee not found.</div>;

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0 rounded-4 p-4">
        <div className="text-center mb-4">
          <FaUserCircle className="text-primary" size={70} />
          <h3 className="mt-3 fw-bold mb-0">{emp.name}</h3>
          <p className="text-muted fs-6 mb-1">{emp.designation}</p>
          <Badge
            bg={emp.status === "Active" ? "success" : "secondary"}
            className="px-3 py-2 rounded-pill"
          >
            {emp.status}
          </Badge>
        </div>

        <hr className="my-4" />

        <Row className="gy-3">
          <Col md={6}>
            <h6 className="fw-bold mb-3">Employee Info</h6>
            <p>
              <FaPhoneAlt className="me-2 text-muted" />{" "}
              <strong>Contact:</strong> {emp.contact}
            </p>
            <p>
              <FaCalendarAlt className="me-2 text-muted" />{" "}
              <strong>Joining Date:</strong> {emp.joining}
            </p>
            <p>
              <FaBuilding className="me-2 text-muted" />{" "}
              <strong>Process:</strong> {emp.process}
            </p>
            <p>
              <FaMoneyBillWave className="me-2 text-muted" />{" "}
              <strong>Salary:</strong> ₹{emp.salary}
            </p>
            <p>
              <FaVenusMars className="me-2 text-muted" />{" "}
              <strong>Gender:</strong> {emp.gender}
            </p>
            <p>
              <FaCheckCircle className="me-2 text-muted" />{" "}
              <strong>Status:</strong> {emp.status}
            </p>
          </Col>

          <Col md={6}>
            <h6 className="fw-bold mb-3">Bank Details</h6>
            <p>
              <FaUniversity className="me-2 text-muted" />{" "}
              <strong>Bank:</strong> {emp.bankName}
            </p>
            <p>
              <FaHashtag className="me-2 text-muted" />{" "}
              <strong>IFSC Code:</strong> {emp.ifscCode}
            </p>
            <p>
              <FaIdCard className="me-2 text-muted" />{" "}
              <strong>Account No:</strong> {emp.accountNumber}
            </p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default EmployeeData;
