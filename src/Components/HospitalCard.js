import React from 'react';

const HospitalCard = ({ hospital }) => {
  return (
    <div className="card hospital-card">
      <h3>{hospital.name}</h3>
      <p>Registration Number: {hospital.reg_no}</p>
      <p>Emergency Unit: {hospital.emergency_unit ? 'Yes' : 'No'}</p>
      <p>Location: {hospital.location.street}, {hospital.location.city}, {hospital.location.country}</p>
    </div>
  );
};

export default HospitalCard;
