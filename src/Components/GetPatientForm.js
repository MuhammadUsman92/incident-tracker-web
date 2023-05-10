import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { patientDiseasesGet } from '../actions/patientActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';


function GetPatientForm() {
    const [validated, setValidated] = useState(false);
    const [cnic, setCNIC] = useState("");
    const getPatientDiseases = useSelector((state) => state.getPatientDiseases);
    const { loading, response, error } = getPatientDiseases;
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
        } else {
            event.preventDefault();
            console.log(cnic);
            dispatch(patientDiseasesGet(cnic));
        }

        setValidated(true);
    };
    const handleListGroupItemClick = (eventKey) => {
        // Handle the click event for the ListGroup item with the given eventKey
        console.log(`Clicked on ListGroup item with eventKey ${eventKey}`);
    };

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
                            <Button type="submit">
                                Button
                            </Button>
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            Invalid CNIC no.(XXXXX-XXXXXXX-X).
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Container>
                    <Row>
                        <Col>
                            <ListGroup onSelect={handleListGroupItemClick}>

                                {response &&
                                    <Row xs={1} sm={2} md={3} lg={4}>
                                        <Col>
                                            <ListGroup.Item eventKey="link1" action>
                                                Link 1
                                            </ListGroup.Item>
                                        </Col>
                                        <Col>
                                            <ListGroup.Item eventKey="link2" action>
                                                Link 2
                                            </ListGroup.Item>
                                        </Col>
                                        <Col>
                                            <ListGroup.Item eventKey="link3" action>
                                                Link 3
                                            </ListGroup.Item>
                                        </Col>
                                        <Col>
                                            <ListGroup.Item eventKey="link4" action>
                                                Link 4
                                            </ListGroup.Item>
                                        </Col>
                                        <Col>
                                            <ListGroup.Item eventKey="link5" action>
                                                Link 5
                                            </ListGroup.Item>
                                        </Col>
                                        <Col>
                                            <ListGroup.Item eventKey="link6" action>
                                                Link 6
                                            </ListGroup.Item>
                                        </Col>
                                        <Col>
                                            <ListGroup.Item eventKey="link7" action>
                                                Link 7
                                            </ListGroup.Item>
                                        </Col>
                                        <Col>
                                            <ListGroup.Item eventKey="link8" action>
                                                Link 8
                                            </ListGroup.Item>
                                        </Col>
                                        <Col>
                                            <ListGroup.Item eventKey="link9" action>
                                                Link 9
                                            </ListGroup.Item>
                                        </Col>
                                    </Row>
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>

    );
}
export default GetPatientForm;
