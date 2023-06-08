import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { createCriminalStatus } from "../actions/criminalAction";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { useNavigate  } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function CriminalStatusForm() {
  const [validated, setValidated] = useState(false);
  const criminalStatusCreate = useSelector((state) => state.criminalStatusCreate);
  const { loading, response, error } = criminalStatusCreate;
  const params = useParams();
  const { criminalId } = params; 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true)
    } else {
      event.preventDefault();
      const formData = {
        status: form.elements.status.value,
        arrestDate: form.elements.arrestDate.value,
        dischargeDate: form.elements.dischargeDate.value,
        numOfDayInJail: form.elements.numOfDayInJail.value,
      };
      dispatch(createCriminalStatus(navigate,criminalId,form.elements.crimeId.value,formData));   
    }

    setValidated(false);
  };
  return (
    <>
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {response && <MessageBox variant="success">{response}</MessageBox>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h5 className="head-div">Criminal Status</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="crimeId">
            <Form.Label>Crime Id</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Crimeid"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter crime id.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Status"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter status.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="arrestDate">
            <Form.Label>Arrest Date</Form.Label>
            <Form.Control
              type="datetime-local"
              placeholder="arrestDate"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter arrest date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="dischargeDate">
            <Form.Label>Arrest Date</Form.Label>
            <Form.Control
              type="datetime-local"
              placeholder="dischargeDate"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter discharge date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="numOfDayInJail">
            <Form.Label>Num of days in jail</Form.Label>
            <Form.Control
              type="number"
              placeholder="Num 0f days in jail"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter a num of days in jail.
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
        <Button type="submit">Add Criminal Status</Button>
      </Form>
    </>
  );
}
export default CriminalStatusForm;
