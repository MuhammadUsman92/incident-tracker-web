import React from 'react';
const ReportCard = ({ report }) => {
return (
<div className="card medicine-card">
<p>Collect Date: {report.collect_date}</p>
<p>Result Date: {report.result_date}</p>
<p>Report Image: {report.report_image}</p>
</div>
);
};
export default ReportCard;
