import React, { useEffect, useState } from 'react';

function TrackingLink({ productId, mmCampaignId }) {
    const [linkInfo, setLinkInfo] = useState(null);

    useEffect(() => {
        fetch(`/api/tracking-link?productId=${productId}&mmCampaignId=${mmCampaignId}`)
            .then(response => response.json())
            .then(data => setLinkInfo(data));
    }, [productId, mmCampaignId]);

    return (
        <div>
            <h2>Tracking Link</h2>
            {linkInfo && (
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Tracking Link</th>
                            <th>Commission Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{linkInfo.productId}</td>
                            <td>{linkInfo.productName}</td>
                            <td><a href={linkInfo.trackingLink} target="_blank" rel="noopener noreferrer">Track</a></td>
                            <td>{linkInfo.commisionRate}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TrackingLink;
