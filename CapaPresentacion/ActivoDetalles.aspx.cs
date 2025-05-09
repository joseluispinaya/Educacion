using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using CapaEntidad;
using CapaNegocio;

namespace CapaPresentacion
{
	public partial class ActivoDetalles : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}


        [WebMethod]
        public static Respuesta<EActivo> DetalleActivoFullNuevo(int IdActivo)
        {
            try
            {
                var servicioActivo = NActivo.GetInstance();

                // Obtener el activo principal
                var respuesta = servicioActivo.ObtenerActivo(IdActivo);
                if (!respuesta.Estado || respuesta.Data == null)
                {
                    return new Respuesta<EActivo>
                    {
                        Estado = false,
                        Mensaje = $"No se encontró el activo con ID {IdActivo}.",
                        Data = null
                    };
                }

                // Obtener los detalles del activo
                var detalleRespuesta = servicioActivo.ObtenerDetalleActivosIdActivo(IdActivo);
                if (detalleRespuesta.Estado && detalleRespuesta.Data != null)
                {
                    respuesta.Data.ListaDetalleActivos = detalleRespuesta.Data;
                }
                else
                {
                    respuesta.Mensaje += " No se pudieron cargar los detalles del activo.";
                    respuesta.Data.ListaDetalleActivos = new List<EDetalleActivo>(); // Asegurar lista vacía si falla
                }

                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<EActivo>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Error inesperado: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<EActivo> DetalleActivoFull()
        {
            try
            {
                Respuesta<EActivo> respuesta = NActivo.GetInstance().ActivoPrueba();
                var listaDetalleActivo = NActivo.GetInstance().ObtenerDetalleActivos();
                var lista = listaDetalleActivo.Data;
                respuesta.Data.ListaDetalleActivos = lista;

                return respuesta;
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return new Respuesta<EActivo>() { Estado = false, Data = null, Mensaje = ex.Message };
            }
        }
    }
}