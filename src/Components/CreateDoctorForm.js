import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { doctorCreate } from "../actions/doctorActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { useNavigate  } from 'react-router-dom';

function CreateDoctorForm() {
  const [validated, setValidated] = useState(false);
  const createDoctor = useSelector((state) => state.createDoctor);
  const { loading, response, error } = createDoctor;
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      const formData = {
        pmdc: form.elements.pmdc.value,
        name: form.elements.name.value,
        specialization: form.elements.specialization.value,
        qualification: form.elements.qualification.value,
        gender: form.elements.gender.value,
        about: form.elements.about.value,
      };
      dispatch(doctorCreate(navigate,formData));
    }
    setValidated(false);
  };

  return (
    <>
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {response && <MessageBox variant="success">{response}</MessageBox>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h5 className="head-div">Doctor Details</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="pmdc">
            <Form.Label>PMDC</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="PMDC"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter vaild PMDC.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Full name"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter Full Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="specialization">
            <Form.Label>Specialization</Form.Label>
            <InputGroup hasValidation>
              <Form.Control type="text" placeholder="Specialization" required />
              <Form.Control.Feedback type="invalid">
                Please enter Specialization.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="qualification">
            <Form.Label>Qualification</Form.Label>
            <Form.Control
              type="text"
              step="0.1"
              placeholder="Qualification"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter Qualification.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              className="custom_form-select"
              aria-label="Default select example"
              required
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="about">
            <Form.Label>About</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter information about yourself"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter information about yourself.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Above details are correct"
            feedback="You must check that details are correct before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Create Doctor</Button>
      </Form>
    </>
  );
}
export default CreateDoctorForm;
