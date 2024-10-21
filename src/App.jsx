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
    <>
     <h1 className="text-red-500">Hello World</h1>
    <div>
      {currencyData.length > 0 && productData.length > 0 ? (
        <ProductList products={convertedProducts} />
      ) : (
        <p>Loading data...</p>
      )}
      </div>
      <div>
        <h2>Payment Trend Chart</h2>
        {chartData.length > 0 ? (
          chartData.map(product => (
            <div key={product.productName}>
              <h3>{product.productName}</h3>
              <PaymentTrendChart productData={product.payments} />
              </div>
          ))
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </>
  );
}

export default App;
