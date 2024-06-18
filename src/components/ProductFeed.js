import React, { useEffect, useState } from 'react';

function ProductFeed() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/product-feed')
            .then(response => response.json())
            .then(data => setProducts(data.products));
    }, []);

    return (
        <div>
            <h2>Product Feed</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Sales (7 days)</th>
                        <th>Stock</th>
                        <th>Currency</th>
                        <th>Commission Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.categoryL1}</td>
                            <td>{product.sales7d}</td>
                            <td>{product.stock}</td>
                            <td>{product.currency}</td>
                            <td>{product.totalCommissionRate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductFeed;
