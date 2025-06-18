import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Employee added!");
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Add New Employee</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter employee name"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contact"
                    placeholder="e.g. 9876543210"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Joining Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joining"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Process Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="process"
                    placeholder="e.g. Sales, Support"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    placeholder="e.g. Executive, Manager"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salary (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    placeholder="e.g. 30000"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" onChange={handleChange} defaultValue="">
                    <option value="" disabled>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" onChange={handleChange} defaultValue="Active">
                    <option>Active</option>
                    <option>Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              <Button variant="primary" type="submit">
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
