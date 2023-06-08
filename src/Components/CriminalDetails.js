import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCriminalDetails } from '../actions/criminalAction';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { useNavigate } from 'react-router-dom';



const CriminalDetails = ( ) => {
  const  data= {
        "cnic": "11111-1111111-2",
        "name": "name",
        "age": 20,
        "gender": "MALE",
        "location": {
            "id": null,
            "street": "street",
            "city": "city",
            "postal_code": "postal_code",
            "latitude": 35.80008,
            "longitude": 74.9999,
            "country": "country"
        },
        "criminalStatuses": [
            {
                "arrestDate": "2023-05-20T10:00:00.000+00:00",
                "numOfDayInJail": 6,
                "crime": {
                    "id": 1,
                    "incidentLocation": {
                        "id": null,
                        "street": null,
                        "city": null,
                        "postal_code": null,
                        "latitude": 37.7749,
                        "longitude": -122.4194,
                        "country": null
                    },
                    "incidentDate": "2022-12-31T18:30:00.000+00:00",
                    "type": "Robbery",
                    "firSet": []
                },
                "dischargeDate": "2023-05-25T18:00:00.000+00:00"
            }
        ]
    }
  const CriminalDetails = useSelector((state) => state.getCriminalDetails);
  const { loading, response, error } = CriminalDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo }= userSignin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { criminalId } = params; 
  const { cnic, name, age, gender, location, criminalStatuses } = data;
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    };
    return dateTime.toLocaleString("en-US", options);
    }
  const handleCrime = (crimeId) => {
    navigate(`crime-details/${crimeId}`)
    console.log(crimeId)
  };
  const handleAddCrime = () => {
    navigate(`criminal-status`)
  };
  useEffect(() => {
    dispatch(getCriminalDetails(navigate, criminalId));
  }, []);
  return (
    <>
    {loading && <LoadingBox />}
    {error && <MessageBox variant="danger">{error}</MessageBox>}
  {response && <div className="criminal-details">
    <h2>Criminal Details</h2>
    <div className="header">
      <p>CNIC: {response.data.cnic}</p>
      <p>Name: {response.data.name}</p>
      <p>Age: {response.data.age}</p>
      <p>Gender: {response.data.gender}</p>
      <p>
        Location: {response.data.location.street}, {response.data.location.city}, {response.data.location.country}
      </p>
    </div>
    <div className="criminal-statuses">
      {response.data.criminalStatuses.map((status, index) => (
        <div key={index} className="status-card" onClick={()=>handleCrime(status.crime.id)}>
          <p>Arrest Date: {status.arrestDate?formatDateTime(status.arrestDate):'N/A'}</p>
          <p>Days in Jail: {status.numOfDayInJail || 'N/A'}</p>
          <p>Status {status.status}</p>
          <p>Crime Type: {status.crime.type}</p>
          <p>Incident Date: {status.crime.incidentDate?formatDateTime(status.crime.incidentDate):'N/A'}</p>
          <p>
            Crime Location: {status.crime.incidentLocation.street}, {status.crime.incidentLocation.city},{' '}
             {status.crime.incidentLocation.country}
          </p>
        </div>
      ))}
      {userInfo.data && userInfo.data.includes("HOSPITAL_ADMIN") &&
            <button onClick={handleAddCrime} className="status-card">
                Add Crime Status
            </button>}
    </div>
  </div>}
  </>
);
}

export default CriminalDetails;
