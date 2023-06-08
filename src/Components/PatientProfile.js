import React, {useEffect} from 'react';
import PatientDetails from './PatientDetails';
import DiseaseCard from './DiseaseCard';
import DoctorCard from './DoctorCard';
import HospitalCard from './HospitalCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { useParams } from 'react-router-dom';
import { patientDiseasesGet } from '../actions/patientActions';

const PatientProfile = () => {
  const navigate=useNavigate();
  const getPatientDiseases = useSelector((state) => state.getPatientDiseases);
  const { loading, response, error } = getPatientDiseases;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo }= userSignin;
  const params = useParams();
  const { patientId } = params; 
  const dispatch=useDispatch();
    const patient={
        "name": "عثمان",
        "email": null,
        "bloodGroup": null,
        "age": 20,
        "height": 6.0,
        "weight":80.0,
        "gender": "MALE",
        "location": {
          "street": "street",
          "city": "city",
          "postal_code": "postal_code",
          "latitude": 35.80008,
          "longitude": 74.9999,
          "country": null
        },
        "diseaseSet": [
          {
            "id": 1,
            "name": "Flu",
            "stage": "Early",
            "patientDto": null,
            "prescriptionDtoSet": []
          },
          {
            "id": 2,
            "name": "Malaria",
            "stage": "Advanced",
            "patientDto": null,
            "presDtoSet": []
          }
        ],
        "doctorSet": [
          {
            "pmdc": "12345",
            "name": "Dr. Ali",
            "specialization": "General Physician",
            "qualification": "MBBS",
            "gender": "MALE",
            "patientDtoSet": [],
            "prescriptionDtoSet": [],
            "hospitalDtoSet": []
          },
          {
            "pmdc": "67890",
            "name": "Dr. Fatima",
            "specialization": "Dermatologist",
            "qualification": "MBBS, FCPS",
            "gender": "FEMALE",
            "patientDtoSet": [],
            "prescriptionDtoSet": [],
            "hospitalDtoSet": []
          }
        ],
        "hospitalSet": [
          {
            "name": "ABC Hospital",
            "reg_no": "12345",
            "emergency_unit": true,
            "location": {
              "street": "street",
              "city": "city",
              "postal_code": "postal_code",
              "latitude": 65.9,
              "longitude": 71.4444444,
              "country": null
            }
          },
          {
            "name": "XYZ Hospital",
            "reg_no": "67890",
            "emergency_unit": false,
            "location": {
              "street": "street",
              "city": "city",
              "postal_code": "postal_code",
              "latitude": 65.9,
              "longitude": 71.4444444,
              "country": null
            }
          }
        ],
        "cnic": "33333-3333333-1"
      }
    const handleCreateDisease = () => {
      navigate(`create-disease`)
    };
    useEffect(() => {
      dispatch(patientDiseasesGet(navigate, patientId));
    }, []); // Empty dependency array to trigger the effect only on component render
  
return (
  <>
  {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {response && <div className="patient-profile">
        <PatientDetails patient={response.data} />
        <div className="cards-container">
            <h3>Diseases:</h3>
            <div className="disease-cards">
            {response.data.diseaseSet.map((disease) => (
                <DiseaseCard key={disease.id} disease={disease} />
            ))}
            {userInfo.data && userInfo.data.includes("HOSPITAL_ADMIN") &&
            <button onClick={handleCreateDisease} className="create-disease-btn">
                Create Disease
            </button>}
            </div>
            <h3>Doctors:</h3>
            <div className="doctor-cards">
            {response.data.doctorSet.map((doctor) => (
                <DoctorCard key={doctor.pmdc} doctor={doctor} />
            ))}
            </div>
            <h3>Hospitals:</h3>
            <div className="hospital-cards">
            {response.data.hospitalSet.map((hospital) => (
                <HospitalCard key={hospital.reg_no} hospital={hospital} />
            ))}
            </div>
        </div>
      </div>}
  </>
    
);
};

export default PatientProfile;
