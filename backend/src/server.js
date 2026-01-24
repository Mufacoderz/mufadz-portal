const express = require("express");
const cors = require("cors");

const registerRoute = require("./routes/register.route");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/register", registerRoute);

app.listen(5000, () => {
    console.log("Server jalan di http://localhost:5000");
});
