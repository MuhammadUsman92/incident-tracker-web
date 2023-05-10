import React, { useState, useRef } from "react";

function PrescriptionForm(props) {
  const presAddBtnRef = useRef();

  const [prescriptionDivs, setPrescriptionDivs] = useState([
    { prescriptionComments: "", prescriptionDate: "", prescriptionTime: "" },
  ]);

  const addPrescriptionDivs = () => {
    setPrescriptionDivs([
      ...prescriptionDivs,
      { prescriptionComments: "", prescriptionDate: "", prescriptionTime: "" },
    ]);
    if (presAddBtnRef) {
      // 👇 Will scroll smoothly to the top of the next section
      presAddBtnRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrescriptionInputChange = (event, index, field) => {
    const value = event.target.value;
    setPrescriptionDivs((prevDivs) => {
      const newDivs = [...prevDivs];
      newDivs[index] = { ...newDivs[index], [field]: value };
      // Call setPrescriptionData with updated prescription data
      props.setPrescriptionData(newDivs);
      return newDivs;
    });
  };


  const handlePrescriptionDeleteClick = (index) => {
    if (prescriptionDivs.length > 1) {
      setPrescriptionDivs((prevDivs) =>
        prevDivs.filter((div, i) => i !== index)
      );
    }
  };

  const renderPrescriptionDivs = () => {
    return prescriptionDivs.map((div, index) => (
      <div
        key={index}
        style={{
          padding: 12,
          border: "1px solid black",
          borderRadius: 12,
          margin: 12,
        }}
      >
        <label className="form-label">Comments</label>
        <textarea
          className="form-control"
          id="prescriptionComments"
          name="prescriptionComments"
          rows="3"
          value={div.prescriptionComments}
          onChange={(event) =>
            handlePrescriptionInputChange(event, index, "prescriptionComments")
          }
          required
        ></textarea>
        <label className="form-label">Date</label>
        <input
          type="date"
          id="prescriptionDate"
          name="prescriptionDate"
          className="form-control"
          value={div.prescriptionDate}
          onChange={(event) =>
            handlePrescriptionInputChange(event, index, "prescriptionDate")
          }
          required
        />
        <label className="form-label">Time</label>
        <input
          type="time"
          id="prescriptionTime"
          name="prescriptionTime"
          className="form-control"
          value={div.prescriptionTime}
          onChange={(event) =>
            handlePrescriptionInputChange(event, index, "prescriptionTime")
          }
          required
        />
        {prescriptionDivs.length > 1 && (
          <button
            type="button"
            style={{ margin: 12 }}
            className="btn btn-outline-danger btn-sm"
            onClick={() => handlePrescriptionDeleteClick(index)}
          >
            Delete
          </button>
        )}
      </div>
    ));
  };

  return (
    <div>
      {renderPrescriptionDivs()}

      <button
        ref={presAddBtnRef}
        type="button"
        style={{ margin: 12 }}
        className="btn btn-outline-success"
        onClick={addPrescriptionDivs}
      >
        Add
      </button>
    </div>
  );
}

export default PrescriptionForm;
