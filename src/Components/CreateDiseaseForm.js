import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { patientDiseaseCreate } from "../actions/patientActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { useNavigate  } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function CreateDiseaseForm() {
  const [validated, setValidated] = useState(false);
  const createDisease = useSelector((state) => state.createPatientDisease);
  const { loading, response, error } = createDisease;
  const params = useParams();
  const { patientId } = params;
  const navigate = useNavigate();
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
        name: form.elements.diseasename.value,
        stage: form.elements.stage.value,
      };
      dispatch(patientDiseaseCreate(navigate,patientId,formData));
      setValidated(false);
    }
  };

  return (
    <>
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {response && <MessageBox variant="success">{response}</MessageBox>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h5 className="head-div">Disease Details</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="diseasename">
            <Form.Label>Disease Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Disease Name"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter disease name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="stage">
            <Form.Label>Stage</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Full name"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter stage.
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
        <Button type="submit">Create Disease</Button>
      </Form>
    </>
  );
}
export default CreateDiseaseForm;
