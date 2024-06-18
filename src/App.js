import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OfferList from './components/OfferList';
import PerformanceReport from './components/PerformanceReport';
import ConversionReport from './components/ConversionReport';
import ProductFeed from './components/ProductFeed';
import TrackingLink from './components/TrackingLink';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Lazada Affiliate Dashboard</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Offer List</Link></li>
                            <li><Link to="/performance">Performance Report</Link></li>
                            <li><Link to="/conversion">Conversion Report</Link></li>
                            <li><Link to="/product-feed">Product Feed</Link></li>
                            <li><Link to="/tracking-link">Tracking Link</Link></li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<OfferList />} />
                        <Route path="/performance" element={<PerformanceReport />} />
                        <Route path="/conversion" element={<ConversionReport />} />
                        <Route path="/product-feed" element={<ProductFeed />} />
                        <Route path="/tracking-link" element={<TrackingLink productId={12345} mmCampaignId={67890} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
