const llenarTabla = () => {
  let httpx = new XMLHttpRequest();

  let archivoConfig = configuracion;
  let host = archivoConfig[0].host + archivoConfig[0].port;
  let direccionRest = "http://" + host + "/rest/index/actividades-proximas";
  console.log(direccionRest);
  httpx.open("GET", direccionRest, true);
  httpx.send();
  httpx.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.responseText);
      let tabla = document.getElementById("datosTabla");
      tabla.innerHTML = "";
      for (let item of datos) {
        tabla.innerHTML +=
          '<tr id="' +
          item.idAcividad +
          '">' +
          "<th>" +
          item.idActividad +
          "</th><th>" +
          item.responsable +
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
          item.autorizador +
          "</th></tr>";
      }
    }
  };
};
llenarTabla();
