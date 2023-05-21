import React, { useState } from "react";
import LabForm from "../Components/LabForm";
import MedicinesForm from "../Components/MedicinesForm";
import PrescriptionForm from "../Components/PrescriptionForm";
import MessageBox from "../Components/MessageBox";
import LoadingBox from '../Components/LoadingBox';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet';
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { patientPrescriptionCreate } from '../actions/patientActions';

function AddPatientScreen(props) {
  const [labData, setLabData] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState("");
  const [medicinesData, setMedicinesData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessagePrescription, setErrorMessagePrescription] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [validationError, setValidationError] = useState(false);
  const createPrescription = useSelector((state) => state.createPatientPrescription);
  const { loading, response, error } = createPrescription;
  const dispatch = useDispatch();
  const handleDoctorChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDoctor(selectedValue);
    setValidationError(selectedValue === "");
  };
  const mapMedicineData = (medicineData) => {
    return medicineData.map((medicine) => {
      const { medicineName, medicineType, medicineQuantity, medicineQuantityUnit, medicineTimings, medicineDuration } = medicine;
      return {
        name: medicineName,
        type: medicineType,
        quantity: medicineQuantity + " " + medicineQuantityUnit,
        timing: medicineTimings,
        duration: medicineDuration,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      prescriptionData === "" ||
      prescriptionData.prescriptionComments === "" ||
      prescriptionData.prescriptionDate === "" ||
      prescriptionData.prescriptionTime === ""
    ) {
      setErrorMessagePrescription("Please fill in all the prescription fields.");
      return;
    }
    setErrorMessagePrescription("");

    // Validate medicine fields
    const isMedicineDataValid = medicinesData.every((medicine) => {
      return (
        medicine.medicineName !== "" &&
        medicine.medicineType !== "" &&
        medicine.medicineDuration !== "" &&
        medicine.medicineQuantity !== "" &&
        medicine.medicineQuantityUnit !== "" &&
        medicine.medicineTimings !== ""
      );
    });

    if (medicinesData.length === 0 || !isMedicineDataValid) {
      setErrorMessage("Please fill in all the medicine fields.");
      return;
    }
    setErrorMessage(null);

    if (selectedDoctor === "") {
      setValidationError(true);
      return;
    }

    // Proceed with form submission
    const formData = {
      date: new Date(`${prescriptionData.prescriptionDate}T${prescriptionData.prescriptionTime}:00`).toISOString(),
      comments: prescriptionData.prescriptionComments.trim(),
      medicineSet: mapMedicineData(medicinesData),
    };

    console.log(labData);
    console.log(formData);
    console.log(selectedDoctor);

    dispatch(patientPrescriptionCreate(props.DiseaseId, selectedDoctor, formData));
  };

  return (
    <>
      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.1/js/bootstrap.min.js"></script>
      </Helmet>
      <div className='main-container m-5'>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {response && <MessageBox variant="success">{response}</MessageBox>}
        <form className="row g-3">
          <div className="m-4">
            <div>
              {errorMessagePrescription !== '' && <MessageBox variant="danger">{errorMessagePrescription}</MessageBox>}
              <h5 className="head-div">
                Prescription
              </h5>
              <div>
                <PrescriptionForm setPrescriptionData={setPrescriptionData} />
              </div>
            </div>
            <div>
              {errorMessage && <MessageBox variant="danger">{errorMessage}</MessageBox>}
              <h5 className="head-div">
                Medicines
              </h5>
              <div>
                <MedicinesForm setMedicinesData={setMedicinesData} />
              </div>
            </div>
            {/* <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Lab <span style={{ color: "red" }}>&nbsp;Optional</span>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div>
                    <LabForm setLabData={setLabData} />
                  </div>
                </div>
              </div>
            </div> */}
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
              <Form.Group as={Col}>
                <label className="form-label mr-4">Doctor:</label>
                <Form.Select
                  aria-label="Default select example"
                  className={`d-inline-block w-auto ${validationError ? "is-invalid" : ""}`}
                  value={selectedDoctor}
                  onChange={handleDoctorChange}
                >
                  <option value="">Please select the doctor</option>
                  <option value="3454">Usman</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select a doctor.
                </Form.Control.Feedback>
              </Form.Group>
              
            </Col>
            <Col className="text-center">
              <button type="submit" className="btn btn-success btn-lg" onClick={handleSubmit}>
                Submit
              </button>
            </Col>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPatientScreen;
