using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using CapaEntidad;

namespace CapaPresentacion
{
	public partial class ActivosRegistro : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<string> Pruebas(int IdItem, string Descripcion)
        {
            try
            {
                if (IdItem <= 0)
                {
                    return new Respuesta<string>() { Estado = false, Mensaje = "Error el id es cero" };
                }

                var cifradoc = Guid.NewGuid().ToString();
                var ciff = Utildades.Encrypt(cifradoc);
                var des = Utildades.Decrypt(ciff);
                var retorna = Utildades.Encrypt(Descripcion);

                return new Respuesta<string>() { Estado = true, Mensaje = des, Valor = ciff };
            }
            catch (Exception)
            {
                return new Respuesta<string>() { Estado = false, Mensaje = "Error al obtener encriptado" };
            }
        }
    }
}