import { Grid, GridColumn } from "@progress/kendo-react-grid";

const FlightOptions = ({ flights }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Available Flights</h3>
        <Grid data={flights}>
            <GridColumn field="airline" title="Airline" />
            <GridColumn field="departure" title="Departure" format="{0:HH:mm}" />
            <GridColumn field="price" title="Price" format="{0:c}" />
        </Grid>
    </div>
);

export default FlightOptions;