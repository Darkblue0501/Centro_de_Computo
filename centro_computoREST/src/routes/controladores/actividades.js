const { Router } = require("express");
const router = new Router();
//muestra todos los registros existentes
router.get("/buscar/todas", (req, res) => {
  let consulta = `
  select Actividades.idActividad, Actividades.salon, date_format(Actividades.fechaInicio, "%Y-%m-%d") as fechaInicio,
	  time_format(Actividades.horaInicio, "%H:%i") as horaInicio, date_format(Actividades.fechaTermino, "%Y-%m-%d") as fechaTermino,
    time_format(Actividades.horaInicio, "%H:%i") as horaTermino, Actividades.observaciones,
	  nombreResponsable, apellidoResponsable, nombreAutorizador, apellidoAutorizador
    From Actividades 
	inner join (
		select Actividades_Clientes.idActividad,
        Clientes.nombre as nombreResponsable, Clientes.apellido as apellidoResponsable,
        Clientes.idCliente 
        from Clientes 
        inner join Actividades_Clientes on Clientes.idCliente = Actividades_Clientes.idCliente) 
        as nombreClientes on Actividades.idActividad = nombreClientes.idActividad
    inner join (
		select Actividades_Usuarios.idActividad,
        Usuarios.nombre as nombreAutorizador, Usuarios.apellido as apellidoAutorizador,
        Usuarios.idUsuario 
        from Usuarios 
        inner join Actividades_Usuarios on Usuarios.idUsuario = Actividades_Usuarios.idUsuario) 
        as nombreUsuarios on Actividades.idActividad = nombreUsuarios.idActividad
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
  let consulta = `select Actividades.idActividad, Actividades.salon, date_format(Actividades.fechaInicio, "%Y-%m-%d") as fechaInicio,
	Actividades.horaInicio, date_format(Actividades.fechaTermino, "%Y-%m-%d") as fechaTermino,
    Actividades.horaTermino, Actividades.observaciones,
	  nombreResponsable, apellidoResponsable, nombreAutorizador, apellidoAutorizador
    From Actividades 
	inner join (
		select Actividades_Clientes.idActividad,
        Clientes.nombre as nombreResponsable, Clientes.apellido as apellidoResponsable,
        Clientes.idCliente 
        from Clientes 
        inner join Actividades_Clientes on Clientes.idCliente = Actividades_Clientes.idCliente) 
        as nombreClientes on Actividades.idActividad = nombreClientes.idActividad
    inner join (
		select Actividades_Usuarios.idActividad,
        Usuarios.nombre as nombreAutorizador, Usuarios.apellido as apellidoAutorizador,
        Usuarios.idUsuario 
        from Usuarios 
        inner join Actividades_Usuarios on Usuarios.idUsuario = Actividades_Usuarios.idUsuario) 
        as nombreUsuarios on Actividades.idActividad = nombreUsuarios.idActividad
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
  let consulta = `select Actividades.idActividad, Actividades.salon, date_format(Actividades.fechaInicio, "%Y-%m-%d") as fechaInicio,
	Actividades.horaInicio, date_format(Actividades.fechaTermino, "%Y-%m-%d") as fechaTermino,
    Actividades.horaTermino, Actividades.observaciones,
	  nombreResponsable, apellidoResponsable, nombreAutorizador, apellidoAutorizador
    From Actividades 
	inner join (
		select Actividades_Clientes.idActividad,
        Clientes.nombre as nombreResponsable, Clientes.apellido as apellidoResponsable,
        Clientes.idCliente 
        from Clientes 
        inner join Actividades_Clientes on Clientes.idCliente = Actividades_Clientes.idCliente) 
        as nombreClientes on Actividades.idActividad = nombreClientes.idActividad
    inner join (
		select Actividades_Usuarios.idActividad,
        Usuarios.nombre as nombreAutorizador, Usuarios.apellido as apellidoAutorizador,
        Usuarios.idUsuario 
        from Usuarios 
        inner join Actividades_Usuarios on Usuarios.idUsuario = Actividades_Usuarios.idUsuario) 
        as nombreUsuarios on Actividades.idActividad = nombreUsuarios.idActividad
  where nombreAutorizador like "%${nombre}%" and apellidoAutorizador like "${apellido}%"
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
  let consulta = `select Actividades.idActividad, Actividades.salon, date_format(Actividades.fechaInicio, "%Y-%m-%d") as fechaInicio,
	Actividades.horaInicio, date_format(Actividades.fechaTermino, "%Y-%m-%d") as fechaTermino,
    Actividades.horaTermino, Actividades.observaciones,
	  nombreResponsable, apellidoResponsable, nombreAutorizador, apellidoAutorizador
    From Actividades 
	inner join (
		select Actividades_Clientes.idActividad,
        Clientes.nombre as nombreResponsable, Clientes.apellido as apellidoResponsable,
        Clientes.idCliente 
        from Clientes 
        inner join Actividades_Clientes on Clientes.idCliente = Actividades_Clientes.idCliente) 
        as nombreClientes on Actividades.idActividad = nombreClientes.idActividad
    inner join (
		select Actividades_Usuarios.idActividad,
        Usuarios.nombre as nombreAutorizador, Usuarios.apellido as apellidoAutorizador,
        Usuarios.idUsuario 
        from Usuarios 
        inner join Actividades_Usuarios on Usuarios.idUsuario = Actividades_Usuarios.idUsuario) 
        as nombreUsuarios on Actividades.idActividad = nombreUsuarios.idActividad
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
  let consulta = `select Actividades.idActividad, Actividades.salon, date_format(Actividades.fechaInicio, "%Y-%m-%d") as fechaInicio,
	Actividades.horaInicio, date_format(Actividades.fechaTermino, "%Y-%m-%d") as fechaTermino,
    Actividades.horaTermino, Actividades.observaciones,
	  nombreResponsable, apellidoResponsable, nombreAutorizador, apellidoAutorizador
    From Actividades 
	inner join (
		select Actividades_Clientes.idActividad,
        Clientes.nombre as nombreResponsable, Clientes.apellido as apellidoResponsable,
        Clientes.idCliente 
        from Clientes 
        inner join Actividades_Clientes on Clientes.idCliente = Actividades_Clientes.idCliente) 
        as nombreClientes on Actividades.idActividad = nombreClientes.idActividad
    inner join (
		select Actividades_Usuarios.idActividad,
        Usuarios.nombre as nombreAutorizador, Usuarios.apellido as apellidoAutorizador,
        Usuarios.idUsuario 
        from Usuarios 
        inner join Actividades_Usuarios on Usuarios.idUsuario = Actividades_Usuarios.idUsuario) 
        as nombreUsuarios on Actividades.idActividad = nombreUsuarios.idActividad
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

//agregar actividad
router.post("/agregar/activadad", (req, res) => {
  const { actividad, responsable, autorizaddor } = req.body;
  let consulta = ` `;
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
