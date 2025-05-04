import React from 'react';
import { Line, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export function LineChart({ data, categories, index, colors = ['blue', 'green', 'purple', 'orange'], valueFormatter, yAxisWidth = 40, className }) {
    // Create a formatter function that matches the expected type for Recharts
    const formatTickValue = (value) => {
        if (valueFormatter && typeof value === 'number') {
            return valueFormatter(value);
        }
        return `${value}`;
    };
    // Tooltip formatter
    const formatTooltipValue = (value, name) => {
        if (valueFormatter && typeof value === 'number') {
            return [valueFormatter(value, name), name];
        }
        return [`${value}`, name];
    };
    return (<ResponsiveContainer width="100%" height={300} className={className}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey={index}/>
        <YAxis width={yAxisWidth} tickFormatter={formatTickValue}/>
        <Tooltip formatter={formatTooltipValue}/>
        <Legend />
        {categories.map((category, idx) => (<Line key={category} type="monotone" dataKey={category} stroke={colors[idx % colors.length]} activeDot={{ r: 8 }}/>))}
      </RechartsLineChart>
    </ResponsiveContainer>);
}
