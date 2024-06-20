import React, { useEffect, useState } from 'react';
import './OfferList.css'; 

function OfferList() {
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/offers?' + new URLSearchParams({
            limit: 30,
            page: 1,
        }))
            .then(response => response.json())
            .then(data => {
                setOffers(data["data"]);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="offer-list-container">
            <h2 className="offer-list-title">Offer List</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : offers.length === 0 ? (
                <p>Data is Empty.</p>
            ) : (
                <div className="table-responsive">
                    <table className="offer-table">
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
                                    <td>
                                        {offer.previewUrl ? 
                                            <a href={offer.previewUrl} target="_blank" rel="noopener noreferrer">Preview</a> 
                                            : 
                                            "Empty"
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default OfferList;
