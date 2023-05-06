const express = require("express");
const path = require("path");
const teachersRoute = require("./routes/teachers-route.js");
const groupsRoute = require("./routes/groups-routes.js");
const subjectsRoute = require("./routes/subjects-routes.js");
const studentsRoute = require("./routes/students-routes.js");
const coordinadorRoute = require('./routes/coordinador-route.js')
const { escape } = require("querystring");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/api/teachers", teachersRoute);

app.use("/api/asignaturas", subjectsRoute);

app.use("/api/students", studentsRoute);

app.use("/api/groups", groupsRoute);

app.use('/api/coordinador', coordinadorRoute)

app.listen(port, () => console.log("running on port" + port));
