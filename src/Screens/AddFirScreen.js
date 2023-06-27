import React, { useState } from "react";
import LabForm from "../Components/LabForm";
import FirForm from "../Components/FirForm";
import CrimeForm from "../Components/CrimeForm";
import MessageBox from "../Components/MessageBox";
import LoadingBox from "../Components/LoadingBox";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createCrime } from "../actions/crimeActions";
import { getCoordinates } from "../Components/GetLocation";
import { useNavigate  } from 'react-router-dom';
function AddFirScreen(props) {
  const [crimeData, setCrimeData] = useState("");
  const [firData, setFirData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageCrime, setErrorMessageCrime] = useState("");
  const crimeCreate = useSelector((state) => state.createCrime);
  const { loading, response, error } = crimeCreate;
  const navigate=useNavigate();

  const dispatch = useDispatch();
  
  const mapFirData = (firData) => {
    return firData.map((fir) => {
      const {
        policeStationName,
        complainantName,
        complainantDate,
        complainantCategory,
        assignedOfficerName,
        incidentReport,
        contactNum,
        officerCell,
        document_1,
        document_2,
      } = fir;
      return {
        policeStationName: policeStationName,
        complainantName: complainantName,
        complainantDate: complainantDate,
        complainantCategory: complainantCategory,
        assignedOfficerName: assignedOfficerName,
        incidentReport: incidentReport,
        contactNum: contactNum,
        officerCell: officerCell,
        document_1: document_1,
        document_2: document_2,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      //   crimeData === "" ||
      crimeData.incidentDateTime === "" ||
      crimeData.type === "" ||
      crimeData.street === "" ||
      crimeData.city === "" ||
      crimeData.postal_code === "" ||
      crimeData.country === ""
    ) {
      console.log(crimeData);
      setErrorMessageCrime("Please fill in all the Crime fields.");
      return;
    }
    setErrorMessageCrime("");

    // Validate medicine fields
    const isFirDataValid = firData.every((fir) => {
      return (
        fir.policeStationName !== "" &&
        fir.complainantName !== "" &&
        fir.complainantDate !== "" &&
        fir.complainantCategory !== "" &&
        fir.assignedOfficerName !== "" &&
        fir.incidentReport !== "" &&
        fir.contactNum !== "" &&
        fir.officerCell !== ""
      );
    });

    if (firData.length === 0 || !isFirDataValid) {
      setErrorMessage("Please fill in all the Fir fields.");
      return;
    }
    setErrorMessage(null);

    // Proceed with form submission
    const formData = {
      type: crimeData.type,
      incidentDate:crimeData.incidentDateTime,
      incidentLocation:{
      street: crimeData.street,
      city: crimeData.city,
      postal_code: crimeData.postal_code,
      country: crimeData.country,
      },
      firSet: mapFirData(firData),
    };

    try {
      const { latitude, longitude } = await getCoordinates(
        formData.incidentLocation.street,
        formData.incidentLocation.city,
        formData.incidentLocation.postal_code,
        formData.incidentLocation.country
      );
      formData.incidentLocation.latitude = latitude;
      formData.incidentLocation.longitude = longitude;
      console.log(formData); // Form data including latitude and longitude
      dispatch(createCrime(navigate,formData));
    } catch (error) {
      console.log(error.message);
      // Handle error
      dispatch(createCrime(navigate,formData));
    }
  };

  return (
    <>
      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.1/js/bootstrap.min.js"></script>
      </Helmet>
      <div className="main-container m-1">
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {response && <MessageBox variant="success">{response}</MessageBox>}
        <form className="row g-3">
          <div className=" ">
            <div>
              {errorMessageCrime !== "" && (
                <MessageBox variant="danger">{errorMessageCrime}</MessageBox>
              )}
              <h5 className="head-div">Crime</h5>
              <div>
                <CrimeForm setCrimeData={setCrimeData} />
              </div>
            </div>
            <div>
              {errorMessage && (
                <MessageBox variant="danger">{errorMessage}</MessageBox>
              )}
              <h5 className="head-div">FIR</h5>
              <div>
                <FirForm setFirData={setFirData} />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
              marginTop: 12,
              marginBottom: 18,
            }}
          >
            <Col className="text-center">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                Submit
              </button>
            </Col>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddFirScreen;
