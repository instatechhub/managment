import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import useAuthStore from "../../Store/AuthStore/AuthStore";
import useManagerStore from "../../Store/AuthStore/ManagerStore";
import { toast } from "react-toastify";

const EmployeeForm = () => {
  const { user } = useAuthStore();
  const { addEmployees } = useManagerStore();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    contact: "",
    joining: "",
    process: user?.processName || "", 
    salary: "",
    designation: "",
    gender: "",
    status: "active",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.joining) return "Joining date is required.";
    if (!form.process) return "Process name is missing.";
    if (!form.gender) return "Gender is required.";
    if (!form.salary) return "Salary is required.";

   
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      const response = await addEmployees({
        managerId: user._id,
        name: form.name,
        number: form.contact,
        joiningDate: form.joining,
        processName: form.process,
        salary: form.salary,
        designation: form.designation,
        gender: form.gender,
        status: form.status,
        accountNumber: form.accountNumber,
        ifscCode: form.ifscCode,
        bankName: form.bankName,
      });

      if (response?.data?.success) {
        toast.success("Employee added successfully!");
        setForm({
          name: "",
          contact: "",
          joining: "",
          process: user?.processName || "",
          salary: "",
          designation: "",
          gender: "",
          status: "active",
          accountNumber: "",
          ifscCode: "",
          bankName: "",
        });
      } else {
        toast.error(response?.data?.message || "Failed to add employee.");
      }
    } catch (error) {
      console.error("Error while adding employee:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
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
                    disabled
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
                     required
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
              
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <div className="text-end mt-4">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-pill shadow-sm d-flex align-items-center justify-content-center"
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Adding...
                  </>
                ) : (
                  "Add Employee"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeForm;
