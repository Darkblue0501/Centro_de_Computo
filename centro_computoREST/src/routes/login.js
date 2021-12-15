const { Router } = require("express");
const router = new Router();

router.post("/inicio-sesion", (req, res) => {
  const {usuario, contraseña} = req.body;
  let consulta = `select * from Usuarios where usuario= "${usuario}"`;
  req.getConnection((err, conn) => {
    conn.query(consulta, (err, datos) => {
      if (err) {
        res.json(err);
      }
      let inicioDatos;
      if (datos[0].contraseña == contraseña) {
        inicioDatos = [
          {
            session: "true",
            idUsuario: datos[0].idUsuario,
            usuario: datos[0].usuario,
            nombre: datos[0].nombre,
            apellido: datos[0].apellido,
            tipoUsuario: datos[0].tipoUsuario,
          },
        ];
      } else {
        inicioDatos = [
          {
            session: "false",
            usuario: datos[0].usuario,
          },
        ];
      }
      res.json(inicioDatos);
    });
  });
});

module.exports = router;
