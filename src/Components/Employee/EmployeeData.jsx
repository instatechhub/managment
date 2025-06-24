import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Badge,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
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
import { BiEdit } from "react-icons/bi";
import useManagerStore from "../../Store/AuthStore/ManagerStore";

const EmployeeData = () => {
  const { getEmployeeData, OneEmployee,employeeUpdateDetails } = useManagerStore();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        await getEmployeeData(id);
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (OneEmployee) {
      setFormData({ ...OneEmployee });
    }
  }, [OneEmployee]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async() => {
    // console.log("Updated Data:", formData);
    const response = await employeeUpdateDetails(id,{
      updateData:formData
    });
    if(response.status===200){
   console.log(response,"lklklklklklkll")
    await getEmployeeData(id);
   setShowModal(false);
    }

  };

  if (!OneEmployee)
    return <div className="text-center mt-5">Employee not found.</div>;

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0 rounded-4 p-4">
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-primary" onClick={handleShowModal}>
            <BiEdit className="me-2" />
            Edit
          </button>
        </div>

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
            <p><FaPhoneAlt className="me-2 text-muted" /> <strong>Contact:</strong> {OneEmployee?.number || "NA"}</p>
            <p><FaCalendarAlt className="me-2 text-muted" /> <strong>Joining Date:</strong> {OneEmployee?.joiningDate || "NA"}</p>
            <p><FaBuilding className="me-2 text-muted" /> <strong>Process:</strong> {OneEmployee?.processName?.toUpperCase() || "NA"}</p>
            <p><FaMoneyBillWave className="me-2 text-muted" /> <strong>Salary:</strong> ₹{OneEmployee?.salary || "NA"}</p>
            <p><FaVenusMars className="me-2 text-muted" /> <strong>Gender:</strong> {OneEmployee?.gender?.toUpperCase() || "NA"}</p>
            <p><FaCheckCircle className="me-2 text-muted" /> <strong>Status:</strong> {OneEmployee?.status?.toUpperCase() || "NA"}</p>
          </Col>
          <Col md={6}>
            <h6 className="fw-bold mb-3">Bank Details</h6>
            <p><FaUniversity className="me-2 text-muted" /> <strong>Bank:</strong> {OneEmployee?.bankName?.toUpperCase() || "NA"}</p>
            <p><FaHashtag className="me-2 text-muted" /> <strong>IFSC Code:</strong> {OneEmployee?.ifscCode || "NA"}</p>
            <p><FaIdCard className="me-2 text-muted" /> <strong>Account No:</strong> {OneEmployee?.accountNumber || "NA"}</p>
          </Col>
        </Row>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group className="mb-2">
    <Form.Label>Name</Form.Label>
    <Form.Control
      name="name"
      value={formData.name || ""}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Designation</Form.Label>
    <Form.Control
      name="designation"
      value={formData.designation || ""}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Contact Number</Form.Label>
    <Form.Control
      name="number"
      value={formData.number || ""}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Joining Date</Form.Label>
    <Form.Control
      type="date"
      name="joiningDate"
      value={formData.joiningDate?.slice(0, 10) || ""}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Process</Form.Label>
    <Form.Control
      name="processName"
      value={formData.processName || ""}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Salary</Form.Label>
    <Form.Control
      name="salary"
      value={formData.salary || ""}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Gender</Form.Label>
    <Form.Select
      name="gender"
      value={formData.gender || ""}
      onChange={handleChange}
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </Form.Select>
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Status</Form.Label>
    <Form.Select
      name="status"
      value={formData.status || ""}
      onChange={handleChange}
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </Form.Select>
  </Form.Group>

  <hr />

  <Form.Group className="mb-2">
    <Form.Label>Bank Name</Form.Label>
    <Form.Control
      name="bankName"
      value={formData.bankName || ""}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>IFSC Code</Form.Label>
    <Form.Control
      name="ifscCode"
      value={formData.ifscCode || ""}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Account Number</Form.Label>
    <Form.Control
      name="accountNumber"
      value={formData.accountNumber || ""}
      onChange={handleChange}
    />
  </Form.Group>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeData;
