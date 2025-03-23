import { Grid } from "@progress/kendo-react-grid";
import { useState, useEffect } from "react";
import { useTrip } from "../../contexts/TripContext";

const BudgetGrid = () => {
    const { currentTrip, budgetItems, updateBudget } = useTrip();
    const [data, setData] = useState(budgetItems);

    useEffect(() => {
        setData(budgetItems);
    }, [budgetItems]);

    const handleRowUpdate = (e) => {
        const updatedData = data.map(item =>
            item.id === e.dataItem.id ? { ...item, [e.field]: e.value } : item
        );
        setData(updatedData);
        updateBudget(currentTrip.id, updatedData);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Budget Tracker</h3>
            <Grid
                data={data}
                style={{ height: '400px' }}
                className="k-dark"
                editable={{
                    enabled: true,
                    mode: "incell",
                    confirmation: true
                }}
                onItemChange={handleRowUpdate}
                columns={[
                    { field: 'category', title: 'Category', width: '150px' },
                    {
                        field: 'allocated',
                        title: 'Allocated ($)',
                        format: '{0:c}',
                        editor: 'numeric'
                    },
                    {
                        field: 'spent',
                        title: 'Spent ($)',
                        format: '{0:c}',
                        editor: 'numeric'
                    },
                    {
                        field: 'remaining',
                        title: 'Remaining ($)',
                        format: '{0:c}',
                        editable: false,
                        cell: props => (
                            <td>{props.dataItem.allocated - props.dataItem.spent}</td>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default BudgetGrid;