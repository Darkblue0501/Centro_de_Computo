var datos;
var selectedItem = -1;
const selectId = (id) => {
  for (let item of datos) {
    if (item.idPrestacion == id) {
      alert("Elemento seleccionado : id=" + id);
      document
        .getElementById("nombreResponsable")
        .setAttribute("value", item.nombreResponsable);
      document
        .getElementById("apellidoResponsable")
        .setAttribute("value", item.apellidoResponsable);
      document.getElementById("numero").setAttribute("value", item.numero);
      document
        .getElementById("nombreEquipo")
        .setAttribute("value", item.nombreEquipo);
      document
        .getElementById("numero")
        .setAttribute("value", item.numeroEquipo);
      document.getElementById("fechaInicio").value =
        item.fechaInicio.toString();
      document
        .getElementById("horaInicio").value = item.horaInicio;
      document.getElementById("fechaTermino").value = item.fechaTermino;
      document
        .getElementById("horaTermino").value = item.horaTermino;
      document
        .getElementById("observaciones")
        .setAttribute("value", item.observaciones);
      return;
    }
  }
};
const cancelar = () => {
  selectedItem = -1;
  document.getElementById("nombreResponsable").value = "";
  document.getElementById("apellidoResponsable").value="";
  document.getElementById("numero").value=" ";
  document.getElementById("nombreEquipo").value="";
  document.getElementById("fechaInicio").value = "0000-00-00";
  document.getElementById("horaInicio").setAttribute("value", " ");
  document.getElementById("fechaTermino").value = "0000-00-00";
  document.getElementById("horaTermino").value="";
  document.getElementById("observaciones").value="";
};

const eliminar = () => {};
const guardar = () => {};
const agregar = () => {};

const llenarTabla = () => {
  let archivoConfig = configuracion;
  let host = archivoConfig[0].host + archivoConfig[0].port;
  let direccionRest =
    "http://" + host + "/rest/controladores/prestaciones/buscar/todas";
  let httpx = new XMLHttpRequest();
  console.log("Llenando tabla");
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
          item.idPrestacion +
          '">' +
          "<th>" +
          item.idPrestacion +
          "</th><th>" +
          item.nombreResponsable +
          " " +
          item.apellidoResponsable +
          "</th><th>" +
          item.nombreEquipo + " " + item.numeroEquipo +
          "</th><th>" +
          item.fechaInicio +
          "</th><th>" +
          item.horaInicio +
          "</th><th>" +
          item.fechaTermino +
          "</th><th>" +
          item.horaTermino +
          "</th><th>" +
          item.observaciones +
          "</th><th>" +
          item.nombreAutorizador +
          " " +
          item.apellidoAutorizador +
          "</th><th>" +
          '<button onclick="selectId(' +
          item.idPrestacion +
          ')"><img src="../img/arrow_left.png" alt="seleccionar"></button>' +
          "</th></tr>";
      }
    }
  };
};
llenarTabla();