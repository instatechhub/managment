import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';

const EmployeeForm = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    joining: '',
    process: '',
    salary: '',
    designation: '',
    gender: '',
    status: 'Active',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert('Employee added successfully!');
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Header className=" fw-semibold fs-5">
          Add New Employee
        </Card.Header>

        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              {/* Personal Details */}
              <Col md={6}>
                <FloatingLabel controlId="name" label="Full Name">
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="contact" label="Contact Number">
                  <Form.Control
                    type="tel"
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="joining" label="Joining Date">
                  <Form.Control
                    type="date"
                    name="joining"
                    value={form.joining}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="process" label="Process Name">
                  <Form.Control
                    type="text"
                    name="process"
                    value={form.process}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="designation" label="Designation">
                  <Form.Control
                    type="text"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="salary" label="Salary (₹)">
                  <Form.Control
                    type="number"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="gender" label="Gender">
                  <Form.Select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="status" label="Status">
                  <Form.Select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>

              {/* Bank Details Section */}
              <Col xs={12}>
                <h5 className="mt-4 mb-2">Bank Details</h5>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="accountNumber" label="Account Number">
                  <Form.Control
                    type="text"
                    name="accountNumber"
                    value={form.accountNumber}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="ifscCode" label="IFSC Code">
                  <Form.Control
                    type="text"
                    name="ifscCode"
                    value={form.ifscCode}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Col>

              <Col md={12}>
                <FloatingLabel controlId="bankName" label="Bank Name">
                  <Form.Control
                    type="text"
                    name="bankName"
                    value={form.bankName}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <div className="text-end mt-4">
              <Button
                variant="primary"
                type="submit"
                className="px-5 py-2 rounded-pill shadow-sm"
              >
                Add Employee
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeForm;
