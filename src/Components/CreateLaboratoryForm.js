import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { laboratoryCreate } from '../actions/laboratoryActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import {getCoordinates} from './GetLocation'


function CreateLaboratoryFrom() {
const [validated, setValidated] = useState(false);
const createLaboratory = useSelector((state) => state.createLaboratory);
const { loading, response, error } = createLaboratory;
const dispatch = useDispatch();
const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    } else {
    event.preventDefault();
    const formData = {
      reg_no: form.elements.reg_no.value,
      name: form.elements.name.value,
      location: {
        street: form.elements.street.value,
        city: form.elements.city.value,
        postal_code: form.elements.postal_code.value,
        country: form.elements.country.value,
      },
    };
  
    try {
      const { street, city, postal_code, country } = formData.location;
      const { latitude, longitude } = await getCoordinates(street, city, postal_code, country);
      
      formData.location.latitude = latitude;
      formData.location.longitude = longitude;
      
      console.log(formData); // Form data including latitude and longitude
      dispatch(laboratoryCreate(formData));
    } catch (error) {
      console.log(error.message);
      // Handle error
    }
    setValidated(true);
  }
};


  return (
    <>
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {response && <MessageBox variant="success">{response}</MessageBox>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h5 className="head-div">Laboratory Details</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="reg_no">
            <Form.Label>Reg No.</Form.Label>
            <Form.Control required type="number" placeholder="Reg No." defaultValue="" />
            <Form.Control.Feedback type="invalid">Please enter valid Reg No.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" placeholder="Name" defaultValue="" />
            <Form.Control.Feedback type="invalid">Please enter Name.</Form.Control.Feedback>
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
        <Button type="submit">Create Laboratory</Button>
      </Form>  
    </>
);
}
export default CreateLaboratoryFrom;