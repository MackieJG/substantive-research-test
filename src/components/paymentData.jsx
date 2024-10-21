import { extractYear } from '../currency/currency.jsx';


export const groupPaymentsByProduct = (products) => {
    const productMap = {};

    products.forEach(product => {
        const year = extractYear(product.start_date);

        if (!productMap[product.product_name]) {
            productMap[product.product_name] = [];
        }

        productMap[product.product_name].push({
            year,
            payment: product.paymentEUR
        });
    });

    return Object.entries(productMap)
        .filter(([, payments]) => payments.length > 1)
        .map(([productName, payments]) => ({
            productName,
            payments: payments.sort((a, b) => a.year - b.year)
    }));
};