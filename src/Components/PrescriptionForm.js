import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

function PrescriptionForm(props) {
  const [prescription, setPrescription] = useState(() => ({
    prescriptionComments: "",
    prescriptionDate: getCurrentDate(),
    prescriptionTime: getCurrentTime(),
  }));

  const [validation, setValidation] = useState({
    prescriptionComments: false,
  });

  const handlePrescriptionInputChange = (event, field) => {
    const value = event.target.value;
    setPrescription((prevPrescription) => ({
      ...prevPrescription,
      [field]: value !== "" ? value : getCurrentValue(field),
    }));
    setValidation((prevValidation) => ({
      ...prevValidation,
      [field]: value !== "",
    }));

    props.setPrescriptionData((prevPrescriptionData) => ({
      ...prevPrescriptionData,
      ...prescription, // Include all fields of prescription state
      [field]: value !== "" ? value : getCurrentValue(field),
    }));
  };


  const getCurrentValue = (field) => {
    if (field === "prescriptionDate") {
      return getCurrentDate();
    } else if (field === "prescriptionTime") {
      return getCurrentTime();
    }
    return "";
  };


  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = today.getDate();
    day = day < 10 ? "0" + day : day;
    return `${year}-${month}-${day}`;
  }

  function getCurrentTime() {
    const today = new Date();
    let hours = today.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}`;
  }

  return (
    <>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="prescriptionComments">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={prescription.prescriptionComments}
            onChange={(event) => handlePrescriptionInputChange(event, "prescriptionComments")}
            required
            isInvalid={!validation.prescriptionComments}
          />
          <Form.Control.Feedback type="invalid">Please enter comments.</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="prescriptionDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={prescription.prescriptionDate}
            onChange={(event) => handlePrescriptionInputChange(event, "prescriptionDate")}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="prescriptionTime">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            value={prescription.prescriptionTime}
            onChange={(event) => handlePrescriptionInputChange(event, "prescriptionTime")}
            required
          />
        </Form.Group>
      </Row>
    </>
  );
}

export default PrescriptionForm;
