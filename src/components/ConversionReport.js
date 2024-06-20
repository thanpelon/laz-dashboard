import React, { useEffect, useState } from 'react';
import './ConversionReport.css'; // Make sure to import your CSS file

function ConversionReport() {
    const [reports, setReports] = useState([]);
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-01-31');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, [startDate, endDate]);

    const fetchReports = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/report/conversion?' + new URLSearchParams({
                limit: 30,
                page: 1,
                dateStart: startDate,
                dateEnd: endDate
            }));
            const data = await response.json();
            setReports(data.data);
        } catch (error) {
            console.error('Error fetching conversion report:', error);
        }
        setIsLoading(false);
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') setStartDate(value);
        if (name === 'endDate') setEndDate(value);
    };

    return (
        <div className="conversion-report-container">
            <h2 className="conversion-report-title">Product Conversion Report</h2>
            <div className="date-filters">
                <label>
                    Start Date: 
                    <input type="date" name="startDate" value={startDate} onChange={handleDateChange} />
                </label>
                <label>
                    End Date: 
                    <input type="date" name="endDate" value={endDate} onChange={handleDateChange} />
                </label>
                <button className="apply-filters-button" onClick={fetchReports}>Apply Filters</button>
            </div>
            {isLoading ? (
                <p className="loading-message">Loading...</p>
            ) : reports.length === 0 ? (
                <p className="empty-message">Data is Empty.</p>
            ) : (
                <div className="report-table-container">
                    <table className="report-table">
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
            )}
        </div>
    );
}

export default ConversionReport;
