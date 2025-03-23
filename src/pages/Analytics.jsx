import { Chart } from "@progress/kendo-react-charts";
import { Notification } from "@progress/kendo-react-notification";
import { Badge } from "@progress/kendo-react-indicators";

const Analytics = () => {
    // Dummy travel data
    const travelStats = {
        totalTrips: 24,
        averageDuration: "5.2 days",
        mostVisited: "Paris 🇫🇷",
        totalDistance: "12,456 km",
        favoriteTransport: "Flight ✈️",
        upcomingTrips: 3
    };

    // Bar chart data - Monthly trip distribution
    const barChartData = {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
            {
                name: 'Leisure Trips',
                data: [2, 3, 1, 4, 3, 2],
                color: '#3B82F6'
            },
            {
                name: 'Business Trips',
                data: [1, 2, 1, 1, 2, 3],
                color: '#10B981'
            },
            {
                name: 'Adventure Trips',
                data: [0, 1, 2, 1, 1, 0],
                color: '#F59E0B'
            }
        ]
    };

    // Pie chart data - Trip type distribution
    const pieChartData = [{
        category: 'Leisure',
        value: 56,
        color: '#3B82F6'
    }, {
        category: 'Business',
        value: 30,
        color: '#10B981'
    }, {
        category: 'Adventure',
        value: 14,
        color: '#F59E0B'
    }];

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-6">Travel Analytics Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart Section */}
                <div className="bg-gray-800 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="k-icon k-i-chart-bar mr-2"></span>
                        Monthly Trip Distribution
                    </h2>
                    <Chart
                        style={{ height: "400px" }}
                        series={barChartData.series.map(series => ({
                            type: "column",
                            data: series.data,
                            name: series.name,
                            color: series.color
                        }))}
                        categoryAxis={{ categories: barChartData.categories }}
                        theme="material-dark"
                    />
                </div>

                {/* Pie Chart Section */}
                <div className="bg-gray-800 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="k-icon k-i-pie-chart mr-2"></span>
                        Trip Type Distribution
                    </h2>
                    <Chart
                        style={{ height: "400px" }}
                        series={[{
                            type: "pie",
                            data: pieChartData,
                            field: "value",
                            categoryField: "category",
                            labels: {
                                visible: true,
                                background: "transparent",
                                position: "outsideEnd",
                                template: "#= category # - #= value#%"
                            }
                        }]}
                        legend={{ visible: false }}
                        theme="material-dark"
                    />
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="k-icon k-i-globe text-blue-400 text-2xl mr-2"></span>
                        <span className="text-gray-300">Total Trips</span>
                    </div>
                    <Badge themeColor="info" size="large">{travelStats.totalTrips}</Badge>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="k-icon k-i-clock text-green-400 text-2xl mr-2"></span>
                        <span className="text-gray-300">Avg. Duration</span>
                    </div>
                    <Badge themeColor="success" size="large">{travelStats.averageDuration}</Badge>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="k-icon k-i-marker-pin text-purple-400 text-2xl mr-2"></span>
                        <span className="text-gray-300">Most Visited</span>
                    </div>
                    <Badge themeColor="purple" size="large">{travelStats.mostVisited}</Badge>
                </div>
            </div>

            <Notification
                type={{ style: 'info', icon: true }}
                className="mt-4"
            >
                <div className="flex items-center">
                    <span className="k-icon k-i-information mr-2"></span>
                    Data updated: {new Date().toLocaleTimeString()} (Sample travel data)
                </div>
            </Notification>
        </div>
    );
};

export default Analytics;