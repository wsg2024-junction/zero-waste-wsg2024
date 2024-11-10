import { useTranslations } from 'next-intl';
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
    { week: 45, estimatedUsableProducts: 186, estimatedUsableProductsPerBatch: 95.1 },
    { week: 46, estimatedUsableProducts: 206, estimatedUsableProductsPerBatch: 96.0 },
    { week: 47, estimatedUsableProducts: 231, estimatedUsableProductsPerBatch: 98.2 },
    { week: 48, estimatedUsableProducts: 208, estimatedUsableProductsPerBatch: 96.4 },
    { week: 49, estimatedUsableProducts: 222, estimatedUsableProductsPerBatch: 97.3 },
    { week: 50, estimatedUsableProducts: 249, estimatedUsableProductsPerBatch: 99.0 },
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

    const roundedMin = Math.floor((minValue - offset) / 10) * 10;
    const roundedMax = Math.ceil((maxValue + offset) / 10) * 10;

    return [roundedMin, roundedMax];
};

export function PredictionChart() {
    const t = useTranslations();
    const tooltipFormatter = (value: number, name: string) => {
        if (name === 'estimatedUsableProductsPerBatch') {
            return [`${value.toFixed(1)} %`, t('managerApp.predictionChart.usableProductsPerBatch')];
        }
        return [value, t('managerApp.predictionChart.totalUsableProducts')];
    };

    return (
        <div className="h-56 text-secondary-foreground">
            <ResponsiveContainer>
                <ComposedChart data={chartData}>
                    <CartesianGrid horizontal={false} />
                    <XAxis
                        dataKey="week"
                        label={{ value: 'Calendar Week' }}
                    />
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        domain={calculateDomain('estimatedUsableProducts')}
                        label={{
                            value: 'Total Usable Products',
                            angle: -90,
                            dx: -25,
                        }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={calculateDomain('estimatedUsableProductsPerBatch')}
                        unit="%"
                        label={{
                            value: 'Usable Products',
                            angle: 90,
                            dx: 25,
                        }}
                    />
                    <Tooltip
                        formatter={tooltipFormatter}
                        separator=": "
                    />

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
