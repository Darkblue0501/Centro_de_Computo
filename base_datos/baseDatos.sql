create database centro_computo;
use centro_computo;
drop table Actividades_Usuarios;
drop table Actividades_Clientes;
drop table Prestaciones_Clientes;
drop table Prestaciones_Usuarios;

DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Clientes;
DROP TABLE IF EXISTS Prestaciones;
DROP TABLE IF EXISTS Actividades;

create table Usuarios(
	idUsuario int primary key auto_increment,
    nombre text,
    apellido text,
    usuario text not null,
    contraseña text,
    telefono text,
    tipoUsuario text
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table Clientes(
	idCliente int primary key auto_increment,
    nombre text,
    apellido text,
    ocupacion text,
    facultad text,
    telefono text
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table Prestaciones(
	idPrestacion int primary key auto_increment,
    nombreEquipo text NOT NULL,
    numeroEquipo text NOT NULL,
    fechaInicio date,
    horaInicio time,
    fechaTermino date,
    horaTermino time,
    observaciones longtext
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table Actividades(
	idActividad int primary key auto_increment,
    salon int NOT NULL,
    fechaInicio date,
    horaInicio time,
    fechaTermino date,
    horaTermino time,
    observaciones longtext
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table Actividades_Usuarios(
	idActividad int primary key,
    idUsuario int,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table Actividades_Clientes(
	idActividad int primary key,
    idCliente int,
    FOREIGN KEY (idCliente) references Clientes(idCliente)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table Prestaciones_Usuarios(
	idPrestacion int primary key,
    idUsuario int,
    FOREIGN KEY (idUsuario) references Usuarios(idUsuario)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table Prestaciones_Clientes(
	idPrestacion int primary key,
    idCliente int,
    FOREIGN KEY (idCliente) REFERENCES Clientes(idCliente)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

SHOW TABLES;

INSERT INTO Clientes(nombre,ocupacion,facultad,telefono,apellido)
VALUES
  ("Tana","Imperdiet Ullamcorper Duis Associates","Cubilia Curae PC","1-345-237-4150","Roth"),
  ("Tyler","Felis Eget PC","Sed LLC","1-421-226-6285","Torres"),
  ("Lunea","Nisi Mauris Nulla Associates","Tempor Augue Ac Industries","1-552-174-8167","Santiago"),
  ("Kevin","Netus Inc.","Lectus Associates","1-413-327-8365","Barlow"),
  ("Len","Vivamus Corporation","Ut Aliquam Iaculis PC","1-878-113-3675","Bonner");
select * from Clientes;

INSERT INTO Usuarios (`nombre`,`apellido`,`usuario`,`contraseña`,`telefono`,`tipoUsuario`)
VALUES
  ("Ima","Porter","Dustin","Shay","1-462-778-8754","empleado"),
  ("Ingrid","Byrd","Upton","Noah","1-611-442-4437","empleado"),
  ("Dillon","Carey","Brody","Buckminster","1-221-258-6187","administrador"),
  ("Cade","Wong","Rooney","Beck","1-718-761-0136","empleado"),
  ("Stewart","Haney","Maite","Robert","1-786-583-0517","administrador");

INSERT INTO Actividades (`salon`,`fechaInicio`,`horaInicio`,`fechaTermino`,`horaTermino`,`observaciones`)
VALUES
  (7,"2022-01-12","14:03","2021-02-01","11:30","mascotas enfermedad cine"),
  (3,"2022-01-07","16:23","2021-01-30","20:14","golosinas fiesta proyecto"),
  (2,"2021-12-09","8:52","2021-02-07","21:56","proyecto alumnos seminario"),
  (1,"2021-11-15","20:33","2021-01-18","16:41","golosinas fiesta proyecto"),
  (6,"2021-11-10","5:40","2021-02-15","14:38","cine golosinas fiesta");

INSERT INTO Prestaciones (`nombreEquipo`,`numeroEquipo`,`fechaInicio`,`horaInicio`,`fechaTermino`,`horaTermino`,`observaciones`)
VALUES
  ("Laptop",7,"2022-08-29","5:14","2022-03-28","13:10","optativa libre golosinas"),
  ("Laptop",1,"2021-08-05","22:07","2022-03-09","20:58","tesis fiesta exposición taller"),
  ("Escáner",1,"2022-09-18","15:20","2022-05-25","14:31","tesis fiesta exposición taller"),
  ("Herramientas",4,"2020-12-13","19:03","2021-10-09","5:29","exposición taller optativa libre"),
  ("Cámara",3,"2021-06-24","16:49","2022-06-14","6:50","taller tesis fiesta exposición taller");

INSERT INTO Actividades_Clientes (`idActividad`,`idCliente`)
VALUES
  (1,5),
  (2,2),
  (3,1),
  (4,3),
  (5,4);

INSERT INTO Actividades_Usuarios (`idActividad`,`idUsuario`)
VALUES
  (1,3),
  (2,1),
  (3,4),
  (4,2),
  (5,5);

INSERT INTO Prestaciones_Usuarios (`idPrestacion`,`idUsuario`)
VALUES
  (1,4),
  (2,5),
  (3,2),
  (4,3),
  (5,1);

INSERT INTO Prestaciones_Clientes (`idPrestacion`,`idCliente`)
VALUES
  (1,2),
  (2,1),
  (3,5),
  (4,3),
  (5,4);
  
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
	order by Prestaciones.fechaInicio;

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
	where Prestaciones.fechaInicio >= current_timestamp()
	order by Prestaciones.fechaInicio;

select Actividades.idActividad, Actividades.salon, Actividades.fechaInicio,
	Actividades.horaInicio, Actividades.fechaTermino,
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
	order by Actividades.fechaInicio;

select Actividades.idActividad, Actividades.salon, date_format(Actividades.fechaInicio, "%Y-%m-%d") as fechaInicio,
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
	where Actividades.fechaInicio >= current_timestamp()
	order by Actividades.fechaInicio;




select Actividades.idActividad, Actividades.salon, Actividades.fechaInicio, Actividades.horaInicio, Actividades.fechaTermino, Actividades.horaTermino, Actividades.observaciones,
	concat(Clientes.nombre," ",Clientes.apellido) as responsable,
    concat(Usuarios.nombre," ",Usuarios.apellido) as autorizador
	from Actividades
	inner join Actividades_Clientes on Actividades_Clientes.idActividad = Actividades.idActividad
    inner join Actividades_Usuarios on Actividades_Usuarios.idActividad = Actividades.idActividad
    inner join Clientes on Actividades_Clientes.idCliente = Clientes.idCliente
    inner join Usuarios on Actividades_Usuarios.idUsuario = Usuarios.idUsuario
    order by Actividades.fechaInicio;
    
select Actividades.idActividad, Actividades.salon, Actividades.fechaInicio, Actividades.horaInicio, Actividades.fechaTermino, Actividades.horaTermino,
	concat(Clientes.nombre," ",Clientes.apellido) as responsable,
    concat(Usuarios.nombre," ",Usuarios.apellido) as autorizador
	from Actividades
	inner join Actividades_Clientes on Actividades_Clientes.idActividad = Actividades.idActividad
    inner join Actividades_Usuarios on Actividades_Usuarios.idActividad = Actividades.idActividad
    inner join Clientes on Actividades_Clientes.idCliente = Clientes.idCliente
    inner join Usuarios on Actividades_Usuarios.idUsuario = Usuarios.idUsuario
    where Actividades.fechaInicio >= current_timestamp()
    order by Actividades.fechaInicio;
select * from usuarios where usuario= 'Noah';