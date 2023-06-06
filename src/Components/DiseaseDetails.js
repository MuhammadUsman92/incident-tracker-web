import React,{useEffect} from 'react';
import PrescriptionCard from './PrescriptionCard';
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { fetchDiseaseById  } from '../actions/patientActions';

const DiseaseDetails = () => {
  const navigate=useNavigate();
  const diseaseDetails = useSelector((state) => state.diseaseDetails);
  const { loading, response, error } = diseaseDetails;
  const params = useParams();
  const { id } = params; 
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchDiseaseById(navigate, id));
  }, []);
   const disease = {
        "name": "Diabetes",
        "stage": "Chronic",
        "prescriptionDtoSet": [
        {
          "id":1,
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
          "id":2,
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

      <>
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {response &&
        <div className="disease-details">
          <h2>{response.data.name}</h2>
          <p>Stage: {response.data.stage}</p>
          <h3>Prescriptions:</h3>
          <div className="prescription-cards">
          {response.data.prescriptionDtoSet?.map((prescription) => (
              <PrescriptionCard key={prescription.id} prescription={prescription} />
            ))}
          </div>
        </div>}
      </>

  );
};

export default DiseaseDetails;
