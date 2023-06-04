import React from 'react';
import MedicineCard from './MedicineCard';
const PrescriptionCard = ({ prescription }) => {
return (
<div className="card prescription-card">
<h3>Prescription Date: {prescription.date}</h3>
<p>Recover: {prescription.recover ? 'Yes' : 'No'}</p>
<p>Comments: {prescription.comments}</p>
<h4>Medicines:</h4>
<div className="medicine-details">
{prescription.medicine.map((medicine, index) => (
<MedicineCard key={index} medicine={medicine} />
))}
</div>
</div>
);
};
export default PrescriptionCard;
