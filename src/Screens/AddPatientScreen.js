import React, { useState, useRef } from "react";
import DiseaseForm from "../Components/DiseaseForm";
import LabForm from "../Components/LabForm";
import MedicinesForm from "../Components/MedicinesForm";
import PrescriptionForm from "../Components/PrescriptionForm";

function AddPatientScreen() {
  const [labData, setLabData] = useState([]);
  const [DiseaseData, setDiseaseData] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [MedicinesData, setMedicinesData] = useState([]);

  const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Make POST request with labData
    //     console.log(labData);
  };

  return (
    <>
      <div
        className="container"
        style={{
          padding: 12,
          marginTop: 16,
          marginBottom: 16,

          border: "1px solid black",
          borderRadius: 12,
        }}
      >
        <form className="row g-3" action="/submit-form" method="POST">
          <div className="col-md-6">
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
          </div>
          <div style={{ marginTop: 12 }}>
            <div>
              <h5
                style={{
                  padding: 12,
                  // marginTop: 16,
                  border: "1px solid #86b7fe",
                  borderRadius: 4,
                  backgroundColor: "#cfe2ff",
                  color: "#0a58ca",
                }}
              >
                Disease
              </h5>
              <div>
                <div>
                  <DiseaseForm setDiseaseData={setDiseaseData} />
                </div>
              </div>
            </div>
            <div>
              <h5
                style={{
                  padding: 12,
                  // marginTop: 16,
                  border: "1px solid #86b7fe",
                  borderRadius: 4,
                  backgroundColor: "#cfe2ff",
                  color: "#0a58ca",
                }}
              >
                Prescription
              </h5>
              <div>
                <PrescriptionForm setPrescriptionData={setPrescriptionData} />
              </div>
            </div>
            <div>
              <h5
                style={{
                  padding: 12,
                  // marginTop: 16,
                  border: "1px solid #86b7fe",
                  borderRadius: 4,
                  backgroundColor: "#cfe2ff",
                  color: "#0a58ca",
                }}
              >
                Medicines
              </h5>
              <div>
                <MedicinesForm setMedicinesData={setMedicinesData} />
              </div>
            </div>
            {/* Accordion */}

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
            <button type="submit" className="btn btn-success btn-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPatientScreen;
