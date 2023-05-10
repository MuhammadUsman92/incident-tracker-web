import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector} from 'react-redux';
import {patientCreate} from '../actions/patientActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

function CreatePatientForm() {
  const [validated, setValidated] = useState(false);
  const [cnic, setCNIC] = useState("");

  const createPatient = useSelector((state) => state.createPatient);
  const { loading, response, error } = createPatient;
  const dispatch = useDispatch();
  const handleChangeCNIC = (e) => {
    const value = e.target.value;
    // Remove all non-numeric characters from the input
    const newValue = value.replace(/\D/g, '');
    // Add hyphens after the first 5 and 12 digits
    let formattedValue = '';
    for (let i = 0; i < newValue.length; i++) {
      if (i === 5 || i === 12) {
        formattedValue += '-';
      }
      formattedValue += newValue[i];
    }

    setCNIC(formattedValue);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else {
      event.preventDefault();
      const formData = {
        cnic: cnic,
        name: form.elements.name.value,
        age: form.elements.age.value,
        height: form.elements.height.value,
        weight: form.elements.weight.value,
        gender: form.elements.gender.value,
        location: {
          street: form.elements.street.value,
          city: form.elements.city.value,
          postal_code: form.elements.postal_code.value,
          country: form.elements.country.value,
          latitude: form.elements.latitude.value,
          longitude: form.elements.longitude.value
        }
      };
      dispatch(patientCreate(formData));
    }

    setValidated(true);
  };

  return (
    <>
    {loading && <LoadingBox/>}
    { error && <MessageBox variant="danger">{error}</MessageBox>}
    { response && <MessageBox variant="success">{response}</MessageBox>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h3>Patent Details</h3>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="cnic">
            <Form.Label>CNIC</Form.Label>
            <Form.Control
              required
              placeholder="XXXXX-XXXXXXX-X"
              pattern="\d{5}-\d{7}-\d"
              value={cnic}
              onChange={handleChangeCNIC}
            />
            <Form.Control.Feedback type="invalid">
              Invalid CNIC no.(XXXXX-XXXXXXX-X).
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
          <Form.Group as={Col} md="4" controlId="age">
            <Form.Label>Age</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="number"
                placeholder="Age"
                required
              />
              <InputGroup.Text >Year</InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                Please enter age.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="height">
            <Form.Label>Height</Form.Label>
            <Form.Control type="number" step="0.1" placeholder="Height" required />
            <Form.Control.Feedback type="invalid">
              Please enter height.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="weight">
            <Form.Label>Weight</Form.Label>
            <Form.Control type="number" placeholder="Weight" required />
            <Form.Control.Feedback type="invalid">
              Please enter weight.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="street">
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
          <Form.Group as={Col} md="4" controlId="city">
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
          <Form.Group as={Col} md="4" controlId="postal_code">
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
      <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="country">
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
      <Form.Group as={Col} md="4" controlId="latitude">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
          required
          type="number"
          step="any"
          placeholder="Latitude"
          defaultValue=""
          />
          <Form.Control.Feedback type="invalid">
          Please enter a latitude.
          </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="longitude">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
          required
          type="number"
          step="any"
          placeholder="Longitude"
          defaultValue=""
          />
          <Form.Control.Feedback type="invalid">
              Please enter a longitude.
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
        <Button type="submit" disabled={loading}>Create Patient</Button>
      </Form>
    </>
    
  );
}
export default CreatePatientForm;