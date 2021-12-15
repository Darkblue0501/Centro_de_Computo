var selectedItem = -1;

const selectId = (id) => {
  for (let item of datos) {
    if (item.idUsuario == id) {
      alert("Elemento seleccionado : id=" + id);
      document.getElementById("nombre").value = item.nombre;
      document.getElementById("apellido").value = item.apellido;
      document.getElementById("usuario").value = item.usuario;
      document.getElementById("telefono").value = item.telefono;
      document
        .getElementById("contraseña")
        .setAttribute("value", item.contraseña);
      document.getElementById("tipo").value = item.tipoUsuario;

      return;
    }
  }
};
const cancelar = () => {
  selectedItem = -1;
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("usuario").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("contraseña").value = "";
  document.getElementById("tipo").value = "";
};
const eliminar = () => {
  if (selectedItem != -1) {
    let nombreInput = document.getElementById("nombre").value;
    let apellidoinput = document.getElementById("apellido").value;
    let usuarioInput = document.getElementById("usuario").value;
    let telefonoInput = document.getElementById("telefono").value;
    let contraseñaInput = document.getElementById("contraseña").value;
    let tipoInput = document.getElementById("tipo").value;
    datos = JSON.stringify({
      nombre: `${nombreInput}`,
      apellido: `${apellidoinput}`,
      usuario: `${usuarioInput}`,
      telefono: `${telefonoInput}`,
      contraseña: `${contraseñaInput}`,
      tipoUsuario: `${tipoInput}`,
    });

    let archivoConfig = configuracion;
    let host = archivoConfig[0].host + archivoConfig[0].port;
    let direccionRest = "http://" + host + "/rest/inventarios/usuarios/eliminar";
    let httpx = new XMLHttpRequest();
    httpx.open(solicitud, direccionRest, true);
    httpx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpx.send(datosEntrada);
    httpx.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        datos = JSON.parse(this.responseText);
        alert(`Usuario ${datos.mensaje}`);
      }
    };
  } else {
    alert("No se ha seleccionado ningun registro");
  }
};
const guardar = () => {
  if (selectedItem != -1) {
      if (selectedItem != -1) {
          let nombreInput = document.getElementById("nombre").value;
          let apellidoinput = document.getElementById("apellido").value;
          let usuarioInput = document.getElementById("usuario").value;
          let telefonoInput = document.getElementById("telefono").value;
          let contraseñaInput = document.getElementById("contraseña").value;
          let tipoInput = document.getElementById("tipo").value;
          datos = JSON.stringify({
              nombre: `${nombreInput}`,
              apellido: `${apellidoinput}`,
              usuario: `${usuarioInput}`,
              telefono: `${telefonoInput}`,
              contraseña: `${contraseñaInput}`,
              tipoUsuario: `${tipoInput}`,
          });

          let archivoConfig = configuracion;
          let host = archivoConfig[0].host + archivoConfig[0].port;
          let direccionRest = "http://" + host + "/rest/inventarios/usuarios/guardar";
          let httpx = new XMLHttpRequest();
          httpx.open(solicitud, direccionRest, true);
          httpx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          httpx.send(datosEntrada);
          httpx.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                  datos = JSON.parse(this.responseText);
                  alert(`Usuario ${datos.mensaje}`);
              }
          };
      }
  }else {
    alert("No se ha seleccionado ningun registro");
  }
};
const agregar = () => {
        let nombreInput = document.getElementById("nombre").value;
        let apellidoinput = document.getElementById("apellido").value;
        let usuarioInput = document.getElementById("usuario").value;
        let telefonoInput = document.getElementById("telefono").value;
        let contraseñaInput = document.getElementById("contraseña").value;
        let tipoInput = document.getElementById("tipo").value;
        datos = JSON.stringify({
          nombre: `${nombreInput}`,
          apellido: `${apellidoinput}`,
          usuario: `${usuarioInput}`,
          telefono: `${telefonoInput}`,
          contraseña: `${contraseñaInput}`,
          tipoUsuario: `${tipoInput}`,
        });

        let archivoConfig = configuracion;
        let host = archivoConfig[0].host + archivoConfig[0].port;
        let direccionRest =
          "http://" + host + "/rest/inventarios/usuarios/agregar";
        let httpx = new XMLHttpRequest();
        httpx.open(solicitud, direccionRest, true);
        httpx.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        httpx.send(datosEntrada);
        httpx.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            datos = JSON.parse(this.responseText);
            alert(`Usuario ${datos.mensaje}`);
          }
        };
};

const llenarTabla = () => {
  let archivoConfig = configuracion;
  let host = archivoConfig[0].host + archivoConfig[0].port;
  let direccionRest =
    "http://" + host + "/rest/inventarios/usuarios/buscar/todas";
  let httpx = new XMLHttpRequest();
  httpx.open("GET", direccionRest, true);
  httpx.send();
  httpx.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      datos = JSON.parse(this.responseText);
      let tabla = document.getElementById("datosTabla");
      tabla.innerHTML = "";
      for (let item of datos) {
        let contra = "";
        for (let c of item.contraseña) {
          contra += "*";
        }
        tabla.innerHTML +=
          '<tr id="' +
          item.idUsuario +
          '">' +
          "<th>" +
          item.idUsuario +
          "</th><th>" +
          item.nombre +
          "</th><th>" +
          item.apellido +
          "</th><th>" +
          item.telefono +
          "</th><th>" +
          item.usuario +
          "</th><th>" +
          contra +
          "</th><th>" +
          item.tipoUsuario +
          "</th><th>" +
          '<button onclick="selectId(' +
          item.idUsuario +
          ')"><img src="../img/arrow_left.png" alt="seleccionar"></button>' +
          "</th></tr>";
      }
    }
  };
};
llenarTabla();
