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
	public partial class UnidadesEducativas : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EUnidaEducativa>> ObtenerUnidadesEdu()
        {
            try
            {
                Respuesta<List<EUnidaEducativa>> Lista = NUnidaEducativa.GetInstance().ListaUnidadesEducativas();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUnidaEducativa>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener las unidades: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EArea>> ListaAreas()
        {
            try
            {
                Respuesta<List<EArea>> Lista = NUnidaEducativa.GetInstance().ListaAreas();
                return Lista;
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EArea>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener las areas: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EUnidaEducativa oUnidad)
        {
            try
            {
                Respuesta<bool> respuesta = NUnidaEducativa.GetInstance().RegistrarUnidad(oUnidad);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Editar(EUnidaEducativa oUnidad)
        {
            try
            {
                if (oUnidad == null || oUnidad.IdUnidadEdu <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Ocurrio un problema intente mas tarde" };
                }

                Respuesta<bool> respuesta = NUnidaEducativa.GetInstance().ActualizarUnidad(oUnidad);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}