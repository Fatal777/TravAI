import { useState } from "react";
import { Upload } from "@progress/kendo-react-upload";
import { Notification } from "@progress/kendo-react-notification";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";

const MoodBoard = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock image URLs for demo
    const mockImages = [
        "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Mountain",
        "https://via.placeholder.com/300x200/9333EA/FFFFFF?text=Beach",
        "https://via.placeholder.com/300x200/10B981/FFFFFF?text=City"
    ];

    return (
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Visual Inspiration Board</h3>

            {/* Demo-only Upload component */}
            <Upload
                batch={false}
                multiple={true}
                defaultFiles={[]}
                saveUrl="https://demos.telerik.com/kendo-ui/service-v4/upload/save"
                removeUrl="https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
                onSuccess={() => {
                    // Add mock image on "upload"
                    setUploadedFiles(prev => [...prev, {
                        uid: Date.now(),
                        name: "demo-image.jpg",
                        previewUrl: mockImages[uploadedFiles.length % 3]
                    }]);
                    setShowSuccess(true);
                }}
                className="mb-6"
            />

            <GridLayout
                cols={3}
                gap={{ rows: 16, cols: 16 }}
                className="min-h-[300px]"
            >
                {uploadedFiles.map((file, index) => (
                    <GridLayoutItem key={index} colSpan={1} rowSpan={1}>
                        <div className="h-full w-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <img
                                src={file.previewUrl}
                                alt={`Inspiration ${index + 1}`}
                                className="object-cover h-full w-full"
                            />
                        </div>
                    </GridLayoutItem>
                ))}
            </GridLayout>

            {showSuccess && (
                <Notification
                    type={{ style: 'success', icon: true }}
                    closable
                    onClose={() => setShowSuccess(false)}
                    className="mt-4"
                >
                    Demo upload successful! (Mock implementation)
                </Notification>
            )}
        </div>
    );
};

export default MoodBoard;