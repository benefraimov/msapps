const express = require("express");
const app = express();
const cors = require("cors");

// using express.json() to able json transferring
app.use(express.json());
// using cors to able client call our api
app.use(cors());

const itemsRouter = require("./routes/Items");

app.use("/api/pictures", itemsRouter);

// Start the server
app.listen(4000, () => {
    console.log("Server listening on port 4000");
});
