import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

function PrescriptionForm(props) {
  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = today.getDate();
    day = day < 10 ? "0" + day : day;
    let hours = today.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [prescription, setPrescription] = useState(() => ({
    prescriptionComments: "",
    prescriptionDateTime: getCurrentDateTime(),
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
    if (field === "prescriptionDateTime") {
      return getCurrentDateTime();
    }
    return "";
  };

  return (
    <>
      <Row className="mb-3">
        <Form.Group as={Col} md="8" controlId="prescriptionComments">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={prescription.prescriptionComments}
            onChange={(event) =>
              handlePrescriptionInputChange(event, "prescriptionComments")
            }
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter comments.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="prescriptionDateTime">
          <Form.Label>Date & Time</Form.Label>
          <Form.Control
            type="datetime-local"
            value={prescription.prescriptionDateTime}
            onChange={(event) =>
              handlePrescriptionInputChange(event, "prescriptionDateTime")
            }
            required
          />
        </Form.Group>
      </Row>
    </>
  );
}

export default PrescriptionForm;
