import React, { useState, useRef } from "react";
import DiseaseForm from "../Components/DiseaseForm";
import LabForm from "../Components/LabForm";
import MedicinesForm from "../Components/MedicinesForm";
import PrescriptionForm from "../Components/PrescriptionForm";

import { Helmet } from 'react-helmet';

function AddPatientScreen() {
  const [labData, setLabData] = useState([]);
  const [DiseaseData, setDiseaseData] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [MedicinesData, setMedicinesData] = useState([]);

  const handleSubmit = (event) => {
     event.preventDefault();
    //     // Make POST request with labData
    console.log(labData);
    console.log(DiseaseData);
    console.log(prescriptionData);
    console.log(MedicinesData);

  };

  return (
    <>
      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.1/js/bootstrap.min.js"></script>
    </Helmet>
      <div className='main-container m-5' >
        <form className="row g-3">
          {/* <div className="col-md-6">
            <label className="form-label">User Name</label>
            <input
              id="userName"
              name="userName"
              type="text"
              className="form-control"
              title="Fill User Name"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">CNIC</label>
            <input
              id="cnic"
              type="text"
              name="cnic"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Height</label>
            <input
              id="height"
              type="text"
              className="form-control"
              name="height"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Weight</label>
            <input
              id="weight"
              type="text"
              name="weight"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Gender</label>
            <select id="inputState" className="form-select">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div> */}
          <div className="m-4">
            {/* <div>
              <h5 className="head-div">
                Disease
              </h5>
              <div>
                <div>
                  <DiseaseForm setDiseaseData={setDiseaseData} />
                </div>
              </div>
            </div> */}
            <div>
              <h5  className="head-div">
                Prescription
              </h5>
              <div>
                <PrescriptionForm setPrescriptionData={setPrescriptionData} />
              </div>
            </div>
            <div>
              <h5 className="head-div">
                Medicines
              </h5>
              <div>
                <MedicinesForm setMedicinesData={setMedicinesData} />
              </div>
            </div>
            <div className="accordion" id="accordionExample">
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
            </div>
          </div>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              marginTop: 12,
              marginBottom: 18,
            }}
          >
            <button type="submit" className="btn btn-success btn-lg" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPatientScreen;
