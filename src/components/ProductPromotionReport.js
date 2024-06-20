import React, { useEffect, useState } from 'react';
import './ProductPromotionReport.css';

function ProductPromotionReport() {
    const [reports, setReports] = useState([]);
    const [startDate, setStartDate] = useState('2023-01-01');
    const [endDate, setEndDate] = useState('2024-04-30');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, [startDate, endDate]);

    const fetchReports = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/report/promotion?' + new URLSearchParams({
                dateStart: startDate,
                dateEnd: endDate,
                limit: 10,
                page: 1
            }));
            const data = await response.json();
            setReports(data.data);
        } catch (error) {
            console.error('Error fetching promotion report:', error);
        }
        setIsLoading(false);
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') setStartDate(value);
        if (name === 'endDate') setEndDate(value);
    };

    return (
        <div className="product-feed-container">
            <h2 className="product-feed-title">Product Promotion Report</h2>
            <div className="product-feed-content">
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
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>Member ID</th>
                                    <th>Website</th>
                                    <th>Date</th>
                                    <th>Promo Name</th>
                                    <th>Clicks</th>
                                    <th>Visits</th>
                                    <th>Orders</th>
                                    <th>Order Amount</th>
                                    <th>CPS Payout</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report, index) => (
                                    <tr key={index}>
                                        <td>{report.memberId}</td>
                                        <td>{report.website}</td>
                                        <td>{report.date}</td>
                                        <td>{report.promoName}</td>
                                        <td>{report.clicks}</td>
                                        <td>{report.visits}</td>
                                        <td>{report.orders}</td>
                                        <td>{report.orderAmount}</td>
                                        <td>{report.cpsPayout}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductPromotionReport;
