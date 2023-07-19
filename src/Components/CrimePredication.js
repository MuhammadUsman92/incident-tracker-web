import React, { useEffect, useState } from "react";

const CrimePredication = () => {
  const [graphs, setGraphs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setresult] = useState(true);
  const [resultStatus, setResultStatus] = useState(true);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [knn, setKnn] = useState(false);
  const [randomForest, setRandomForest] = useState(false);

  useEffect(() => {
    fetchGraphs();
  }, []);

  const fetchGraphs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/graphs");
      const data = await response.json();
      setGraphs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching graphs:", error);
      setLoading(false);
    }
  };

  const predictCrimeKnn = async () => {
    const data = {
      longitude: parseFloat(long),
      latitude: parseFloat(lat),
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year),
    };

    const response = await fetch("http://127.0.0.1:5000/predict_crime_knn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const prediction = Math.floor(result.prediction[0][0]);
    console.log("Predicted total number of crimes:", prediction);
    setresult(prediction);
    setResultStatus(true);
    setKnn(false);
    setRandomForest(false);
  };

  const predictCrimeRandomForest = async () => {
    const data = {
      longitude: parseFloat(long),
      latitude: parseFloat(lat),
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year),
    };

    const response = await fetch(
      "http://127.0.0.1:5000/predict_crime_random_forest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log(result);
    const prediction = Math.floor(result.prediction);
    console.log("Predicted total number of crimes:", prediction);
    if (prediction) {
      setresult(prediction);
    } else {
      setresult("kk");
    }
    setResultStatus(true);
    setKnn(false);
    setRandomForest(false);
  };

  // const predictCrime = async () => {
  //   const data = {
  //     day: 9, // Modify with the actual day
  //     month: 9, // Modify with the actual month
  //     year: 2023, // Modify with the actual year
  //   };

  //   const response = await fetch("http://127.0.0.1:5000/predict_crime", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   const result = await response.json();
  //   const prediction = result.prediction;
  //   console.log("Predicted total number of crimes:", prediction);
  // };

  return (
    <div>
      <h1 className="text-center">Crime Statistics</h1>

      <div className="container">
        <div className="row">
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            graphs.map((graph, index) => (
              <div className="col-md-4" key={index}>
                <div className="card graph-card">
                  <img
                    className="card-img-top graph-image img-fluid"
                    src={`data:image/png;base64,${graph.image}`}
                    alt="Graph"
                  />
                  <div className="card-body">
                    <p className="card-text">{graph.des}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <h1 className="text-center mt-3 mb-3">Machine Learning Models Detail</h1>

      <div className="container mb-3">
        <div className="row justify-content-between">
          <div className="col-xl-6 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">KN Regressor</h5>
                <p className="card-text">Accuracy is 75.9%</p>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#Modal1"
                  onClick={() => {
                    setKnn(true);
                  }}
                >
                  Make Prediction
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Random Forest</h5>
                <p className="card-text">Accuracy is 83.2%</p>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#Modal1"
                  onClick={() => {
                    setRandomForest(true);
                  }}
                >
                  Make Prediction
                </button>
              </div>
            </div>
          </div>
          {/* <div className="col-xl-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">LSTM</h5>
                <p className="card-text">Accuracy is 79%</p>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#Modal3"
                >
                  Make Prediction
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">ARIMA</h5>
                <p className="card-text">Accuracy is 79%</p>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#Modal4"
                >
                  Make Prediction
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Modal 1 */}
      <div
        className="modal fade"
        id="Modal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Crime Prediction using {knn ? "KNN" : "Random Forest"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setKnn(false);
                  setRandomForest(false);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label">Latitude:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lat}
                    onChange={(event) => {
                      setLat(event.target.value);
                    }}
                    id="lat"
                  ></input>
                  <label className="col-form-label">Longitude:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={long}
                    onChange={(event) => {
                      setLong(event.target.value);
                    }}
                    id="long"
                  ></input>
                  <label className="col-form-label">Day:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={day}
                    onChange={(event) => {
                      setDay(event.target.value);
                    }}
                    id="day"
                  ></input>

                  <label className="col-form-label">Month:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={month}
                    onChange={(event) => {
                      setMonth(event.target.value);
                    }}
                    id="month"
                  ></input>
                  <label className="col-form-label">Year:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={year}
                    onChange={(event) => {
                      setYear(event.target.value);
                    }}
                    id="year"
                  ></input>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      if (
                        day != "" &&
                        month != "" &&
                        year != "" &&
                        lat != "" &&
                        long != ""
                      ) {
                        // console.log(typeof day);
                        setResultStatus(false);
                      }
                    }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    disabled={resultStatus}
                    className="btn btn-outline-primary"
                    data-bs-target="#result"
                    data-bs-toggle="modal"
                    onClick={() => {
                      if (knn) {
                        predictCrimeKnn();
                      } else if (randomForest) {
                        predictCrimeRandomForest();
                      }
                    }}
                  >
                    Make Prediction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* {result modal} */}

      <div
        className="modal fade"
        id="result"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Prediction Result
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Total Number of crimes are: {result}
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimePredication;