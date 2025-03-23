import { Chart, ChartSeries, ChartSeriesItem } from "@progress/kendo-react-charts";

const BudgetChart = ({ budget }) => {
    const data = [
        { category: "Transport", value: budget.transport },
        { category: "Accommodation", value: budget.accommodation },
        { category: "Activities", value: budget.activities },
        { category: "Food", value: budget.food }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Budget Breakdown</h3>
            <Chart style={{ height: "300px" }}>
                <ChartSeries>
                    <ChartSeriesItem
                        type="pie"
                        data={data}
                        field="value"
                        categoryField="category"
                        labels={{ visible: true }}
                    />
                </ChartSeries>
            </Chart>
        </div>
    );
};

export default BudgetChart;