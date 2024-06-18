import React, { useEffect, useState } from 'react';

function PerformanceReport() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetch('/api/performance-report')
            .then(response => response.json())
            .then(data => setReports(data.reports));
    }, []);

    return (
        <div>
            <h2>Performance Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Conversion Time</th>
                        <th>Offer ID</th>
                        <th>Offer Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Country</th>
                        <th>Platform</th>
                        <th>Order ID</th>
                        <th>Payout</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.orderId}>
                            <td>{report.conversionTime}</td>
                            <td>{report.offerId}</td>
                            <td>{report.offerName}</td>
                            <td>{report.offerType}</td>
                            <td>{report.status}</td>
                            <td>{report.country}</td>
                            <td>{report.platform}</td>
                            <td>{report.orderId}</td>
                            <td>{report.payout}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PerformanceReport;
