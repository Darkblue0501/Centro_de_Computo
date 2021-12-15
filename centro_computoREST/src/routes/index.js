const { Router } = require("express");
const router = new Router();

router.get("/actividades-proximas", (req, res) => {
  let consulta = `select Actividades.idActividad, Actividades.salon, date_format(Actividades.fechaInicio, "%Y-%m-%d") as fechaInicio,
	Actividades.horaInicio, date_format(Actividades.fechaTermino, "%Y-%m-%d") as fechaTermino,
    Actividades.horaTermino, Actividades.observaciones,
	responsable, autorizador
    From Actividades 
	inner join (
		select Actividades_Clientes.idActividad,
        concat(Clientes.nombre, " ", Clientes.apellido) as responsable,
        Clientes.idCliente 
        from Clientes 
        inner join Actividades_Clientes on Clientes.idCliente = Actividades_Clientes.idCliente) 
        as nombreClientes on Actividades.idActividad = nombreClientes.idActividad
    inner join (
		select Actividades_Usuarios.idActividad,
        concat(Usuarios.nombre, " ", Usuarios.apellido) as autorizador,
        Usuarios.idUsuario 
        from Usuarios 
        inner join Actividades_Usuarios on Usuarios.idUsuario = Actividades_Usuarios.idUsuario) 
        as nombreUsuarios on Actividades.idActividad = nombreUsuarios.idActividad
	where fechaInicio >= current_timestamp()
	order by fechaInicio
    `;
  req.getConnection((err, conn) => {
    conn.query(consulta, (err, datos) => {
      if (err) {
        res.json(err);
      }
      console.log(datos);
      res.json(datos);
    });
  });
});
router.get("/prestaciones-proximas", (req, res) => {
  let consulta = `
  select Prestaciones.idPrestacion, Prestaciones.nombreEquipo, Prestaciones.numeroEquipo, Prestaciones.fechaInicio,
	Prestaciones.horaInicio, Prestaciones.fechaTermino,
  Prestaciones.horaTermino, Prestaciones.observaciones,
	nombreResponsable, apellidoResponsable, nombreAutorizador, apellidoAutorizador
    From Prestaciones 
	  inner join (
		select Prestaciones_Clientes.idPrestacion,
        Clientes.nombre as nombreResponsable, Clientes.apellido as apellidoResponsable,
        Clientes.idCliente 
        from Clientes 
        inner join Prestaciones_Clientes on Clientes.idCliente = Prestaciones_Clientes.idCliente)
        as nombreClientes on Prestaciones.idPrestacion = nombreClientes.idPrestacion
    inner join (
		select Prestaciones_Usuarios.idPrestacion,
        Usuarios.nombre as nombreAutorizador, Usuarios.apellido as apellidoAutorizador,
        Usuarios.idUsuario 
        from Usuarios inner join Prestaciones_Usuarios on Usuarios.idUsuario = Prestaciones_Usuarios.idUsuario)
        as nombreUsuarios on Prestaciones.idPrestacion = nombreUsuarios.idPrestacion
	where fechaInicio >= current_timestamp()
	order by fechaInicio
  `;
  req.getConnection((err, conn) => {
    conn.query(consulta, (err, datos) => {
      if (err) {
        res.json(err);
      }
      console.log(datos);
      res.json(datos);
    });
  });
});
module.exports = router;
