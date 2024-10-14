import { useEffect, useState } from 'react'

function App() {

  const apiUrl = "https://substantive.pythonanywhere.com";
  const endPoint = "/product_benchmarks";
  const Headers = {
    "auth-key" : "590e3e17b6a26a8fcda726e2a91520e476e2c894",
  };
  const [productBenchmarks, setProductBenchmarks] = useState();

  const getProductBenchmarks = () => {
    const url = apiUrl + endPoint;
    fetch(url, {
      method: "GET",
      headers: Headers
    })
      .then((response) => {
        if(!response.ok) {
          throw new Error("Network Response was not Ok");
        }
        return response.json();
      })
      .then((data) => {
        setProductBenchmarks(data);
      })
      .catch((error) => {
        console.error("Error:", error)
      });
  };

  useEffect(() => {
    getProductBenchmarks();
  }, []);

  return (
    <>
     <h1 class="text-red-500">Hello World</h1>
     <div>
      {productBenchmarks ? (
        <pre>{JSON.stringify(productBenchmarks, null, 2)}</pre>
      ) : (
        <p>loading...</p>
      )}
     </div>
    </>
  )
}

export default App
