import React from 'react';

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
  const { cnic, name, age, gender, location, criminalStatuses } = data;

  return (
  <div className="criminal-details">
    <h2>Criminal Details</h2>
    <div className="header">
      <p>CNIC: {cnic}</p>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>
      <p>
        Location: {location.street}, {location.city}, {location.postal_code}, {location.country}
      </p>
    </div>
    <div className="criminal-statuses">
      {criminalStatuses.map((status, index) => (
        <div key={index} className="status-card">
          <p>Arrest Date: {status.arrestDate || 'N/A'}</p>
          <p>Days in Jail: {status.numOfDayInJail || 'N/A'}</p>
          <p>Status {status.status}</p>
          <p>Crime Type: {status.crime.type}</p>
          <p>Incident Date: {status.crime.incidentDate || 'N/A'}</p>
          <p>
            Crime Location: {status.crime.incidentLocation.street}, {status.crime.incidentLocation.city},{' '}
            {status.crime.incidentLocation.postal_code}, {status.crime.incidentLocation.country}
          </p>
        </div>
      ))}
    </div>
  </div>
);
}

export default CriminalDetails;
