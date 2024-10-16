// Logic component for converting one currency to euros //

export const extractYear = (dateString) => new Date(dateString).getFullYear();

export const convertToEur = (amount, fromCurrencyId, exchangeRates, year) => {
    const rate = exchangeRates.find(rate =>
        rate.from_currency_id === fromCurrencyId &&
        rate.to_currency_id === 3 &&
        rate.year === year
    );
    return rate ? amount * rate.exchange_rate : amount;     
};

export const convertProductToEUR = (product, exchangeRates)=> {
    const year = extractYear(product.start_date);
    const fromCurrencyId = product.currency.id;

    return {
        ...product,
        paymentEUR: convertToEur(product.payment, fromCurrencyId, exchangeRates, year),
        benchmarkEUR: convertToEur(product.benchmark, fromCurrencyId, exchangeRates, year),
    };
};
