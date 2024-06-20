import React, { useEffect, useState } from 'react';
import './PerformanceReport.css'; // Make sure to import your CSS file

function PerformanceReport() {
    const [reports, setReports] = useState([]);
    const [startDate, setStartDate] = useState('2024-03-01');
    const [endDate, setEndDate] = useState('2024-03-31');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchReports();
    }, [startDate, endDate]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/report/performance?' + new URLSearchParams({
                limit: 30,
                page: 1,
                offerType: 'CPS',
                dateStart: startDate,
                dateEnd: endDate
            }));
            const data = await response.json();
            setReports(data.data);
        } catch (error) {
            console.error('Error fetching performance report:', error);
        }
        setLoading(false);
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') setStartDate(value);
        if (name === 'endDate') setEndDate(value);
    };

    return (
        <div className="performance-report-container">
            <h2 className="performance-report-title">Product Performance Report</h2>
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
            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : (
                <div className="report-table-container">
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Country</th>
                                <th>Member Name</th>
                                <th>Payout</th>
                                <th>Base Payout</th>
                                <th>Offer Type</th>
                                <th>Platform</th>
                                <th>Member Email</th>
                                <th>Bonus Payout</th>
                                <th>Order Amount</th>
                                <th>Member Website Name</th>
                                <th>Offer ID</th>
                                <th>Clicks</th>
                                <th>Orders</th>
                                <th>Currency</th>
                                <th>Member ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.date}>
                                    <td>{report.date}</td>
                                    <td>{report.country}</td>
                                    <td>{report.memberName}</td>
                                    <td>{report.payOut}</td>
                                    <td>{report.basePayout}</td>
                                    <td>{report.offerType}</td>
                                    <td>{report.platform}</td>
                                    <td>{report.memberEmail}</td>
                                    <td>{report.bonusPayout}</td>
                                    <td>{report.orderAmount}</td>
                                    <td>{report.memberWebsiteName}</td>
                                    <td>{report.offerId}</td>
                                    <td>{report.clicks}</td>
                                    <td>{report.orders}</td>
                                    <td>{report.currency}</td>
                                    <td>{report.memberId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default PerformanceReport;
