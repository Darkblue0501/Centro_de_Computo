const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const cors = require("cors");
// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "ledmch13",
      port: 3306,
      database: "centro_computo",
    },
    "single"
  )
);
app.use(express.urlencoded({ extended: false }));
// routes
app.use("/rest/index", require("./routes/index"));
app.use("/rest/login", require("./routes/login"));
app.use(
  "/rest/controladores/actividades",
  require("./routes/controladores/actividades")
);
app.use(
  "/rest/controladores/prestaciones",
  require("./routes/controladores/prestaciones")
);

app.use("/rest/inventarios/clientes", require("./routes/inventarios/clientes"));

app.use("/rest/inventarios/usuarios", require("./routes/inventarios/usuarios"));

// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
