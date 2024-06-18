import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getOffers = (limit, page) => {
    return axios.get(`${API_BASE_URL}/offers`, { params: { limit, page } });
};

export const getPerformanceReport = (dateStart, dateEnd, offerType, limit, page) => {
    return axios.get(`${API_BASE_URL}/performance`, { params: { dateStart, dateEnd, offerType, limit, page } });
};

export const getConversionReport = (dateStart, dateEnd, offerId, mmPartnerFlag, limit, page) => {
    return axios.get(`${API_BASE_URL}/conversion`, { params: { dateStart, dateEnd, offerId, mmPartnerFlag, limit, page } });
};

export const getProductFeed = (offerType, categoryL1, mmCampaignId, productIds, limit, page) => {
    return axios.get(`${API_BASE_URL}/product-feed`, { params: { offerType, categoryL1, mmCampaignId, productIds, limit, page } });
};

export const getTrackingLink = (productId, mmCampaignId) => {
    return axios.get(`${API_BASE_URL}/tracking-link`, { params: { productId, mmCampaignId } });
};
