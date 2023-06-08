import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DiseaseCard = ({ disease }) => {
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo }= userSignin;
  const handleClick = (key, event) => {
    if (event) {
      event.stopPropagation(); // Stop event propagation
    }
    if (key === 'add-prescription-btn') {
      navigate(`disease-details/${disease.id}/create-prescription`);
    } else {
      navigate(`disease-details/${disease.id}`);
    }
  };

  return (
    <div className="card disease-card" onClick={() => handleClick('disease-card')}>
      <h3>{disease.name}</h3>
      <p>Stage: {disease.stage}</p>
      {userInfo.data && userInfo.data.includes("HOSPITAL_ADMIN") &&
      <button onClick={(event) => handleClick('add-prescription-btn', event)} className="add-prescription-btn">
        Add Prescription
      </button>}
    </div>
  );
};

export default DiseaseCard;
