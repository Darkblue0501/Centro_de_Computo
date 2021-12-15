const selectBuscar = document.getElementById("tipoBuscar");
selectBuscar.selectedIndex = 0;
let datosEntrada;
let solicitud = "GET";
let tipoBusqueda = "todas";

const onSeleccion = () => {
  const value = selectBuscar.options[selectBuscar.selectedIndex].value;
  switch (value) {
    case "responsable":
    case "autorizador":
      var elemento = document.getElementById("valueTexto");
      elemento.setAttribute("style", "display:block");
      var elemento = document.getElementById("valueDia");
      elemento.setAttribute("style", "display:none");
      var elemento = document.getElementById("valueIntervalo");
      elemento.setAttribute("style", "display:none");
      break;
    case "diaActividad":
      var elemento = document.getElementById("valueTexto");
      elemento.setAttribute("style", "display:none");
      var elemento = document.getElementById("valueDia");
      elemento.setAttribute("style", "display:block");
      var elemento = document.getElementById("valueIntervalo");
      elemento.setAttribute("style", "display:none");
      break;
    case "semanaActividad":
      var elemento = document.getElementById("valueTexto");
      elemento.setAttribute("style", "display:none");
      var elemento = document.getElementById("valueDia");
      elemento.setAttribute("style", "display:none");
      var elemento = document.getElementById("valueIntervalo");
      elemento.setAttribute("style", "display:block");
      break;
  }
};
const llenarTabla = () => {
  let archivoConfig = configuracion;
  let host = archivoConfig[0].host + archivoConfig[0].port;
  let direccionRest =
    "http://" + host + "/rest/controladores/actividades/buscar/" + tipoBusqueda;
  let httpx = new XMLHttpRequest();
  httpx.open(solicitud, direccionRest, true);
  httpx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  httpx.send(datosEntrada);
  httpx.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      datos = JSON.parse(this.responseText);
      let tabla = document.getElementById("datosTabla");
      if (datos == []) {
        alert("No se encontraron datos porfavor revise su entrada");
      } else {
        tabla.innerHTML = "";
        for (let item of datos) {
          tabla.innerHTML +=
            '<tr id="' +
            item.idActividad +
            '">' +
            "<th>" +
            item.idActividad +
            "</th><th>" +
            item.nombreResponsable +
            " " +
            item.apellidoResponsable +
            "</th><th>" +
            item.salon +
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
            "</th></tr>";
        }
      }
    }
  };
};
const buscarResponsable = () => {
  let nombreInput = document.getElementById("nombreResponsable").value;
  let apellidoInput = document.getElementById("apellidoResponsable").value;
  datosEntrada = JSON.stringify({
    nombre: `${nombreInput}`,
    apellido: `${apellidoInput}`,
  });
  tipoBusqueda = "nombre-responsable";
  solicitud = "POST";
};
const buscarAutorizador = () => {
  let nombreInput = document.getElementById("nombreResponsable").value;
  let apellidoInput = document.getElementById("apellidoResponsable").value;
  datosEntrada = JSON.stringify({
    nombre: `${nombreInput}`,
    apellido: `${apellidoInput}`,
  });
  solicitud = "POST";
  tipoBusqueda = "nombre-autorizador";
};
const buscarDia = () => {
  let diaInput = document.getElementById("fecha").value;
  let apellidoInput = document.getElementById("apellidoResponsable").value;
  datosEntrada = JSON.stringify({
    dia: `${diaInput}`,
  });
  solicitud = "POST";
  tipoBusqueda = "dia-actividad";
};
const buscarSemana = () => {
  let inicioInput = document.getElementById("fechaInicio").value;
  let terminoInput = document.getElementById("fechaTermino").value;
  datosEntrada = JSON.stringify({
    fechaInicio: `${inicioInput}`,
    fechaTermino: `${terminoInput}`,
  });
  solicitud = "POST";
  tipoBusqueda = "semana-actividad";
};
const buscar = () => {
  const value = selectBuscar.options[selectBuscar.selectedIndex].value;

  switch (value) {
    case "responsable":
      buscarResponsable();
      break;
    case "autorizador":
      buscarAutorizador();
      break;
    case "diaActividad":
      buscarDia();
      break;
    case "semanaActividad":
      buscarSemana();
      break;
  }

  llenarTabla();
};
const cancelar = () => {
  tipoBusqueda = "todas";
  solicitud = "GET";
  selectBuscar.selectedIndex = 0;
  document.getElementById("nombreResponsable").value = "";
  document.getElementById("apellidoResponsable").value = "";
  document.getElementById("fechaInicio").value = "0000-00-00";
  document.getElementById("fechaTermino").value = "0000-00-00";
  document.getElementById("fecha").value = "0000-00-00";
  onSeleccion();
  llenarTabla();
};
const imprimir = () => {
  let form = document.getElementById("formTabla");
  var ventimp = window.open(" ", "popimpr");
  ventimp.document.write("<h1> Lista de Actividades </h1>");
  ventimp.document.write(form.innerHTML);
  ventimp.document.close();
  ventimp.print();
  ventimp.close();
};

llenarTabla();
