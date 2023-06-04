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

function CreateCriminalForm() {
  const [validated, setValidated] = useState(false);
  const criminalCreate = useSelector((state) => state.createCriminal);
  const [cnic, setCNIC] = useState("");
  const { loading, response, error } = criminalCreate;
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
        dispatch(createCriminal(formData));
      } catch (error) {
        console.log(error.message);
        // Handle error
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
        <h5 className="head-div">Criminal Details</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="cnic">
            <Form.Label>CNIC</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                required
                placeholder="XXXXX-XXXXXXX-X"
                pattern="\d{5}-\d{7}-\d"
                value={cnic}
                onChange={handleChangeCNIC}
              />
              <Form.Control.Feedback type="invalid">
                Invalid CNIC no.XXXXX-XXXXXXX-X.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="name">
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
          <Form.Group as={Col} md="3" controlId="age">
            <Form.Label>Age</Form.Label>
            <InputGroup hasValidation>
              <Form.Control type="text" placeholder="age" required />
              <Form.Control.Feedback type="invalid">
                Please enter Age.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="gender">
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
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6" controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Street"
              defaultValue=""
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
        <Button type="submit">Create Criminal</Button>
      </Form>
    </>
  );
}
export default CreateCriminalForm;
