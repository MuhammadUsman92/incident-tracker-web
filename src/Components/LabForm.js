import React, { useState, useRef } from "react";

function LabForm(props) {
  const labAddBtnRef = useRef();

  const [LabDivs, setLabDivs] = useState([
    {
      testName: "",
      labName: "",
      collectionDate: "",
      resultDate: "",
      report: "",
    },
  ]);

  const addLabDivs = () => {
    setLabDivs([
      ...LabDivs,
      {
        testName: "",
        labName: "",
        collectionDate: "",
        resultDate: "",
        report: "",
      },
    ]);
  };

  const handleLabInputChange = (event, index, field) => {
    const value = event.target.value;
    setLabDivs((prevDivs) => {
      const newDivs = [...prevDivs];
      newDivs[index] = { ...newDivs[index], [field]: value };
      props.setLabData(newDivs);
      return newDivs;
    });
  };

  const handleLabDeleteClick = (index) => {
    if (LabDivs.length > 1) {
      setLabDivs((prevDivs) => prevDivs.filter((div, i) => i !== index));
    }
  };

  const renderLabDivs = () => {
    return LabDivs.map((div, index) => (
      <div
        key={index}
        className="row g-3"
        style={{
          padding: 12,
          border: "1px solid black",
          borderRadius: 12,
          margin: 12,
        }}
      >
        <div className="col-md-6">
          <label className="form-label">Test Name</label>
          <input
            type="text"
            id="TestName"
            name="TestName"
            className="form-control"
            value={div.testName}
            onChange={(event) => handleLabInputChange(event, index, "testName")}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Lab Name</label>
          <input
            type="text"
            name="labName"
            id="labName"
            className="form-control"
            value={div.labName}
            onChange={(event) => handleLabInputChange(event, index, "labName")}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Collection Date</label>
          <input
            type="date"
            id="collectionDate"
            name="collectionDate"
            className="form-control"
            value={div.collectionDate}
            onChange={(event) =>
              handleLabInputChange(event, index, "collectionDate")
            }
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Result Date</label>
          <input
            type="date"
            id="resultDate"
            name="resultDate"
            className="form-control"
            value={div.resultDate}
            onChange={(event) =>
              handleLabInputChange(event, index, "resultDate")
            }
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Report</label>
          <input
            type="text"
            id="report"
            name="report"
            className="form-control"
            value={div.report}
            onChange={(event) => handleLabInputChange(event, index, "report")}
          />
        </div>
        {LabDivs.length > 1 && (
          <button
            type="button"
            style={{ margin: 12, width: "3.8rem" }}
            className="btn btn-outline-danger btn-sm "
            onClick={() => handleLabDeleteClick(index)}
          >
            Delete
          </button>
        )}
      </div>
    ));
  };
  return (
    <div>
      {renderLabDivs()}
      <button
        ref={labAddBtnRef}
        type="button"
        style={{ margin: 12 }}
        className="btn btn-outline-success"
        onClick={addLabDivs}
      >
        Add
      </button>
    </div>
  );
}

export default LabForm;
