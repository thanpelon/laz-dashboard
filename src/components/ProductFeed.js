import React, { useEffect, useState } from 'react';
import './ProductFeed.css'; 

function ProductFeed({ mmCampaignId }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('productId');
    const [productLinks, setProductLinks] = useState({});
    const [popup, setPopup] = useState({ show: false, content: null });

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page) => {
        setLoading(true);
        try {
            const response = await fetch('/api/product/feed?' + new URLSearchParams({
                limit: 30,
                page: page,
                offerType: 1 
            }));
            const data = await response.json();
            setProducts(data.data);
            setFilteredProducts(data.data);
            setTotalPages(Math.ceil(data.totalCount / 30));

            // Fetch and store product links
            const links = {};
            for (const product of data.data) {
                const link = await fetchLinkInfo(product.productId);
                links[product.productId] = link;
            }
            setProductLinks(links);
        } catch (error) {
            console.error('Error fetching product feed:', error);
        }
        setLoading(false);
    };

    const fetchLinkInfo = async (productId) => {
        try {
            const response = await fetch(`/api/product/link?` + new URLSearchParams({
                productId: productId
            }));
            const data = await response.json();
            return data.data ? data.data.trackingLink : null;
        } catch (error) {
            console.error('Error fetching tracking link:', error);
            return null;
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchTerm(value);

        if (value === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => 
                String(product[searchField]).toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    };

    const handleCopyLink = async (link) => {
        try {
            await navigator.clipboard.writeText(link);
            alert('Link copied to clipboard!');
        } catch (error) {
            alert('Failed to copy the link.');
        }
    };

    const handleImageClick = (imageUrl) => {
        setPopup({
            show: true,
            content: (
                <div className="popup-content">
                    <img src={imageUrl} alt="Product" className="enlarged-image" />
                    <p>{imageUrl}</p>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(imageUrl).then(() => {
                                alert('Image URL copied to clipboard!');
                                setPopup({ show: false, content: null });
                            }, () => {
                                alert('Failed to copy the image URL.');
                            });
                        }}
                    >
                        Copy Image URL
                    </button>
                </div>
            )
        });
    };

    return (
        <div className="product-feed-container">
            <h2 className="product-feed-title">Product Feed</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder={`Search by...`}
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select onChange={handleSearchFieldChange} value={searchField}>
                    <option value="productId">Product ID</option>
                    <option value="productName">Name</option>
                    <option value="categoryL1">Category</option>
                </select>
            </div>
            <div className="product-feed-content">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="product-card-container">
                        {filteredProducts.map((product) => (
                            <div key={product.productId} className="product-card">
                                <img
                                    src={product.pictures[0]}
                                    alt={product.productName}
                                    className="product-image"
                                    onClick={() => handleImageClick(product.pictures[0])}
                                />
                                <div className="product-info">
                                    <h3 className="product-name">{product.productName}</h3>
                                    <p><strong>Product ID:</strong> {product.productId}</p>
                                    <p><strong>Category:</strong> {product.categoryL1}</p>
                                    <p><strong>Seller ID:</strong> {product.sellerId}</p>
                                    <p><strong>In Stock:</strong> {product.outOfStock ? 'No' : 'Yes'}</p>
                                    <p><strong>Currency:</strong> {product.currency}</p>
                                    <p><strong>Stock:</strong> {product.stock}</p>
                                    <p><strong>Brand Name:</strong> {product.brandName}</p>
                                    <p><strong>Bonus Offer Flag:</strong> {product.bonusOfferFlag}</p>
                                    <p><strong>CPS Commission Rate:</strong> {product.cpsCommissionRate}</p>
                                    <p><strong>Brand ID:</strong> {product.brandId}</p>
                                    <p><strong>Total Commission Rate:</strong> {product.totalCommissionRate}</p>
                                    <p><strong>Total Commission Amount:</strong> {product.totalCommissionAmount}</p>
                                    <p><strong>Seller Name:</strong> {product.sellerName}</p>
                                    <p><strong>Discount Price:</strong> {product.discountPrice}</p>
                                    <p><strong>CPS Commission Amount:</strong> {product.cpsCommissionAmount}</p>
                                    <p><strong>Sales (7 Days):</strong> {product.sales7d}</p>
                                    <div className="link-section">
                                        <input type="text" value={productLinks[product.productId] || ''} readOnly className="link-input" />
                                        <button
                                            onClick={() => handleCopyLink(productLinks[product.productId])}
                                            className="copy-link-button"
                                        >
                                            Copy Tracking Link
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            {popup.show && (
                <div className="popup-overlay" onClick={() => setPopup({ show: false, content: null })}>
                    <div className="popup" onClick={e => e.stopPropagation()}>
                        {popup.content}
                    </div>
                </div>
            )}
        </div>
    );
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination-container">
            <button
                className="pagination-button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className="pagination-button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default ProductFeed;
