import React, { useState, useRef } from "react";

function DiseaseForm(props) {
  const DiseaseAddBtnRef = useRef();

  const [DiseaseDivs, setDiseaseDivs] = useState([
    {
      diseaseName: "",
      diseaseStage: "",
    },
  ]);

  const addDiseaseDivs = () => {
    setDiseaseDivs([...DiseaseDivs, { diseaseName: "", diseaseStage: "" }]);
    if (DiseaseAddBtnRef) {
      // 👇 Will scroll smoothly to the top of the next section
      DiseaseAddBtnRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const handleDiseaseInputChange = (event, index, field) => {
  //   const value = event.target.value;
  //   const newDivs = setDiseaseDivs((prevDivs) => {
  //     const newDivs = [...prevDivs];
  //     newDivs[index] = { ...newDivs[index], [field]: value };
  //     return newDivs;
  //   });

  //   // Call setLabData with updated lab data
  //   props.setDiseaseData(newDivs);
  // };
  const handleDiseaseInputChange = (event, index, field) => {
    const value = event.target.value;
    const newDivs = [...DiseaseDivs];
    newDivs[index] = { ...newDivs[index], [field]: value };
    setDiseaseDivs(newDivs);

    // Call setLabData with updated lab data
    props.setDiseaseData(newDivs);
  };


  const handleDiseaseDeleteClick = (index) => {
    if (DiseaseDivs.length > 1) {
      setDiseaseDivs((prevDivs) => prevDivs.filter((div, i) => i !== index));
    }
  };

  const renderDiseaseDivs = () => {
    return DiseaseDivs.map((div, index) => (
      <div
        key={index}
        style={{
          padding: 12,
          border: "1px solid black",
          borderRadius: 12,
          margin: 12,
        }}
      >
        <label className="form-label">Disease Name</label>
        <input
          type="text"
          id="diseaseName"
          name="diseaseName"
          className="form-control"
          value={div.diseaseName}
          onChange={(event) =>
            handleDiseaseInputChange(event, index, "diseaseName")
          }
          required
        />
        <label className="form-label">Stage</label>
        <input
          type="text"
          id="stage"
          name="stage"
          className="form-control"
          value={div.diseaseStage}
          onChange={(event) =>
            handleDiseaseInputChange(event, index, "diseaseStage")
          }
          required
        />
        {DiseaseDivs.length > 1 && (
          <button
            type="button"
            style={{ margin: 12 }}
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDiseaseDeleteClick(index)}
          >
            Delete
          </button>
        )}
      </div>
    ));
  };
  return (
    <div>
      {renderDiseaseDivs()}

      <button
        ref={DiseaseAddBtnRef}
        type="button"
        style={{ margin: 12 }}
        className="btn btn-outline-success"
        onClick={addDiseaseDivs}
      >
        Add
      </button>
    </div>
  );
}

export default DiseaseForm;
