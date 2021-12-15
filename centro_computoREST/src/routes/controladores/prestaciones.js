const { Router } = require("express");
const router = new Router();
//muestra todos los registros existentes
router.get("/buscar/todas", (req, res) => {
  let consulta = `
    select Prestaciones.idPrestacion, Prestaciones.nombreEquipo, Prestaciones.numeroEquipo, date_format(Prestaciones.fechaInicio, "%Y-%m-%d") as fechaInicio,
	time_format(Prestaciones.horaInicio, "%H:%i") as horaInicio, date_format(Prestaciones.fechaTermino, "%Y-%m-%d") as fechaTermino,
    time_format(Prestaciones.horaTermino, "%H:%i") as horaTermino, Prestaciones.observaciones,
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
	order by fechaInicio
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
//Busqueda por el nombre y apellido del responsable...
router.post("/buscar/nombre-responsable", (req, res) => {
  const { nombre, apellido } = req.body;
  let consulta = `
    select Prestaciones.idPrestacion, Prestaciones.nombreEquipo, Prestaciones.numeroEquipo, date_format(Prestaciones.fechaInicio, "%Y-%m-%d") as fechaInicio,
	time_format(Prestaciones.horaInicio, "%H-%i") as horaInicio, date_format(Prestaciones.fechaTermino, "%Y-%m-%d") as fechaTermino,
    time_format(Prestaciones.horaTermino, "%H-%i") as horaTermino, Prestaciones.observaciones,
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
    where nombreResponsable like "%${nombre}%" and apellidoResponsable like"${apellido}%"
	order by fechaInicio
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
//busqueda por nombre y apellido del autorizador...
router.post("/buscar/nombre-autorizador", (req, res) => {
  const { nombre, apellido } = req.body;
  let consulta = `
  select Prestaciones.idPrestacion, Prestaciones.nombreEquipo, Prestaciones.numeroEquipo, date_format(Prestaciones.fechaInicio, "%Y-%m-%d") as fechaInicio,
	time_format(Prestaciones.horaInicio, "%H-%i") as horaInicio, date_format(Prestaciones.fechaTermino, "%Y-%m-%d") as fechaTermino,
    time_format(Prestaciones.horaTermino, "%H-%i") as horaTermino, Prestaciones.observaciones,
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
    where nombreAutorizador like "%${nombre}%" and apellidoResponsable like"${apellido}%"
	order by fechaInicio
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
//busqueda por dia de la actividad...
router.post("/buscar/dia-actividad", (req, res) => {
  const { dia } = req.body;
  let consulta = `
  select Prestaciones.idPrestacion, Prestaciones.nombreEquipo, Prestaciones.numeroEquipo, date_format(Prestaciones.fechaInicio, "%Y-%m-%d") as fechaInicio,
	time_format(Prestaciones.horaInicio, "%H-%i") as horaInicio, date_format(Prestaciones.fechaTermino, "%Y-%m-%d") as fechaTermino,
    time_format(Prestaciones.horaTermino, "%H-%i") as horaTermino, Prestaciones.observaciones,
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
    where fechaInicio = "${dia}"
    order by fechaInicio
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
//busqueda por intervalo de dias de las actividades...
router.post("/buscar/semana-actividad", (req, res) => {
  const { fechaInicio, fechaTermino } = req.body;
  let consulta = `
  select Prestaciones.idPrestacion, Prestaciones.nombreEquipo, Prestaciones.numeroEquipo, date_format(Prestaciones.fechaInicio, "%Y-%m-%d") as fechaInicio,
	time_format(Prestaciones.horaInicio, "%H:%i") as horaInicio, date_format(Prestaciones.fechaTermino, "%Y-%m-%d") as fechaTermino,
    time_format(Prestaciones.horaTermino, "%H:%i") as horaTermino, Prestaciones.observaciones,
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
    where fechaInicio BETWEEN "${fechaInicio}" and "${fechaTermino}"
	order by fechaInicio
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



module.exports = router;
