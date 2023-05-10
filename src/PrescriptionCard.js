import React from "react";

const PrescriptionCard = () => {
  return (
    <div
      className="accordion-body"
      style={{
        padding: 12,
        border: "1px solid black",
        borderRadius: 12,
        margin: 12,
      }}
    >
      <label className="form-label">Comments</label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
      <label className="form-label">Date</label>
      <input type="date" className="form-control" />
      <label className="form-label">Time</label>
      <input type="time" className="form-control" />
    </div>
  );
};

export default PrescriptionCard;
