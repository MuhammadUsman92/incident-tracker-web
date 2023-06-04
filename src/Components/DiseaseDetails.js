import React from 'react';
import PrescriptionCard from './PrescriptionCard';

const DiseaseDetails = () => {
   const disease = {
        "name": "Diabetes",
        "stage": "Chronic",
        "prescriptionDtoSet": [
        {
        "date": "2022-10-10T08:00:00.000Z",
        "recover": false,
        "comments": "Monitor blood sugar levels regularly.",
        "medicine": [
        {
        "name": "Metformin",
        "type": "Prescription",
        "quantity": "2 tablets",
        "timing": "Twice daily",
        "duration": "Ongoing"
        },
        {
        "name": "Insulin",
        "type": "Prescription",
        "quantity": "10 units",
        "timing": "Before meals",
        "duration": "Ongoing"
        }
        ]
        },
        {
        "date": "2022-11-15T12:30:00.000Z",
        "recover": true,
        "comments": "Continue monitoring and follow up with the doctor regularly.",
        "medicine": [
        {
        "name": "Metformin",
        "type": "Prescription",
        "quantity": "2 tablets",
        "timing": "Twice daily",
        "duration": "Ongoing"
        }
        ]
        }
        ]
        }
  return (
    <div className="disease-details">
      <h2>{disease.name}</h2>
      <p>Stage: {disease.stage}</p>
      <h3>Prescriptions:</h3>
      <div className="prescription-cards">
       {disease.prescriptionDtoSet.map((prescription) => (
          <PrescriptionCard key={prescription.date} prescription={prescription} />
        ))}
      </div>
    </div>
  );
};

export default DiseaseDetails;
