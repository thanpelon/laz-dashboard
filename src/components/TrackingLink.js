import React, { useEffect, useState } from 'react';
import './TrackingLink.css'; // Make sure to import the CSS file

function TrackingLink({ mmCampaignId }) {
    const [productId, setProductId] = useState('');
    const [linkInfo, setLinkInfo] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const handleInputChange = (event) => {
        setProductId(event.target.value);
    };

    const fetchLinkInfo = () => {
        fetch(`/api/product/link?` + new URLSearchParams({
            productId: productId
        }))
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    setLinkInfo(data.data);
                    setNotFound(false);
                } else {
                    setLinkInfo(null);
                    setNotFound(true);
                }
            });
    };

    return (
        <div className="product-feed-container">
            <h2 className="product-feed-title">Tracking Link</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter Product ID"
                    value={productId}
                    onChange={handleInputChange}
                    className="tracking-input"
                />
                <button onClick={fetchLinkInfo} className="tracking-button">Get Tracking Link</button>
            </div>
            {notFound && <p className="Error">Product not found. Please try again.</p>}
            {linkInfo && (
                <div className="tracking-link-section">
                    <table className="tracking-link-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Tracking Link</th>
                                <th>Commission Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="product-name">{linkInfo.productName}</td>
                                <td><a href={linkInfo.trackingLink} target="_blank" rel="noopener noreferrer">Track</a></td>
                                <td>{linkInfo.commisionRate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TrackingLink;
