import React, { useState } from "react";
import labPic from "./lab.jpg";
import hospitalPic from "./h.jpg";
import doctorPic from "./dee2.jpg";

const HealthAdminPanal = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Health Admin Panal</span>
        </div>
      </nav>
      <div className=" row m-4" style={{ justifyContent: "space-evenly" }}>
        <div
          className="card col-md-4"
          style={{ width: "12rem", margin: 12, padding: 0, height: "11.5rem" }}
        >
          <img src={hospitalPic} className="card-img-top" alt="..." />
          <div className="card-body">
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#HospitalModal"
            >
              Add Hospital
            </button>
          </div>
        </div>
        <div
          className="card col-md-4"
          style={{ width: "12rem", margin: 12, padding: 0, height: "13rem" }}
        >
          <img
            src={doctorPic}
            className="card-img-top"
            alt="..."
            style={{ objectFit: "contain" }}
          />
          <div className="card-body">
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#DoctorModal"
            >
              Add Doctor
            </button>
          </div>
        </div>
        <div
          className="card col-md-4"
          style={{ width: "12rem", margin: 12, padding: 0, height: "12rem" }}
        >
          <img src={labPic} className="card-img-top" alt="..." />
          <div className="card-body">
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#LabModal"
            >
              Add Lab
            </button>
          </div>
        </div>
      </div>
      {/* Hospital Modal */}
      <div
        className="modal fade"
        id="HospitalModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Hospital
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  padding: 12,
                  border: "1px solid black",
                  borderRadius: 12,
                  margin: 12,
                }}
              >
                <label className="form-label">Hospital Name</label>
                <input type="text" id="hospitalName" className="form-control" />
                <label className="form-label">Reg #</label>
                <input
                  type="text"
                  id="hospitalRegNumber"
                  className="form-control"
                />
                <label className="form-label">Emergency Unit</label>
                <input
                  type="text"
                  id="emergencyUnit"
                  className="form-control"
                />
                <label className="form-label">Country</label>
                <input
                  type="text"
                  id="HospitalCountry"
                  className="form-control"
                />
                <label className="form-label">City</label>
                <input type="text" id="HospitalCity" className="form-control" />
                <label className="form-label">Location</label>
                <textarea
                  className="form-control"
                  id="HospitalLocation"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Cancal
              </button>
              <button type="button" className="btn btn-outline-success">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Modal */}
      <div
        className="modal fade"
        id="DoctorModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Doctor
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  padding: 12,
                  border: "1px solid black",
                  borderRadius: 12,
                  margin: 12,
                }}
              >
                <label className="form-label">Doctor Name</label>
                <input type="text" id="doctorName" className="form-control" />
                <label className="form-label">Gender</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label className="form-check-label" for="inlineRadio1">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                    />
                    <label className="form-check-label" for="inlineRadio2">
                      Female
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value="option3"
                    />
                    <label className="form-check-label" for="inlineRadio3">
                      Other
                    </label>
                  </div>
                </div>
                <label className="form-label">Qualification</label>
                <input
                  type="text"
                  id="qualification"
                  className="form-control"
                />
                <label className="form-label">Specialization</label>
                <input
                  type="text"
                  id="specialization"
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Cancal
              </button>
              <button type="button" className="btn btn-outline-success">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* lAB Modal */}

      <div
        className="modal fade"
        id="LabModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add LAB
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  padding: 12,
                  border: "1px solid black",
                  borderRadius: 12,
                  margin: 12,
                }}
              >
                <label className="form-label">Lab Name</label>
                <input type="text" id="labName" className="form-control" />
                <label className="form-label">Reg #</label>
                <input type="text" id="labRegNumber" className="form-control" />

                <label className="form-label">Country</label>
                <input type="text" id="Labcountry" className="form-control" />
                <label className="form-label">City</label>
                <input type="text" id="LabCity" className="form-control" />
                <label className="form-label">Location</label>
                <textarea
                  className="form-control"
                  id="LabLocation"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Cancal
              </button>
              <button type="button" className="btn btn-outline-success">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthAdminPanal;
