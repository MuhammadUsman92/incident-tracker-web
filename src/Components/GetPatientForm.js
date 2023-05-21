import React, { useState,useEffect } from 'react';
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
import CreateDiseaseForm from './CreateDiseaseForm';

function GetPatientForm() {
    const [validated, setValidated] = useState(false);
    const [cnic, setCNIC] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [diseaseCreated, setDiseaseCreated] = useState(false);
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
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            setCurrentPage(0); // Reset the page when submitting a new CNIC
            dispatch(patientDiseasesGet(cnic + "?pageNumber=0&pageSize=20"));
        }

        setValidated(true);
    };
    

    const handleListGroupItemClick = (eventKey) => {
        // Handle the click event for the ListGroup item with the given eventKey
        console.log(`Clicked on ListGroup item with eventKey ${eventKey}`);
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            dispatch(patientDiseasesGet(`${cnic}?pageNumber=${currentPage - 1}&pageSize=20`));
        }
    };

    const handleNextPage = () => {
        if (response && currentPage < response.data.totalPage - 1) {
            setCurrentPage(currentPage + 1);
            dispatch(patientDiseasesGet(`${cnic}?pageNumber=${currentPage + 1}&pageSize=20`));
        }
    };
    const handleDiseaseCreated = () => {
        setDiseaseCreated(true);
    };

    useEffect(() => {
        if (diseaseCreated) {
            dispatch(patientDiseasesGet(`${cnic}?pageNumber=0&pageSize=20`));
            setDiseaseCreated(false); // Reset the flag
        }
    }, [diseaseCreated, cnic, dispatch]);



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
                            <Button type="submit">Button</Button>
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            Invalid CNIC no.(XXXXX-XXXXXXX-X).
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Form>
            {loading===false &&response && response.status === 'OK' && (
                <Container>
                    <ListGroup>
                        <Row xs={1} sm={2} md={3} lg={4}>
                            {response?.data?.content.map((disease) => (
                                <Col>
                                    <ListGroup.Item
                                        key={disease.id}
                                        action
                                        eventKey={disease.id}
                                        onClick={() => handleListGroupItemClick(disease.id)}
                                    >
                                        <div>
                                            <span className="disease-name">{disease.name}</span>
                                            <span className="disease-stage">{disease.stage}</span>
                                        </div>
                                    </ListGroup.Item>

                                </Col>
                            ))}
                        </Row>
                    </ListGroup>
                    <Row className="mt-3 justify-content-center">
                        <Col xs="auto">
                            <Button
                                variant="outline-primary"
                                disabled={currentPage === 0}
                                onClick={handlePreviousPage}
                            >
                                Previous
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="outline-primary"
                                disabled={currentPage === response.data.totalPage - 1}
                                onClick={handleNextPage}
                            >
                                Next
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <CreateDiseaseForm CNIC={cnic} handleDiseaseCreated={handleDiseaseCreated} />
                    </Row>
                </Container>
            )}
        </>
    );
}

export default GetPatientForm;
