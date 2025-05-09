using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using CapaEntidad;
using CapaNegocio;
using System.Xml.Linq;

namespace CapaPresentacion
{
	public partial class ActivosRegistro : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<ETipoActivo>> ListaTiposActi()
        {
            try
            {
                Respuesta<List<ETipoActivo>> Lista = NActivo.GetInstance().ListaTipoActivos();
                return Lista;
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ETipoActivo>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Tipos: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EUnidaEducativa>> ListaUnidadesEducativas()
        {
            try
            {
                Respuesta<List<EUnidaEducativa>> Lista = NActivo.GetInstance().ListaUnidadesEducativas();
                return Lista;
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EUnidaEducativa>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener las Unidades educativas: " + ex.Message,
                    Data = null
                };
            }
        }


        [WebMethod]
        public static Respuesta<bool> RegistrarActivo(EActivo eActivo, List<EDetalleActivo> RequestList)
        {
            try
            {
                if (RequestList == null || !RequestList.Any())
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "La lista está vacía" };
                }

                XElement activoa = new XElement("Activo",
                    new XElement("IdUnidadEdu", eActivo.IdUnidadEdu),
                    new XElement("Comentario", eActivo.Comentario),
                    new XElement("CantidadTotal", eActivo.CantidadTotal)
                );

                XElement detalleActivo = new XElement("DetalleActivo");

                foreach (EDetalleActivo item in RequestList)
                {
                    detalleActivo.Add(new XElement("Item",

                        new XElement("IdTipoAct", item.IdTipoAct),
                        new XElement("NombreArticulo", item.NombreArticulo),
                        new XElement("Marca", item.Marca),
                        new XElement("NroSerie", item.NroSerie),
                        new XElement("DetalleInfo", item.DetalleInfo)
                        //new XElement("DetalleInfo", Utildades.Encrypt(item.DetalleInfo)),
                        //new XElement("CodAlterno", Guid.NewGuid().ToString())
                        )

                    );
                }

                activoa.Add(detalleActivo);

                var estructura = activoa.ToString();
                bool encontrado = !string.IsNullOrEmpty(estructura);

                return new Respuesta<bool>
                {
                    Estado = encontrado,
                    Mensaje = encontrado ? "Estructura xml bien" : "No tiene estructura"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<int> GuardarActivo(EActivo eActivo, List<EDetalleActivo> RequestList)
        {
            try
            {
                if (RequestList == null || !RequestList.Any())
                {
                    return new Respuesta<int> { Estado = false, Mensaje = "La lista está vacía" };
                }

                XElement activoa = new XElement("Activo",
                    new XElement("IdUnidadEdu", eActivo.IdUnidadEdu),
                    new XElement("Comentario", eActivo.Comentario),
                    new XElement("CantidadTotal", eActivo.CantidadTotal)
                );

                XElement detalleActivo = new XElement("DetalleActivo");

                foreach (EDetalleActivo item in RequestList)
                {
                    detalleActivo.Add(new XElement("Item",

                        new XElement("IdTipoAct", item.IdTipoAct),
                        new XElement("NombreArticulo", item.NombreArticulo),
                        new XElement("Marca", item.Marca),
                        new XElement("NroSerie", item.NroSerie),
                        new XElement("DetalleInfo", item.DetalleInfo)
                        )

                    );
                }

                activoa.Add(detalleActivo);

                // Llamar a RegistrarActivo en la capa de negocio y recibir la respuesta
                Respuesta<int> respuesta = NActivo.GetInstance().RegistrarActivo(activoa.ToString());
                return respuesta;
            }
            catch (Exception ex)
            {
                // Capturar cualquier error y retornar una respuesta de fallo
                return new Respuesta<int>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
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