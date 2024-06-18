import React, { useEffect, useState } from 'react';

function ConversionReport() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetch('/api/conversion-report')
            .then(response => response.json())
            .then(data => setReports(data.reports));
    }, []);

    return (
        <div>
            <h2>Conversion Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Conversion Time</th>
                        <th>Offer Name</th>
                        <th>Offer ID</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Country</th>
                        <th>Order ID</th>
                        <th>SKU</th>
                        <th>Payout</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.orderId}>
                            <td>{report.conversionTime}</td>
                            <td>{report.offerName}</td>
                            <td>{report.offerId}</td>
                            <td>{report.offerType}</td>
                            <td>{report.status}</td>
                            <td>{report.country}</td>
                            <td>{report.orderId}</td>
                            <td>{report.sku}</td>
                            <td>{report.estPayout}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ConversionReport;
