using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using CapaEntidad;
using CapaNegocio;

namespace CapaPresentacion.Api
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/usuarios")]
    public class UsuariosController : ApiController
    {
        [HttpPost]
        [Route("Login")]
        public IHttpActionResult InicioSession(LoginDTO loginDTO)
        {
            if (loginDTO == null)
            {
                return BadRequest("Debe ingresar datos para iniciar sesión.");
            }

            var respuesta = NUsuario.GetInstance().LoginUsuarioApp(loginDTO.Correo, loginDTO.Clave);
            return Ok(respuesta); // No necesitas reconstruir la respuesta, ya viene completa
        }

        [HttpPost]
        [Route("Consulta")]
        public IHttpActionResult PostInfoActivo(ERequestAc request)
        {
            if (request == null || string.IsNullOrEmpty(request.CodAlterno))
            {
                return BadRequest("Ocurrio un error intente mas tarde.");
            }

            var respuesta = NActivo.GetInstance().ObtenerInfoQR(request.CodAlterno);
            return Ok(respuesta);

        }

    }
}