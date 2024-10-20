
const ProductList = ({ products }) => {
    return (
        <div>
            <h2>Product List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Provider</th>
                        <th>Product Name</th>
                        <th>Original Payment</th>
                        <th>Converted Payment</th>
                        <th>Original Benchmark</th>
                        <th>Converted Benchmark (EUR)</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={products.id}>
                            <td>{product.provider_name}</td>
                            <td>{product.product_name}</td>
                            <td>{product.payment}</td>
                            <td>{product.paymentEUR.toFixed(2)}</td>
                            <td>{product.benchmark}</td>
                            <td>{product.benchmarkEUR.toFixed(2)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;