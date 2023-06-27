import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCrimeById } from '../actions/crimeActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const CrimeDetails = () => {
    const data ={
        "id": 1,
        "incidentLocation": {
            "id": 3,
            "street": null,
            "city": null,
            "postal_code": null,
            "latitude": 37.7749,
            "longitude": -122.4194,
            "country": null
        },
        "incidentDate": "2022-12-31T18:30:00.000+00:00",
        "type": "Robbery",
        "firSet": [
            {
                "id": 0,
                "policeStationName": "City Police Station",
                "complainantName": "John Doe",
                "complainantDate": "2022-12-31T18:30:00.000+00:00",
                "complainantCategory": "Victim",
                "assignedOfficerName": "Officer Smith",
                "status": "Investigating",
                "incidentReport": "The suspect stole my wallet and fled the scene.",
                "contactNum": "123-456-7890",
                "officerCell": "Officer Smith",
                "document_1": "file1.pdf",
                "document_2": "file2.pdf",
                "crime": null
            },

            {
                "id": 1,
                "policeStationName": "City Police Station",
                "complainantName": "John Doe",
                "complainantDate": "2022-12-31T18:30:00.000+00:00",
                "complainantCategory": "Victim",
                "assignedOfficerName": "Officer Smith",
                "status": "Investigating",
                "incidentReport": "The suspect stole my wallet and fled the scene.",
                "contactNum": "123-456-7890",
                "officerCell": "Officer Smith",
                "document_1": "file1.pdf",
                "document_2": "file2.pdf",
                "crime": null
            }
        ],
        "criminalDtos": [
            {
                "cnic": "11111-1111111-2",
                "name": "name",
                "age": 20,
                "gender": "MALE",
                "location": {
                    "id": 2,
                    "street": "street",
                    "city": "city",
                    "postal_code": "postal_code",
                    "latitude": 35.80008,
                    "longitude": 74.9999,
                    "country": "country"
                },
                "criminalStatuses": []
            }
        ]
    }
    const crimeDetails = useSelector((state) => state.crimeDetails);
    const { loading, response, error } = crimeDetails;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params; 
  const { incidentLocation, incidentDate, type, firSet, criminalDtos } = data;
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
  useEffect(() => {
    dispatch(getCrimeById(navigate, id));
  }, []);
  return (
    <>
    {loading && <LoadingBox />}
    {error && <MessageBox variant="danger">{error}</MessageBox>}
  {response &&
    <div className="crime-card">
      <h2 className="crime-header">Crime Details</h2>
      <div className="header">
      <p>Type: {response.data.type}</p>
      <p>Incident Date: {response.data.incidentDate?formatDateTime(response.data.incidentDate):'N/A'}</p>
      <p>
        Location: {response.data.incidentLocation.street}, {response.data.incidentLocation.city}, {response.data.incidentLocation.country}
      </p>
    </div>
      <h3 className="fir-header">First Information Report</h3>
      <section className="fir-section">
        {response.data.firSet?.map((fir) => (
          <div className="fir-card" key={fir.id}>
            <h4 className="fir-title">{`Police Station: ${fir.policeStationName}`}</h4>
            <p className="fir-description">{`Complainant: ${fir.complainantName}`}</p>
            <p className="fir-description">{`Contact Num: ${fir.contactNum}`}</p>
            <p className="fir-description">{`Date: ${fir.complainantDate?formatDateTime(fir.complainantDate):'N/A'}`}</p>
            <p className="fir-description">{`Category: ${fir.complainantCategory}`}</p>
            <p className="fir-description">{`Officer Name: ${fir.assignedOfficerName}`}</p>
            <p className="fir-description">{`Officer Cell: ${fir.officerCell}`}</p>
            <p className="fir-description">{`Report: ${fir.incidentReport}`}</p>
            <p className="fir-description">{`Document: ${fir.incidentReport}`}</p>
            <p className="fir-description">document_1: {fir.document_1?<Link to={`fir-file/${fir.document_1}`}>View Report</Link>:NaN}</p>
            <p className="fir-description">document_2: {fir.document_2?<Link to={`fir-file/${fir.document_2}`}>View Report</Link>:NaN}</p>
            <p className="fir-status">{fir.status}</p>
          </div>
        ))}
      </section>
      <h3 className="criminal-header">Criminal Details</h3>
      <section className="criminal-section">
        {response.data.criminal?.map((criminal) => (
          <div className="criminal-card" key={criminal.cnic}>
            <h4 className="criminal-title">{criminal.name}</h4>
            <p className="criminal-description">{`CNIC: ${criminal.cnic}`}</p>
            <p className="criminal-description">{`Age: ${criminal.age} | Gender: ${criminal.gender}`}</p>
            <p className="criminal-location">{`Location: ${criminal.location.city}, ${criminal.location.country}`}</p>
          </div>
        ))}
      </section>
    </div>}
    </>
  );
};

export default CrimeDetails;
