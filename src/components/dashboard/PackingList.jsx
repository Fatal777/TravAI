import { ListBox } from "@progress/kendo-react-listbox"; // Only ListBox is imported
import { useContext, useState } from "react";
import { TripContext } from "../../contexts/TripContext";

const PackingList = () => {
    const { packingList, currentTrip, updatePackingList } = useContext(TripContext);
    const [newItem, setNewItem] = useState("");

    const safePackingList = Array.isArray(packingList) ? packingList : [];

    const handleAddItem = () => {
        if (newItem.trim()) {
            const updatedItems = [...safePackingList, {
                id: Date.now(),
                item: newItem.trim(),
                packed: false
            }];
            updatePackingList(currentTrip.id, updatedItems);
            setNewItem("");
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Packing List</h3>

            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Add new item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className="flex-1 p-2 bg-gray-700 text-white rounded"
                />
                <button
                    onClick={handleAddItem}
                    className="bg-brand dark:bg-brandDark text-white px-4 py-2 rounded"
                >
                    Add Item
                </button>
            </div>

            <ListBox
                data={safePackingList}
                style={{ height: "400px" }}
                className="k-dark"
                textField="item"
                onItemClick={(e) => {
                    const updated = safePackingList.map(item =>
                        item.id === e.dataItem.id ? { ...item, packed: !item.packed } : item
                    );
                    updatePackingList(currentTrip.id, updated);
                }}
            >
                {(item) => (
                    // Use ListBox.Item instead of ListBoxItem
                    <ListBox.Item
                        className={`${item.packed ? 'line-through text-gray-400' : 'text-white'}`}
                    >
                        {item.item}
                    </ListBox.Item>
                )}
            </ListBox>
        </div>
    );
};

export default PackingList;