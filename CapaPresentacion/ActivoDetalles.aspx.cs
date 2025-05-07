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