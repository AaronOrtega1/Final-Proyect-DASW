const express = require("express");
const path = require("path");
const teacherLogin = require("./routes/auth-route.js");
const groupsRoute = require("./routes/groups-routes.js");
const subjectsRoute = require("./routes/subjects-routes.js");
const coordinadorRoute = require("./routes/coordinador-route.js");
//const cordinatorsRoute = require("./routes/administrator-cords-routes.js");
const viewsRoute = require("./routes/view-routes.js");
const evidenceRoute = require("./routes/evidence-routes.js");
const commentRoute = require("./routes/comments-route.js");
const usersRoute = require("./routes/users-route.js");
const cors = require("cors");
const { escape } = require("querystring");
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/html")));

app.use(express.json());

app.use("/api/login", teacherLogin);

app.use("/api/asignaturas", subjectsRoute);

app.use("/api/users", usersRoute);

app.use("/api/groups", groupsRoute);

app.use("/api/coordinador", coordinadorRoute);

//app.use("/api/administrator", cordinatorsRoute);

app.use("/api/view", viewsRoute);

app.use("/api/evidence", evidenceRoute);

app.use("/api/comments", commentRoute);

app.listen(port, () => console.log("running on port" + port));
