import { ListView, SearchBox } from "@progress/kendo-react-listview";
import { Avatar } from "@progress/kendo-react-layout";
import { useState } from "react";

const CollaboratorsPanel = ({ collaborators, onAdd }) => {
    const [search, setSearch] = useState("");

    const filteredUsers = collaborators.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex gap-4 mb-6">
                <SearchBox
                    value={search}
                    onChange={(e) => setSearch(e.value)}
                    placeholder="Search collaborators..."
                    className="flex-1"
                />
                <button
                    onClick={onAdd}
                    className="bg-brand text-white px-4 py-2 rounded-lg"
                >
                    Add Collaborator
                </button>
            </div>

            <ListView
                data={filteredUsers}
                item={({ item }) => (
                    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Avatar shape="circle" size="medium">
                            <img src={item.avatar} alt={item.name} />
                        </Avatar>
                        <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.role}</p>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default CollaboratorsPanel;