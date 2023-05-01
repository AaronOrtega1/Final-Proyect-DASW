const express = require("express");
const path = require("path");
const teachersRoute = require("./routes/teachers-route.js");
const { escape } = require("querystring");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/api/teachers", teachersRoute);

app.listen(port, () => console.log("running on port" + port));
