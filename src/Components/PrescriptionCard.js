import React from 'react';
import MedicineCard from './MedicineCard';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReportCard from './ReportCard';
import { useSelector } from 'react-redux';


const PrescriptionCard = ({ prescription }) => {
    const navigate = useNavigate();
    const handleClick = ( ) => {
        navigate(`/add-report/${prescription.id}`)
    }
    const userSignin = useSelector((state) => state.userSignin);
  const { userInfo }= userSignin;
return (
<div className="card prescription-card">
<h3>Prescription Date: {prescription.date}</h3>
<p>Recover: {prescription.recover ? 'Yes' : 'No'}</p>
<p>Comments: {prescription.comments}</p>
<Row>
    <Col><h4>Medicines:</h4></Col>
    {userInfo.data && userInfo.data.includes("HOSPITAL_ADMIN") &&
    <Col>
      <button onClick={handleClick} className="add-prescription-btn">
        Add Report
      </button>
    </Col>}
</Row>
<div className="medicine-details">
{prescription.medicineSet?.map((medicine, index) => (
<MedicineCard key={index} medicine={medicine} />
))}
{prescription.reportSet?.map((report, index) => (
<ReportCard key={index} report={report} />
))}
</div>
</div>
);
};
export default PrescriptionCard;
