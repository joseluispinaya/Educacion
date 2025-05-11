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
	public partial class ListaActivos : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EActivo>> ObtenerListaActivos()
        {
            try
            {
                Respuesta<List<EActivo>> Lista = NActivo.GetInstance().ObtenerListaActivos();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EActivo>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Activos: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}