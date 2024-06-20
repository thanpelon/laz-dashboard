import React, { useEffect, useState } from 'react';
import './PromoOfferHistory.css'; 

function PromoOfferHistory() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetch('/api/offers/promo?' + new URLSearchParams({
            limit: 10,
            page: 1,
            isBonus: false
        }))
            .then(response => response.json())
            .then(data => setOffers(data.data));
    }, []);

    return (
        <div className="product-feed-container"> 
            <h2 className="product-feed-title">Promo Offer History</h2>
            <div className="product-feed-content"> 
                <div className="product-list"> 
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Offer ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Country</th>
                                <th>Type</th>
                                <th>Preview URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>Data is empty.</td>
                                </tr>
                            ) : (
                                offers.map((offer) => (
                                    <tr key={offer.offerId}>
                                        <td>{offer.offerId}</td>
                                        <td>{offer.name}</td>
                                        <td>{offer.desc}</td>
                                        <td>{offer.country}</td>
                                        <td>{offer.type}</td>
                                        <td><a href={offer.previewUrl} target="_blank" rel="noopener noreferrer">{offer.previewUrl}</a></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PromoOfferHistory;
