import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

const medicineTypes = [
  { type: "Tablets", units: ["mg"] },
  { type: "Capsules", units: ["mg"] },
  { type: "Syrup", units: ["ml", "teaspoons", "tablespoons"] },
  { type: "Injection", units: ["ml", "mg"] },
  { type: "Ointment", units: ["grams"] },
];

const timings = [
  'Morning Before Meal',
  'Morning After Meal',
  'Afternoon Before Meal',
  'Afternoon After Meal',
  'Evening Before Meal',
  'Evening After Meal',
  'Night After Meal',
  'Night Before Meal',
  'Bedtime',
  'Every 4 hours',
  'Every 6 hours',
  'Every 8 hours',
  'Every 12 hours',
  'Once a day Before Meal',
  'Once a day After Meal',
  'Twice a day Before Meal',
  'Twice a day After Meal',
  'Three times a day Before Meal',
  'Three times a day After Meal',
  'Four times a day Before Meal',
  'Four times a day After Meal'
];

function MedicinesForm(props) {
  const [medicines, setMedicines] = useState([
    {
      medicineName: "",
      medicineType: "",
      medicineDuration: "",
      medicineQuantity: "",
      medicineQuantityUnit: "",
      medicineTimings: "",
    },
  ]);


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
      setMedicines((prevMedicines) => prevMedicines.filter((_, i) => i !== index));

      // Remove corresponding medicine data
      props.setMedicinesData((prevMedicineData) => prevMedicineData.filter((_, i) => i !== index));
    }
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };


  const addMedicine = () => {
    setMedicines((prevMedicines) => [
      ...prevMedicines,
      {
        medicineName: "",
        medicineType: "",
        medicineDuration: "",
        medicineQuantity: "",
        medicineQuantityUnit: "",
        medicineTimings: "",
      },
    ]);
    scrollToBottom();
  };

  const renderMedicines = () => {
    return medicines.map((medicine, index) => {
      const selectedType = medicineTypes.find((type) => type.type === medicine.medicineType);
      const units = selectedType ? selectedType.units : [];

      return (
        <div
          key={index}
          className="row g-3"
          style={{
            padding:6,
            border: "1px solid black",
            borderRadius: 12,
            margin: 4,
          }}
        >
          <div className="col-md-6 mt-0">
            <label className="form-label mb-1">Medicine Name</label>
            <input
              type="text"
              id="medicineName"
              name="medicineName"
              className="form-control"
              value={medicine.medicineName}
              onChange={(event) => handleMedicineInputChange(event, index, "medicineName")}
              required
            />
          </div>
          <div className="col-md-6 mt-0">
            <label className="form-label mb-1">Type</label>
            <select
              className="form-select form-control"
              id="medicineType"
              name="medicineType"
              value={medicine.medicineType}
              onChange={(event) => handleMedicineInputChange(event, index, "medicineType")}
              required
              >
              <option value="">Select Type</option>
              {medicineTypes.map((type) => (
                <option key={type.type} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
            </div>
          <div className="col-md-4 mt-0">
            <label className="form-label mb-1">Duration (In Days)</label>
            <input
              type="number"
              id="medicineDuration"
              name="medicineDuration"
              className="form-control"
              value={medicine.medicineDuration}
              onChange={(event) => handleMedicineInputChange(event, index, "medicineDuration")}
              required
            />
            </div>
          <div className="col-md-4 mt-0">
            <label className="form-label mb-1">Quantity</label>
            <div className="input-group">
              <input
                type="number"
                id="medicineQuantity"
                name="medicineQuantity"
                className="form-control custom-border-right"
                value={medicine.medicineQuantity}
                onChange={(event) => handleMedicineInputChange(event, index, "medicineQuantity")}
                required
              />
              {units.length > 0 && (
                <select
                  className="form-select form-control custom-input-group"
                  value={medicine.medicineQuantityUnit}
                  onChange={(event) =>
                    handleMedicineInputChange(event, index, "medicineQuantityUnit")
                  }
                  required
                >
                  <option value="">Select Unit</option>
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="col-md-4 mt-0">
            <label className="form-label mb-1">Timings</label>
            <select
              className="form-select form-control"
              id="medicineTimings"
              name="medicineTimings"
              value={medicine.medicineTimings}
              onChange={(event) => handleMedicineInputChange(event, index, "medicineTimings")}
              required
            >
              <option value="">Select Type</option>
              {timings.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          {medicines.length > 1 && (
            <button
              type="button"
              style={{ margin: 12,width: 'fit-content' }}
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleMedicineDeleteClick(index)}
            >
              Delete
            </button>
          )}
        </div>
      );
    });
  }
  return (
    <div>
      {renderMedicines()}
      <button
        type="button"
        style={{ margin: 12}}
        className="btn btn-outline-success"
        onClick={addMedicine}
      >
        Add
      </button>
    </div>
  );
}

  export default MedicinesForm;
