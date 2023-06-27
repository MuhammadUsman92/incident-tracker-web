import React from 'react';
import { Link } from 'react-router-dom';
const ReportCard = ({ report }) => {
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
return (
<div className="card medicine-card">
<p>Collect Date: {report.collect_date?formatDateTime(report.collect_date):NaN}</p>
<p>Result Date: {report.result_date?formatDateTime(report.result_date):NaN}</p>
<p>Report Image: {report.report_image?<Link to={`report-file/${report.report_image}`}>View Report</Link>:NaN}</p>
</div>
);
};
export default ReportCard;
