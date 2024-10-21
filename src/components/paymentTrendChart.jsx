import React from 'react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const PaymentTrendChart = ({ productData }) => {
    return (
        <div style={{ width: '100%', height: 300}}>
            <ResponsiveContainer>
                <LineChart
                data={productData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="year" />
                 <YAxis />
                 <Tooltip />
                 <Legend />
                 <Line
                    type="monotone"
                    dataKey="payment"
                    stroke="#8884d8"
                    activeDot={{ r: 8}}
                 />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PaymentTrendChart;