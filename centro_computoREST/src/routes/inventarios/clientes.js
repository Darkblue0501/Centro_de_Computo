const { Router } = require("express");
const router = new Router();
//muestra todos los registros existentes
router.get("/buscar/todas", (req, res) => {
  let consulta = `
  Select * from Clientes
  `;
  req.getConnection((err, conn) => {
    conn.query(consulta, (err, datos) => {
      if (err) {
        res.json(err);
      }
      res.json(datos);
    });
  });
});

router.post("/agregar", (req, res) => {
  let data = req.body;
  let consulta = `
    INSERT INTO Clientes(nombre,ocupacion,facultad,telefono,apellido)
    VALUES ("${data.nombre}","${data.ocupacion}","${data.facultad}","${data.telefono}","${data.apellido}")
    `;
  req.getConnection((err, conn) => {
    conn.query(consulta, (err, dat) => {
      if (err) {
        console.log(err);
        res.json(JSON.stringify({ mensaje: "no agregado" }));
      }
      console.log("usuario agregado correctamente");
      res.json(JSON.stringify({ mensaje: "agregado correctamente" }));
    });
  });
});

module.exports = router;
