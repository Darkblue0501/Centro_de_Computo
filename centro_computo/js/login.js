sessionStorage.setItem("sesion", "false");
const login = () => {
  let httpx = new XMLHttpRequest();
  let archivoConfig = configuracion;
  let host = archivoConfig[0].host + archivoConfig[0].port;
  let direccionRest = "http://" + host + "/rest/login/inicio-sesion";
  let usuar = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;
  let datos = JSON.stringify({
    usuario: `${usuar}`,
    contraseña: `${password}`,
  });
  httpx.open("POST", direccionRest, true);
  httpx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  httpx.send(datos);
  httpx.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let resultado = JSON.parse(this.responseText)[0];
      if (resultado.nombre) {
        sessionStorage.setItem("sesion", resultado.session);
        sessionStorage.setItem("usuario", resultado.usuario);
        sessionStorage.setItem("nombre", resultado.nombre);
        sessionStorage.setItem("apellido", resultado.apellido);
        sessionStorage.setItem("tipoUsuario", resultado.tipoUsuario);
        sessionStorage.setItem("idUsuario", resultado.idUsuario);
        window.location.href = "./index.html";
      } else {
        alert("Inision de sesión fallida");
      }
    }
  };
};
