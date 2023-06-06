import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { createCriminal } from "../actions/criminalAction";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { getCoordinates } from "./GetLocation";
import { useNavigate  } from 'react-router-dom';

function CriminalStatusForm() {
  const [validated, setValidated] = useState(false);
  const criminalCreate = useSelector((state) => state.createCriminal);
  const { loading, response, error } = criminalCreate;
  const [cnic, setCNIC] = useState("");
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
        cnic: form.elements.cnic.value,
        name: form.elements.name.value,
        age: form.elements.age.value,
        gender: form.elements.gender.value,
      };

      try {
        const { street, city, postal_code, country } = formData.location;
        const { latitude, longitude } = await getCoordinates(
          street,
          city,
          postal_code,
          country
        );

        formData.location.latitude = latitude;
        formData.location.longitude = longitude;

        console.log(formData); // Form data including latitude and longitude
        dispatch(createCriminal(navigate,formData));
      } catch (error) {
        console.log(error.message);
        // Handle error
        dispatch(createCriminal(navigate,formData))
      }
    }

    setValidated(false);
  };

  const handleChangeCNIC = (e) => {
    const value = e.target.value;
    // Remove all non-numeric characters from the input
    const newValue = value.replace(/\D/g, "");
    // Add hyphens after the first 5 and 12 digits
    let formattedValue = "";
    for (let i = 0; i < newValue.length; i++) {
      if (i === 5 || i === 12) {
        formattedValue += "-";
      }
      formattedValue += newValue[i];
    }

    setCNIC(formattedValue);
  };

  return (
    <>
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {response && <MessageBox variant="success">{response}</MessageBox>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h5 className="head-div">Criminal Status</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="crimeId">
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
          <Form.Group as={Col} md="3" controlId="arrestDate">
            <Form.Label>Arrest Date</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              placeholder="arrestDate"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter arrest date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="dischargeDate">
            <Form.Label>Arrest Date</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              placeholder="dischargeDate"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter discharge date.
            </Form.Control.Feedback>
          </Form.Group>

         
          <Form.Group as={Col} md="6" controlId="numOfDayInJail">
            <Form.Label>Num of days in jail</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="numOfDayInJail"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter a num of days in jail.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Country"
              defaultValue=""
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
            />
            <Form.Control.Feedback type="invalid">
              Please enter a postal code.
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
