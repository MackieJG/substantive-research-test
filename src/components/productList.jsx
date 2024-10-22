import { extractYear } from "../currency/currency";

const ProductList = ({ products }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-center mb-4">Product List</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-grey-100">
                        <th className="p-4 text-left border border-grey-300">Provider</th>
                        <th className="p-4 text-left border border-grey-300">Product Name</th>
                        <th className="p-4 text-left border border-grey-300">Year</th>
                        <th className="p-4 text-left border border-grey-300">Payment (EUR)</th>
                        <th className="p-4 text-left border border-grey-300">Benchmark (EUR)</th>
                        <th className="p-4 text-left border border-grey-300">Difference </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        const difference = product.benchmarkEUR - product.paymentEUR;
                        const year = extractYear(product.start_date);
                        const differenceColor = difference >= 0 ? "text-green-500" : "text-red-500";
                        return (
                        <tr key={products.id} className="border-t border-grey-300">
                            <td className="p-4 text-left border border-grey-300">{product.provider_name}</td>
                            <td className="p-4 text-left border border-grey-300">{product.product_name}</td>
                            <td className="p-4 text-left border border-grey-300">{year}</td>
                            <td className="p-4 text-left border border-grey-300">{product.paymentEUR.toFixed(2)}</td>
                            <td className="p-4 text-left border border-grey-300">{product.benchmarkEUR.toFixed(2)}</td>
                            <td className={`p-4 text-left border border-grey-300 ${differenceColor}`}>{difference.toFixed(2)}</td>
                            </tr>
                        );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;