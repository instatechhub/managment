import React, { useEffect } from "react";
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
import useManagerStore from "../../Store/AuthStore/ManagerStore";

const employeeData = {};

const EmployeeData = () => {
  const { getEmployeeData, OneEmployee } = useManagerStore();
  const { id } = useParams();

  console.log(OneEmployee,"klklkl")

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
      await getEmployeeData(id);
      };
      fetchData();
    }
  }, []);

  if (!OneEmployee)
    return <div className="text-center mt-5">Employee not found.</div>;

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0 rounded-4 p-4">
        <div className="text-center mb-4">
          <FaUserCircle className="text-primary" size={70} />
          <h3 className="mt-3 fw-bold mb-0">{OneEmployee?.name?.toUpperCase()}</h3>
          <p className="text-muted fs-6 mb-1">{OneEmployee?.designation?.toUpperCase()}</p>
          <Badge
            bg={OneEmployee?.status === "active" ? "success" : "secondary"}
            className="px-3 py-2 rounded-pill"
          >
            {OneEmployee?.status?.toUpperCase()}
          </Badge>
        </div>

        <hr className="my-4" />

        <Row className="gy-3">
          <Col md={6}>
            <h6 className="fw-bold mb-3">Employee Info</h6>
            <p>
              <FaPhoneAlt className="me-2 text-muted" />{" "}
              <strong>Contact:</strong> {OneEmployee?.number}
            </p>
            <p>
              <FaCalendarAlt className="me-2 text-muted" />{" "}
              <strong>Joining Date:</strong> {OneEmployee?.joiningDate}
            </p>
            <p>
              <FaBuilding className="me-2 text-muted" />{" "}
              <strong>Process:</strong> {OneEmployee?.processName?.toUpperCase()}
            </p>
            <p>
              <FaMoneyBillWave className="me-2 text-muted" />{" "}
              <strong>Salary:</strong> ₹{OneEmployee?.salary}
            </p>
            <p>
              <FaVenusMars className="me-2 text-muted" />{" "}
              <strong>Gender:</strong> {OneEmployee?.gender?.toUpperCase()}
            </p>
            <p>
              <FaCheckCircle className="me-2 text-muted" />{" "}
              <strong>Status:</strong> {OneEmployee?.status?.toUpperCase()}
            </p>
          </Col>

          <Col md={6}>
            <h6 className="fw-bold mb-3">Bank Details</h6>
            <p>
              <FaUniversity className="me-2 text-muted" />{" "}
              <strong>Bank:</strong> {OneEmployee?.bankName?.toUpperCase()}
            </p>
            <p>
              <FaHashtag className="me-2 text-muted" />{" "}
              <strong>IFSC Code:</strong> {OneEmployee?.ifscCode}
            </p>
            <p>
              <FaIdCard className="me-2 text-muted" />{" "}
              <strong>Account No:</strong> {OneEmployee?.accountNumber}
            </p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default EmployeeData;
