import express from "express";
import connectDB from "./mongoDB/db.js";
import userRoutes from "./routes/userRoutes.js";
import demandeRoutes from "./routes/demandeRoutes.js";
import cors from "cors";

connectDB();

var whitelist = [];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) === -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/demande", demandeRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
