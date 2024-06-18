import React, { useEffect, useState } from 'react';

function OfferList() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetch('/api/offers?' + new URLSearchParams({
            limit: 30,
            page: 1,
        }))
            .then(response => response.json())
            .then(data => setOffers(data["data"]));
    }, []);

    return (
        <div>
            <h2>Offer List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Offer ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Country</th>
                        <th>Type</th>
                        <th>Expiration Date</th>
                        <th>Preview URL</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.map((offer) => (
                        <tr key={offer.offerId}>
                            <td>{offer.offerId}</td>
                            <td>{offer.name}</td>
                            <td>{offer.desc}</td>
                            <td>{offer.country}</td>
                            <td>{offer.type}</td>
                            <td>{offer.expiredTimestamp}</td>
                            <td><a href={offer.previewUrl} target="_blank" rel="noopener noreferrer">Preview</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OfferList;
