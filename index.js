const express = require("express");
const path = require("path");
const teacherLogin = require('./routes/auth-route.js')
const teachersRoute = require("./routes/teachers-route.js");
const groupsRoute = require("./routes/groups-routes.js");
const subjectsRoute = require("./routes/subjects-routes.js");
const studentsRoute = require("./routes/students-routes.js");
const coordinadorRoute = require('./routes/coordinador-route.js')
const cordinatorsRoute = require("./routes/administrator-cords-routes.js");
const viewsRoute = require("./routes/view-routes.js");
const { escape } = require("querystring");
const port = process.env.PORT || 4000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use('/api/login', teacherLogin);

app.use("/api/teachers", teachersRoute);

app.use("/api/asignaturas", subjectsRoute);

app.use("/api/students", studentsRoute);

app.use("/api/groups", groupsRoute);

app.use('/api/coordinador', coordinadorRoute)

app.use("/api/administrator", cordinatorsRoute);

app.use("/api/view", viewsRoute);

app.listen(port, () => console.log("running on port" + port));
