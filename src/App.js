import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OfferList from './components/OfferList';
import PerformanceReport from './components/PerformanceReport';
import ConversionReport from './components/ConversionReport';
import ProductFeed from './components/ProductFeed';
import TrackingLink from './components/TrackingLink';
import PromoLinkByOfferId from './components/PromoLinkByOfferId';
import ProductPromotionReport from './components/ProductPromotionReport';
import PromoOfferHistory from './components/PromoOfferHistory';
import './App.css';
import LazadaLogo from './components/images/Lazada-Logo.png'; // Import the Lazada logo

function App() {
    return (
        <Router>
            <div className="App">
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <img src={LazadaLogo} alt="Lazada Logo" className="logo" />
                        <h1>Affiliate Dashboard</h1>
                    </div>
                    <nav>
                        <ul>
                            <li><Link to="/">Offer List</Link></li>
                            <li><Link to="/promo-link-by-offer-id">Promo Link by Offer ID</Link></li>
                            <li><Link to="/conversion">Conversion Report</Link></li>
                            <li><Link to="/product-promotion-report">Product Promotion Report</Link></li>
                            <li><Link to="/performance">Product Performance Report</Link></li>
                            <li><Link to="/promo-offer-history">Promo Offer History</Link></li>
                            <li><Link to="/product-feed">Product Feed</Link></li>
                            <li><Link to="/tracking-link">Track Link</Link></li>
                            
                        </ul>
                    </nav>
                </aside>
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<OfferList />} />
                        <Route path="/performance" element={<PerformanceReport />} />
                        <Route path="/conversion" element={<ConversionReport />} />
                        <Route path="/product-feed" element={<ProductFeed />} />
                        <Route path="/tracking-link" element={<TrackingLink productId={12345} mmCampaignId={67890} />} />
                        <Route path="/promo-link-by-offer-id" element={<PromoLinkByOfferId />} />
                        <Route path="/product-promotion-report" element={<ProductPromotionReport />} />
                        <Route path="/promo-offer-history" element={<PromoOfferHistory />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
