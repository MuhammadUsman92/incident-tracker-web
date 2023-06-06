import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { patientCreate } from "../actions/patientActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { getCoordinates } from "./GetLocation";
import { useNavigate  } from 'react-router-dom';

function CreatePatientForm() {
  const [validated, setValidated] = useState(false);
  const createPatient = useSelector((state) => state.createPatient);
  const [cnic, setCNIC] = useState("");
  const { loading, response, error } = createPatient;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = {
        cnic: form.elements.cnic.value,
        name: form.elements.name.value,
        email: form.elements.email.value,
        age: form.elements.age.value,
        bloodGroup: form.elements.bloodGroup.value,
        gender: form.elements.gender.value,
        height: form.elements.height.value,
        weight: form.elements.weight.value,
        location:{
          street:form.elements.street.value,
          city:form.elements.city.value, 
          postal_code:form.elements.postal_code.value,
          country:form.elements.country.value,
        }
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

        console.log(formData); 
        dispatch(patientCreate(navigate,formData));
      } catch (error) {
        console.log(error.message);
        dispatch(patientCreate(navigate,formData));
        // Handle error
      }
    }

    setValidated(true);
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
        <h5 className="head-div">Patient Details</h5>
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
          <Form.Group as={Col} md="3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="emial"
              placeholder="Email"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter email.
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
          <Form.Group as={Col} md="3" controlId="height">
            <Form.Label>Height</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Height"
              defaultValue=""
              pattern="[0-9]+(\.[0-9]{1,2})?" 
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid height.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="weight">
            <Form.Label>Weight</Form.Label>
            <InputGroup hasValidation>
              <Form.Control type="text" placeholder="Weight" required />
              <Form.Control.Feedback type="invalid">
                Please enter Weight.
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
          <Form.Group as={Col} md="3" controlId="bloodGroup">
            <Form.Label>Blood Group</Form.Label>
            <Form.Select
              className="custom_form-select"
              aria-label="Default select example"
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
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
        <Button type="submit">Create Patient</Button>
      </Form>
    </>
  );
}
export default CreatePatientForm;
