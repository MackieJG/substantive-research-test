import { useEffect, useState } from 'react'
import { productInfo, currencyInfo } from "./apis/api.jsx";
import { convertProductToEUR } from "./currency/currency.jsx"
import ProductList from './components/productList.jsx';
import PaymentTrendChart from './components/paymentTrendChart.jsx';
import { groupPaymentsByProduct } from './components/paymentData.jsx';


function App() {

  const [currencyData, setCurrencyData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [convertedProducts, setConvertedProducts] = useState([]);
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    
    const fetchCurrencyInfo = async () => {
      const data = await currencyInfo();
      setCurrencyData(data.exchange_rates);
    };

    const fetchProductInfo = async () => {
      const data = await productInfo();
      setProductData(data.product_benchmarks);
    };

    fetchCurrencyInfo();
    fetchProductInfo();
  }, []);

  useEffect(() => {
    if (currencyData.length > 0 && productData.length > 0) {
      const converted = productData.map(product => convertProductToEUR(product, currencyData));
      setConvertedProducts(converted);
    }
  }, [currencyData, productData]);

  useEffect(() => {
    if(convertedProducts.length > 0) {
      const groupedData = groupPaymentsByProduct(convertedProducts);
      setChartData(groupedData);
    }
  }, [convertedProducts])

  return (
    
    <div>
      {currencyData.length > 0 && productData.length > 0 ? (
        <ProductList products={convertedProducts} />
      ) : (
        <p>Loading data...</p>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-bold text-center pb-6">Payment Trend Chart</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chartData.length > 0 ? (
          chartData.map(product => (
            <div key={product.productName} className="border p-4 shadow-lg rounded min-w-[400px] ml-2">
              <h3 className="text-lg font-semibold text-center mb-2 mt-2">{product.productName}</h3>
              <PaymentTrendChart productData={product.payments} />
              </div>
          ))
        ) : (
          <p>Loading chart data...</p>
        )}
        </div>
      </div>
      </div>
  );
}

export default App;
