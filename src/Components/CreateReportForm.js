import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../actions/reportActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

function CreateReportForm() {
  const [validated, setValidated] = useState(false);
  const reportcreate = useSelector((state) => state.createReport);
  const { loading, response, error } = reportcreate;
  const dispatch = useDispatch();

  const [pdfFile, setPdfFile] = useState(null);

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      const prescriptionID = "123123";
      const formData = {
        collectDate: form.elements.collectDate.value,
        resultDate: form.elements.resultDate.value,
        reportImage: form.elements.reportImage.value,
      };

      const laboratoryRegistrationNumber =
        form.elements.laboratoryRegistrationNumber.value;

      dispatch(
        createReport(laboratoryRegistrationNumber, prescriptionID, formData)
      );

      setValidated(false);
    }
  };

  return (
    <>
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {response && <MessageBox variant="success">{response}</MessageBox>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h5 className="head-div">Report Details</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="laboratoryRegistrationNumber">
            <Form.Label>Lab Registration Number</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="laboratory Registration Number"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter laboratory Registration Number.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="collectDate">
            <Form.Label>Collection Date</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              placeholder="collectDate"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter collect Date.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="resultDate">
            <Form.Label>Result Date</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              placeholder="collectDate"
              defaultValue=""
            />
            <Form.Control.Feedback type="invalid">
              Please enter result Date.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="col-md-3 mt-0">
            <label className="form-label mb-1" htmlFor="file-upload">
              Upload Document 1:
            </label>
            <input
              id="file-upload1"
              type="file"
              className="form-control"
              accept=".pdf"
              onChange={handlePdfUpload}
            />
          </div>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Above details are correct"
            feedback="You must check that details are correct before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Create Report</Button>
      </Form>
    </>
  );
}

export default CreateReportForm;
