
const apiUrl = "https://substantive.pythonanywhere.com";
const productEndPoint = "/product_benchmarks";
const currencyEndPoint = "/exchange_rates";
const Headers = {
    "auth-key" : "590e3e17b6a26a8fcda726e2a91520e476e2c894",
  };

export const productInfo = async () => {
    const url = apiUrl + productEndPoint;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: Headers
        });
        
        if(!response.ok) {
            throw new Error("Network Response was not Ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const currencyInfo = async () => {
    const url = apiUrl + currencyEndPoint;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: Headers
        });
        if(!response.ok) {
            throw new Error("Network Response was not Ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};