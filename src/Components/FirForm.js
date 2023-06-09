import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SERVER_IP } from "../actions/userActions";
import { useSelector } from "react-redux";

import Axios from "axios";

function FirForm(props) {
  const [fir, setFir] = useState([
    {
      policeStationName: "",
      complainantName: "",
      complainantDate: "",
      complainantCategory: "",
      assignedOfficerName: "",
      incidentReport: "",
      contactNum: "",
      officerCell: "",
      document_1: "",
      document_2: "",
    },
  ]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const navigate = useNavigate();

  const handleFileUpload = async (event, index, field) => {
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
      const uploadedFile = response.data.data; // Get the uploaded file data from the response
      setFir((prevFir) => {
        const updatedFir = [...prevFir];
        updatedFir[index] = { ...updatedFir[index], [field]: uploadedFile };
        return updatedFir;
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login-register');
      }
      // Handle any errors that occurred during the file upload
      console.error(error);
    }
  };
  

  const handleFirInputChange = (event, index, field) => {
    const value = event.target.value;
    setFir((prevfir) => {
      const updatedFir = [...prevfir];
      updatedFir[index] = { ...updatedFir[index], [field]: value };
      props.setFirData(updatedFir);
      return updatedFir;
    });
  };

  const handleFirDeleteClick = (index) => {
    if (fir.length > 1) {
      setFir((prevFir) => prevFir.filter((_, i) => i !== index));

      // Remove corresponding medicine data
      props.setFirData((prevFirData) =>
        prevFirData.filter((_, i) => i !== index)
      );
    }
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const addFir = () => {
    setFir((prevFir) => [
      ...prevFir,
      {
        policeStationName: "",
        complainantName: "",
        complainantDate: "",
        complainantCategory: "",
        assignedOfficerName: "",
        incidentReport: "",
        contactNum: "",
        officerCell: "",
        document_1: "",
        document_2: "",
      },
    ]);
    scrollToBottom();
    console.log(fir);
  };

  const renderFir = () => {
    return fir.map((fir, index) => {
      return (
        <div
          key={index}
          className="row g-3"
          style={{
            padding: 6,
            border: "1px solid black",
            borderRadius: 12,
            margin: 6,
          }}
        >
          <div className="col-md-4 mt-0">
            <label className="form-label mb-1">Police Station</label>
            <input
              type="text"
              id="policeStationName"
              name="policeStationName"
              className="form-control"
              value={fir.policeStationName}
              onChange={(event) =>
                handleFirInputChange(event, index, "policeStationName")
              }
              required
            />
          </div>
          <div className="col-md-4 mt-0">
            <label className="form-label mb-1">Complainant Name</label>
            <input
              type="text"
              id="complainantName"
              name="complainantName"
              className="form-control"
              value={fir.complainantName}
              onChange={(event) =>
                handleFirInputChange(event, index, "complainantName")
              }
              required
            />
          </div>

          <div className="col-md-4 mt-0">
            <label className="form-label mb-1">Complainant Date</label>
            <input
              type="date"
              id="complainantDate"
              name="complainantDate"
              className="form-control"
              value={fir.complainantDate}
              onChange={(event) =>
                handleFirInputChange(event, index, "complainantDate")
              }
              required
            />
          </div>

          <div className="col-md-4 mt-0">
            <label className="form-label mb-1">Complainant Category</label>
            <input
              type="text"
              id="complainantCategory"
              name="complainantCategory"
              className="form-control"
              value={fir.complainantCategory}
              onChange={(event) =>
                handleFirInputChange(event, index, "complainantCategory")
              }
              required
            />
          </div>

          <div className="col-md-4 mt-0">
            <label className="form-label mb-1">Assigned Officer Name</label>
            <input
              type="text"
              id="assignedOfficerName"
              name="assignedOfficerName"
              className="form-control"
              value={fir.assignedOfficerName}
              onChange={(event) =>
                handleFirInputChange(event, index, "assignedOfficerName")
              }
              required
            />
          </div>

          <div className="col-md-4 mt-0">
            <label className="form-label mb-1">Incident Report</label>
            <input
              type="text"
              id="incidentReport"
              name="incidentReport"
              className="form-control"
              value={fir.incidentReport}
              onChange={(event) =>
                handleFirInputChange(event, index, "incidentReport")
              }
              required
            />
          </div>

          <div className="col-md-3 mt-0">
            <label className="form-label mb-1">Comlainant Contact Number</label>
            <input
              type="number"
              id="contactNum"
              name="contactNum"
              className="form-control"
              value={fir.contactNum}
              onChange={(event) =>
                handleFirInputChange(event, index, "contactNum")
              }
              required
            />
          </div>

          <div className="col-md-3 mt-0">
            <label className="form-label mb-1">Officer phone Number</label>
            <input
              type="number"
              id="officerCell"
              name="officerCell"
              className="form-control"
              value={fir.officerCell}
              onChange={(event) =>
                handleFirInputChange(event, index, "officerCell")
              }
              required
            />
          </div>

          <div className="col-md-3 mt-0">
            <label className="form-label mb-1" htmlFor="file-upload1">Upload Document 1:</label>
            <input
              id="file-upload1"
              type="file"
              defaultValue=""
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={(event) => handleFileUpload(event, index, "document_1")}
              className="form-control"
            />
          </div>

          <div className="col-md-3 mt-0">
            <label className="form-label mb-1" htmlFor="file-upload2">Upload Document 2:</label>
            <input
              id="file-upload2"
              type="file"
              defaultValue=""
              accept=".pdf,  .jpg, .jpeg, .png" 
              onChange={(event) => handleFileUpload(event, index, "document_2")}
              className="form-control"
            />
          </div>

          {index > 0 && (
            <button
              type="button"
              style={{ marginTop: 12, width: "fit-content" }}
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleFirDeleteClick(index)}
            >
              Delete
            </button>
          )}
        </div>
      );
    });
  };
  return (
    <div>
      {renderFir()}
      <button
        type="button"
        style={{ margin: 12 }}
        className="btn btn-outline-success"
        onClick={addFir}
      >
        Add
      </button>
    </div>
  );
}

export default FirForm;
