import React, { useState } from 'react';
import './PromoLinkByOfferId.css'; // Make sure to import the CSS file

function PromoLinkByOfferId() {
    const [offerId, setOfferId] = useState('');
    const [promoLink, setPromoLink] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchPromoLink = () => {
        fetch('/api/offers/link?' + new URLSearchParams({
            offerId: offerId
        }))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Offer ID invalid or not found. Please try again.');
                }
                return response.json();
            })
            .then(data => {
                setPromoLink(data.data);
                setErrorMessage('');
            })
            .catch(error => {
                setPromoLink(null);
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="promo-link-container">
            <h2 className="promo-link-title">Get Promo Link by Offer ID</h2>
            <div className="promo-input-section">
                <input 
                    type="text" 
                    value={offerId} 
                    onChange={(e) => setOfferId(e.target.value)} 
                    placeholder="Enter Offer ID" 
                    className="promo-input"
                />
                <button onClick={fetchPromoLink} className="promo-button">Get Promo Link</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {promoLink && (
                <div className="promo-link-details">
                    <p><strong>Offer ID:</strong> {promoLink.offerId}</p>
                    <p><strong>Promo Link:</strong> <a href={promoLink.shortLink} className="promo-link">{promoLink.shortLink}</a></p>
                </div>
            )}
        </div>
    );
}

export default PromoLinkByOfferId;
