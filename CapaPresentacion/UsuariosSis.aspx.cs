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
	public partial class UsuariosSis : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        //[WebMethod]
        //public static Respuesta<List<EUsuario>> ListaUsuarios()
        //{
        //    try
        //    {

        //        Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ObtenerUsuarios();
        //        return Lista;
        //    }
        //    catch (Exception ex)
        //    {
        //        // Maneja cualquier error inesperado
        //        return new Respuesta<List<EUsuario>>()
        //        {
        //            Estado = false,
        //            Mensaje = "Error al obtener los usuarios: " + ex.Message,
        //            Data = null
        //        };
        //    }
        //}

    }
}