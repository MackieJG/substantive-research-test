import { useEffect, useState } from 'react'
import { productInfo, currencyInfo } from "./apis/api.jsx";
import { convertProductToEUR } from "./currency/currency.jsx"


function App() {
  const [currencyData, setCurrencyData] = useState([]);
  const [productData, setProductData] = useState([]);

  
 


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

  const handleTestConversion = () => {
    if (currencyData.length > 0 && productData.length > 0) {
      const productToTest = productData[1];
      const convertedProduct = convertProductToEUR(productToTest, currencyData);

      console.log("Original Product: ", productToTest);
      console.log("Converted Product: ", convertedProduct);
    } else {
      console.log("Data is still loading...");
    } 
  };

  return (
    <>
     <h1 className="text-red-500">Hello World</h1>
     <div>
      <h1>Currency Conversion Test</h1>
      <button onClick={handleTestConversion}>Test Conversion</button>
     </div>
     <div>
      {currencyData ? (
        <pre>{JSON.stringify(currencyData, null, 2)}</pre>
      ) : (
        <p>loading...</p>
      )}
      {productData ? (
        <pre>{JSON.stringify(productData, null, 2)}</pre>
      ) : (
        <p>loading...</p>
      )}
     </div>
    </>
  )
}

export default App
