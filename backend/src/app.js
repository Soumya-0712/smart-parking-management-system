import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import express from "express";
import errorHandler from "./middleware/error.middleware.js";
import testRouter from "./routes/test.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import parkingLotRoutes from "./routes/parking-lot.routes.js";
import parkingSlotRoutes from "./routes/parking-slot.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import dashBoardRoutes from "./routes/dashboard.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Smart Parking Backend Running 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/test", testRouter);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/parking-lots", parkingLotRoutes);

app.use("/api/v1/parking-slots", parkingSlotRoutes);

app.use("/api/v1/vehicle", vehicleRoutes);

app.use("/api/v1/bookings", bookingRoutes);

app.use("/api/v1/payments", paymentRoutes);

app.use("/api/v1/dashboard", dashBoardRoutes);

app.use("/api/v1/availability", availabilityRoutes);

app.use(errorHandler);

export default app;
