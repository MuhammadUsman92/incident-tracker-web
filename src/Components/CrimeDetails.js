import React from 'react';

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
  const { incidentLocation, incidentDate, type, firSet, criminalDtos } = data;

  return (
    <div className="crime-card">
      <h2 className="crime-header">Crime Details</h2>
      <div className="header">
      <p>Type: {type}</p>
      <p>Incident Date: {incidentDate}</p>
      <p>
        Location: {incidentLocation.street}, {incidentLocation.city}, {incidentLocation.postal_code}, {incidentLocation.country}
      </p>
    </div>
      <h3 className="fir-header">First Information Report</h3>
      <section className="fir-section">
        {firSet.map((fir) => (
          <div className="fir-card" key={fir.id}>
            <h4 className="fir-title">{fir.policeStationName}</h4>
            <p className="fir-description">{fir.incidentReport}</p>
            <p className="fir-status">{fir.status}</p>
          </div>
        ))}
      </section>
      <h3 className="criminal-header">Criminal Details</h3>
      <section className="criminal-section">
        {criminalDtos.map((criminal) => (
          <div className="criminal-card" key={criminal.cnic}>
            <h4 className="criminal-title">{criminal.name}</h4>
            <p className="criminal-description">{`CNIC: ${criminal.cnic}`}</p>
            <p className="criminal-description">{`Age: ${criminal.age} | Gender: ${criminal.gender}`}</p>
            <p className="criminal-location">{`Location: ${criminal.location.city}, ${criminal.location.country}`}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CrimeDetails;
