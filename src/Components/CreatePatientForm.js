import React, { useState, useRef } from "react";
import { Form, Col } from "react-bootstrap";

function MedicinesForm(props) {
  const medicineAddBtnRef = useRef();

  const [medicines, setMedicines] = useState([
    {
      medicineName: "",
      medicineType: "",
      medicineDuration: "",
      medicineQuantity: "",
      medicineTimings: "",
    },
  ]);

  const addMedicine = () => {
    setMedicines((prevMedicines) => [
      ...prevMedicines,
      {
        medicineName: "",
        medicineType: "",
        medicineDuration: "",
        medicineQuantity: "",
        medicineTimings: "",
      },
    ]);
    if (medicineAddBtnRef.current) {
      medicineAddBtnRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMedicineInputChange = (event, index, field) => {
    const value = event.target.value;
    setMedicines((prevMedicines) => {
      const updatedMedicines = [...prevMedicines];
      updatedMedicines[index] = { ...updatedMedicines[index], [field]: value };
      props.setMedicinesData(updatedMedicines);
      return updatedMedicines;
    });
  };

  const handleMedicineDeleteClick = (index) => {
    if (medicines.length > 1) {
      setMedicines((prevMedicines) =>
        prevMedicines.filter((_, i) => i !== index)
      );
    }
  };

  const renderMedicines = () => {
    return medicines.map((medicine, index) => (
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
            value={medicine.medicineName}
            onChange={(event) =>
              handleMedicineInputChange(event, index, "medicineName")
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
            value={medicine.medicineType}
            onChange={(event) =>
              handleMedicineInputChange(event, index, "medicineType")
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
            value={medicine.medicineDuration}
            onChange={(event) =>
              handleMedicineInputChange(event, index, "medicineDuration")
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
            value={medicine.medicineQuantity}
            onChange={(event) =>
              handleMedicineInputChange(event, index, "medicineQuantity")
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
            value={medicine.medicineTimings}
            onChange={(event) =>
              handleMedicineInputChange(event, index, "medicineTimings")
            }
            required
          />
        </div>
        {medicines.length > 1 && (
          <button
            type="button"
            style={{ margin: 12 }}
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleMedicineDeleteClick(index)}
          >
            Delete
          </button>
        )}
      </div>
    ));
  };

  return (
    <div>
      <h5 className="head-div">Medicines</h5>
      {renderMedicines()}
      <button
        ref={medicineAddBtnRef}
        type="button"
        style={{ margin: 12 }}
        className="btn btn-outline-success"
        onClick={addMedicine}
      >
        Add
      </button>
    </div>
  );
}

export default MedicinesForm;
