
const ProductList = ({ products }) => {
    return (
        <div>
            <h2>Product List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Provider</th>
                        <th>Product Name</th>
                        <th>Payment (EUR)</th>
                        <th>Benchmark (EUR)</th>
                        <th>Difference (Benchmark - Payment)</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        const difference = product.benchmarkEUR - product.paymentEUR;
                        return (
                        <tr key={products.id}>
                            <td>{product.provider_name}</td>
                            <td>{product.product_name}</td>
                            <td>{product.paymentEUR.toFixed(2)}</td>
                            <td>{product.benchmarkEUR.toFixed(2)}</td>
                            <td>{difference.toFixed(2)}</td>
                            </tr>
                        );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;