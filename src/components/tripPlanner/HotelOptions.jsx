import { Grid, GridColumn } from "@progress/kendo-react-grid";

const HotelOptions = ({ hotels }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Available Hotels</h3>
        <Grid data={hotels}>
            <GridColumn field="name" title="Hotel" />
            <GridColumn field="rating" title="Stars" />
            <GridColumn field="price" title="Nightly Rate" format="{0:c}" />
        </Grid>
    </div>
);

export default HotelOptions;