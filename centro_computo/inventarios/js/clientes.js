var datos;
var selectedItem = -1;

const selectId = (id) => {
  for (let item of datos) {
    if (item.idCliente == id) {
      alert("Elemento seleccionado : id=" + id);
      document.getElementById("nombre").value = item.nombre;
      document.getElementById("apellido").value = item.apellido;
      document.getElementById("ocupacion").value = item.ocupacion;
      document.getElementById("telefono").value = item.telefono;
      document.getElementById("facultad").value = item.facultad;

      return;
    }
  }
};
const cancelar = () => {
  selectedItem = -1;
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("ocupacion").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("facultad").value = "";
};
const eliminar = () => {};
const guardar = () => {};
const agregar = () => {};
const llenarTabla = () => {
  let archivoConfig = configuracion;
  let host = archivoConfig[0].host + archivoConfig[0].port;
  let direccionRest =
    "http://" + host + "/rest/inventarios/clientes/buscar/todas";
  let httpx = new XMLHttpRequest();
  httpx.open("GET", direccionRest, true);
  httpx.send();
  httpx.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      datos = JSON.parse(this.responseText);
      let tabla = document.getElementById("datosTabla");
      tabla.innerHTML = "";
      for (let item of datos) {
        tabla.innerHTML +=
          '<tr id="' +
          item.idCliente +
          '">' +
          "<th>" +
          item.idCliente +
          "</th><th>" +
          item.nombre +
          "</th><th>" +
          item.apellido +
          "</th><th>" +
          item.ocupacion +
          "</th><th>" +
          item.telefono +
          "</th><th>" +
          item.facultad +
          "</th><th>" +
          '<button onclick="selectId(' +
          item.idCliente +
          ')"><img src="../img/arrow_left.png" alt="seleccionar"></button>' +
          "</th></tr>";
      }
    }
  };
};
llenarTabla();
