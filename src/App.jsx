import { useEffect, useState } from 'react'
import { productInfo, currencyInfo } from "./apis/api.jsx";

function App() {
  const [currencyData, setCurrencyData] = useState(null);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    
    const fetchCurrencyInfo = async () => {
      const data = await currencyInfo();
      setCurrencyData(data);
    };

    const fetchProductInfo = async () => {
      const data = await productInfo();
      setProductData(data)
    }


    fetchCurrencyInfo();
    fetchProductInfo();
  }, []);

  return (
    <>
     <h1 className="text-red-500">Hello World</h1>
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
