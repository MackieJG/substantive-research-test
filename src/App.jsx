import { useEffect, useState } from 'react'
import { productInfo, currencyInfo } from "./apis/api.jsx";
import { convertProductToEUR } from "./currency/currency.jsx"
import ProductList from './components/productList.jsx';


function App() {

  const [currencyData, setCurrencyData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [convertedProducts, setConvertedProducts] = useState([]);
  
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
    </>
  )
}

export default App
