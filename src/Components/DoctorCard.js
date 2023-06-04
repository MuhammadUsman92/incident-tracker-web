import React from 'react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="card doctor-card">
      <h3>{doctor.name}</h3>
      <p>PMDC: {doctor.pmdc}</p>
      <p>Specialization: {doctor.specialization}</p>
      <p>Qualification: {doctor.qualification}</p>
      <p>Gender: {doctor.gender}</p>
    </div>
  );
};

export default DoctorCard;
