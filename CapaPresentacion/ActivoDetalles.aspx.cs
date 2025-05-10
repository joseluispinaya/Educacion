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

        //no se usa
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

        [WebMethod]
        public static Respuesta<bool> CambiaEstadoDetalleActivo(int IdDetalleActivo, bool Estado)
        {
            try
            {
                if (IdDetalleActivo <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Intente Nuevamente activo invalido" };
                }

                Respuesta<bool> respuesta = NActivo.GetInstance().CambiaEstadoDetalleActivo(IdDetalleActivo, Estado);

                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> GenerarQr(List<EDetalleActivo> RequestList)
        {
            try
            {
                if (RequestList == null || !RequestList.Any())
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "La lista esta vacia" };
                }
                int cantReg = 0;
                int cantNoReg = 0;

                foreach (var request in RequestList)
                {
                    if (RegistrarDetalleQrNue(request))
                    {
                        cantReg++;
                    }
                    else
                    {
                        cantNoReg++;
                    }
                }

                return new Respuesta<bool>
                {
                    Estado = cantReg > 0,
                    Valor = cantReg.ToString(), // Se envía la cantidad de registros exitosos
                    Mensaje = cantReg > 0
                        ? $"Registro realizado correctamente. Éxitos: {cantReg}, Fallos: {cantNoReg}"
                        : "Error al registrar, intente más tarde."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        private static bool RegistrarDetalleQrNue(EDetalleActivo request)
        {
            if (request == null || request.IdDetalleActivo <= 0)
                return false;

            if (!string.IsNullOrEmpty(request.RutaQR))
                return true;

            string codigoAlt = Utildades.Encrypt(Guid.NewGuid().ToString());
            string imageUrl = Serviciosj.GetInstance().GenerarQrActivo(codigoAlt);

            if (string.IsNullOrEmpty(imageUrl))
                return false;

            var detalleActualizado = new EDetalleActivo
            {
                IdDetalleActivo = request.IdDetalleActivo,
                RutaQR = imageUrl,
                CodAlterno = codigoAlt
            };

            var respuesta = NActivo.GetInstance().ActualizarDetalleActivos(detalleActualizado);
            return respuesta.Estado;
        }

        private static bool RegistrarDetalleQr(EDetalleActivo request)
        {
            bool res = false;
            var codigoAlt = Utildades.Encrypt(Guid.NewGuid().ToString());

            string imageUrld = request.RutaQR;
            if (!string.IsNullOrEmpty(imageUrld))
            {
                res = true;
            }
            else
            {
                string imageUrl = Serviciosj.GetInstance().GenerarQrActivo(codigoAlt);
                if (!string.IsNullOrEmpty(imageUrl))
                {
                    var odetalle = new EDetalleActivo
                    {
                        IdDetalleActivo = request.IdDetalleActivo,
                        RutaQR = imageUrl,
                        CodAlterno = codigoAlt
                    };
                    Respuesta<bool> respua = NActivo.GetInstance().ActualizarDetalleActivos(odetalle);
                    res = respua.Estado;
                }
            }

            return res;
        }
    }
}