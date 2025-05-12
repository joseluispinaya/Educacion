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
	public partial class ConsultasQR : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<EResponseInfo> DetalleActivoInfo(string CodAlterno)
        {
            try
            {
                if (string.IsNullOrEmpty(CodAlterno))
                {
                    return new Respuesta<EResponseInfo>
                    {
                        Estado = false,
                        Mensaje = "No se encontró el activo",
                        Data = null
                    };
                }

                Respuesta<EResponseInfo> respuesta = NActivo.GetInstance().ObtenerInfoQR(CodAlterno);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<EResponseInfo>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Error inesperado: " + ex.Message
                };
            }
        }
    }
}