import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

function CrimeForm(props) {
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

  const [crime, setCrime] = useState(() => ({
    incidentDateTime: getCurrentDateTime(),
    type: "",
    street: "",
    city: "",
    postal_code: "",
    country: "",
  }));

  const [validation, setValidation] = useState({
    type: false,
  });

  const handleCrimeInputChange = (event, field) => {
    const value = event.target.value;
    setCrime((prevCrime) => ({
      ...prevCrime,
      [field]: value !== "" ? value : getCurrentValue(field),
    }));
    console.log(crime);
    setValidation((prevValidation) => ({
      ...prevValidation,
      [field]: value !== "",
    }));

    props.setCrimeData((prevCrimeData) => ({
      ...prevCrimeData,
      ...crime, // Include all fields of prescription state
      [field]: value !== "" ? value : getCurrentValue(field),
    }));
  };

  const getCurrentValue = (field) => {
    if (field === "incidentDateTime") {
      return getCurrentDateTime();
    }
    return "";
  };

  return (
    <>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="type">
          <Form.Label>Crime Type</Form.Label>
          <Form.Control
            type={"text"}
            value={crime.type}
            onChange={(event) => handleCrimeInputChange(event, "type")}
            required
            isInvalid={!validation.type}
          />
          <Form.Control.Feedback type="invalid">
            Please enter Crime Type.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="incidentDateTime">
          <Form.Label>Incident Date & Time</Form.Label>
          <Form.Control
            type="datetime-local"
            value={crime.incidentDateTime}
            onChange={(event) =>
              handleCrimeInputChange(event, "incidentDateTime")
            }
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-2">
        <Form.Group as={Col} md="6" controlId="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Street"
            defaultValue=""
            onChange={(event) => handleCrimeInputChange(event, "street")}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a street.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="City"
            defaultValue=""
            onChange={(event) => handleCrimeInputChange(event, "city")}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a city.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-2">
        <Form.Group as={Col} md="6" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Country"
            defaultValue=""
            onChange={(event) => handleCrimeInputChange(event, "country")}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a country.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="postal_code">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Postal Code"
            defaultValue=""
            onChange={(event) => handleCrimeInputChange(event, "postal_code")}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a postal code.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
}

export default CrimeForm;
