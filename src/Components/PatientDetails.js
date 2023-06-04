import React from 'react';

const PatientDetails = ({ patient }) => {
  return (
    <div className="header">
      <h2>{patient.name}</h2>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
      <p>Height: {patient.height}</p>
      <p>Weight: {patient.weight}</p>
      <p>CNIC: {patient.cnic}</p>
      <p>Location: {patient.location.street}, {patient.location.city}, {patient.location.country}</p>
    </div>
  );
};

export default PatientDetails;
