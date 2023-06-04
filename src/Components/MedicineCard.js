import React from 'react';
const MedicineCard = ({ medicine }) => {
return (
<div className="card medicine-card">
<p>Name: {medicine.name}</p>
<p>Type: {medicine.type}</p>
<p>Quantity: {medicine.quantity}</p>
<p>Timing: {medicine.timing}</p>
<p>Duration: {medicine.duration}</p>
</div>
);
};
export default MedicineCard;
