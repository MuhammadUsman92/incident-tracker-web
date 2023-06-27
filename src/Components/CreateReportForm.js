import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../actions/reportActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { useNavigate,useParams  } from 'react-router-dom';
import { SERVER_IP } from "../actions/userActions";
import Axios from "axios";


function CreateReportForm() {
  const [validated, setValidated] = useState(false);
  const reportcreate = useSelector((state) => state.createReport);
  const { loading, response, error } = reportcreate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {prescriptionId}=params;
  const [imageLoading,setImageLoading]=useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileUpload = async (event) => {
    setImageLoading(true)
    const file = event.target.files[0]; // Get the selected file  
    const formData = new FormData();
    formData.append('file', file); // Append the file to the FormData object
    try {
      const response = await Axios.post(`http://${SERVER_IP}/authentication-service/file/upload/`, formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
      setPdfFile(response.data.data);
      setImageLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login-register');
      }
      // Handle any errors that occurred during the file upload
      console.error(error);
    }
    setImageLoading(false);
  };
  
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      const formData = {
        "collect_date": form.elements.collectDate.value,
        "result_date": form.elements.resultDate.value,
        "report_image": pdfFile,
      };
      const laboratoryRegistrationNumber =
        form.elements.laboratoryRegistrationNumber.value;
      dispatch(createReport(navigate,prescriptionId,laboratoryRegistrationNumber,formData));
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
          <Form.Group as={Col} md="3" controlId="reportImage">
            <Form.Label>File {imageLoading && <LoadingBox />}</Form.Label>
            <Form.Control
              type="file"
              defaultValue=""
              accept=".pdf, .jpg, .jpeg, .png" // Add supported image file extensions here
              onChange={handleFileUpload}
            />
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
        <Button type="submit">Create Report</Button>
      </Form>
    </>
  );
}

export default CreateReportForm;
