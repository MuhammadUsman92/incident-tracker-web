import React from 'react';

const DiseaseCard = ({ disease }) => {
  const handleAddPrescription = () => {
    // Add your logic for adding a prescription here
    console.log('Add prescription for', disease.name);
  };

  return (
    <div className="card disease-card">
      <h3>{disease.name}</h3>
      <p>Stage: {disease.stage}</p>
      <button onClick={handleAddPrescription} className="add-prescription-btn">
        Add Prescription
      </button>
    </div>
  );
};

export default DiseaseCard;
