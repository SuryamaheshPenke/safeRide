const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const testRoutes = require("./routes/test.routes");
const roleRoutes = require("./role/role.routes");
const companyRoutes = require("./company/company.routes");
const authRoutes = require("./auth/auth.routes");
const employeeRoutes = require("./employee/employee.routes");
const vehicleRoutes = require("./vehicle/vehicle.routes");
const locationRoutes = require("./location/location.routes");
const driverRoutes = require("./driver/driver.routes");
const tripRoutes = require("./trip/trip.routes");
const tripEmployeeRoutes = require("./tripEmployee/tripEmployee.routes");
const driverTripRoutes = require("./driverTrip/driverTrip.routes");
const tripLocationRoutes = require("./tripLocation/tripLocation.routes");
const dashboardRoutes = require("./dashboard/dashboard.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173"
];

app.use(
    cors({
        origin: function (origin, callback) {

            // Allow requests without an Origin header
            // such as Postman or server-to-server requests
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error("CORS policy: Origin not allowed.")
            );
        },

        credentials: true
    })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(
    express.json({
        limit: "1mb"
    })
);
app.disable("x-powered-by");
app.use("/api/test", testRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/trip-employees", tripEmployeeRoutes);
app.use("/api/driver/trips", driverTripRoutes);
app.use("/api/trip-locations", tripLocationRoutes);
app.use("/api/dashboard", dashboardRoutes);

// const routes = require("./routes");

// app.use("/api", routes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to SafeRide API 🚖"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});


app.use(errorMiddleware);


module.exports = app;