import React, { useState, useRef } from "react";

function MedicinesForm(props) {
  const medicineAddBtnRef = useRef();

  const [MedicinesDivs, setMedicinesDivs] = useState([
    {
      medicineName: "",
      medicineType: "",
      medicineDuration: "",
      medicineQuantity: "",
      medicineTimings: "",
    },
  ]);

  const addMedicinesDivs = () => {
    setMedicinesDivs([
      ...MedicinesDivs,
      {
        medicineName: "",
        medicineType: "",
        medicineDuration: "",
        medicineQuantity: "",
        medicineTimings: "",
      },
    ]);
    if (medicineAddBtnRef) {
      // 👇 Will scroll smoothly to the top of the next section
      medicineAddBtnRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMedicinesInputChange = (event, index, field) => {
    const value = event.target.value;
    setMedicinesDivs(prevDivs => {
      const newDivs = [...prevDivs];
      newDivs[index] = { ...newDivs[index], [field]: value };
      // Call setMedicinesData with updated medicines data
      props.setMedicinesData(newDivs);
      return newDivs;
    });
  };


  const handleMedicinesDeleteClick = (index) => {
    if (MedicinesDivs.length > 1) {
      setMedicinesDivs((prevDivs) => prevDivs.filter((div, i) => i !== index));
    }
  };

  const renderMedicinesDivs = () => {
    return MedicinesDivs.map((div, index) => (
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
          <label className="form-label">Medicine Name</label>
          <input
            type="text"
            id="medicineName"
            name="medicineName"
            className="form-control"
            value={div.medicineName}
            onChange={(event) =>
              handleMedicinesInputChange(event, index, "medicineName")
            }
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Type</label>
          <input
            type="text"
            id="medicineType"
            name="medicineType"
            className="form-control"
            value={div.medicineType}
            onChange={(event) =>
              handleMedicinesInputChange(event, index, "medicineType")
            }
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Duration</label>
          <input
            type="text"
            id="medicineDuration"
            name="medicineDuration"
            className="form-control"
            value={div.medicineDuration}
            onChange={(event) =>
              handleMedicinesInputChange(event, index, "medicineDuration")
            }
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Quantity</label>
          <input
            type="text"
            id="medicineQuantity"
            name="medicineQuantity"
            className="form-control"
            value={div.medicineQuantity}
            onChange={(event) =>
              handleMedicinesInputChange(event, index, "medicineQuantity")
            }
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Timings</label>
          <input
            type="text"
            id="medicineTimings"
            name="medicineTimings"
            className="form-control"
            value={div.medicineTimings}
            onChange={(event) =>
              handleMedicinesInputChange(event, index, "medicineTimings")
            }
            required
          />
        </div>
        {MedicinesDivs.length > 1 && (
          <button
            type="button"
            style={{ margin: 12, width: "3.8rem" }}
            className="btn btn-outline-danger btn-sm "
            onClick={() => handleMedicinesDeleteClick(index)}
          >
            Delete
          </button>
        )}
      </div>
    ));
  };
  return (
    <div>
      {renderMedicinesDivs()}

      <button
        ref={medicineAddBtnRef}
        type="button"
        style={{ margin: 12 }}
        className="btn btn-outline-success"
        onClick={addMedicinesDivs}
      >
        Add
      </button>
    </div>
  );
}

export default MedicinesForm;
