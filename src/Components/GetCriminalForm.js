import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { getCriminalDetails } from '../actions/criminalAction';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { useNavigate } from 'react-router-dom';

function GetCriminalForm() {
  const [validated, setValidated] = useState(false);
  const [cnic, setCNIC] = useState('');

  const CriminalDetails = useSelector((state) => state.getCriminalDetails);
  const { loading, response, error } = CriminalDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      dispatch(getCriminalDetails(navigate, cnic));
    }
    setValidated(false);
  };

  useEffect(() => {
    if (response && response.status === 'OK') {
      navigate(`/patient-details/${cnic}`);
    }
  }, [response, navigate]);

  return (
    <>
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h5 className="head-div text-center">Patient Diseases Record</h5>
        <Row className="mb-3 justify-content-center">
          <Form.Group as={Col} md="5" controlId="cnic">
            <Form.Label>CNIC</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                required
                placeholder="XXXXX-XXXXXXX-X"
                pattern="\d{5}-\d{7}-\d"
                value={cnic}
                onChange={handleChangeCNIC}
              />
              <Button type="submit">Get Record</Button>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Invalid CNIC no.(XXXXX-XXXXXXX-X).
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
}

export default GetCriminalForm;
