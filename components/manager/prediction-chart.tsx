import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const chartData: DataPoint[] = [
    { week: 45, estimatedUsableProducts: 186, estimatedUsableProductsPerBatch: 0.951 },
    { week: 46, estimatedUsableProducts: 206, estimatedUsableProductsPerBatch: 0.96 },
    { week: 47, estimatedUsableProducts: 231, estimatedUsableProductsPerBatch: 0.982 },
    { week: 48, estimatedUsableProducts: 208, estimatedUsableProductsPerBatch: 0.964 },
    { week: 49, estimatedUsableProducts: 222, estimatedUsableProductsPerBatch: 0.973 },
    { week: 50, estimatedUsableProducts: 249, estimatedUsableProductsPerBatch: 0.99 },
];

interface DataPoint {
    week: number;
    estimatedUsableProducts: number;
    estimatedUsableProductsPerBatch: number;
}

const calculateDomain = (dataKey: keyof DataPoint, offsetPercentage = 0.1) => {
    const values = chartData.map((item) => item[dataKey]);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue;
    const offset = range * offsetPercentage;

    const roundingFactor = dataKey === 'estimatedUsableProducts' ? 10 : 0.1;
    const roundedMin = Math.floor((minValue - offset) / roundingFactor) * roundingFactor;
    const roundedMax = Math.ceil((maxValue + offset) / roundingFactor) * roundingFactor;

    return [roundedMin, roundedMax];
};

const tooltipFormatter = (value: number, name: string) => {
    if (name === 'estimatedUsableProductsPerBatch') {
        return [`${(value * 100).toFixed(1)}%`, 'Usable Products per Batch'];
    }
    return [value, 'Usable Products'];
};

export function PredictionChart() {
    return (
        <div className="h-56 text-secondary-foreground">
            <ResponsiveContainer
                width="100%"
                height="100%">
                <ComposedChart data={chartData}>
                    <CartesianGrid horizontal={false} />
                    <XAxis dataKey="week" />
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        domain={calculateDomain('estimatedUsableProducts')}
                        label={{ value: 'Usable Products', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={calculateDomain('estimatedUsableProductsPerBatch')}
                        label={{ value: 'Usable Products per Batch', angle: -90, position: 'insideRight' }}
                    />
                    <Tooltip formatter={tooltipFormatter} />

                    <Bar
                        yAxisId="left"
                        dataKey="estimatedUsableProducts"
                        fill="var(--secondary)"
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="estimatedUsableProductsPerBatch"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
