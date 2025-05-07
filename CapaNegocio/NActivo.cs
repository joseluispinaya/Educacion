using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;

namespace CapaNegocio
{
    public class NActivo
    {
        #region "PATRON SINGLETON"
        private static NActivo daoEmpleado = null;
        private NActivo() { }
        public static NActivo GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NActivo();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<EActivo> ActivoPrueba()
        {
            try
            {
                var activo = new EActivo
                {
                    IdActivo = 1,
                    Codigo = "00001",
                    Comentario = "Entrega de 2 computadoras",
                    CantidadTotal = 2
                };

                return new Respuesta<EActivo>
                {
                    Estado = true,
                    Mensaje = "Activo de prueba obtenido correctamente",
                    Data = activo
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EActivo>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EDetalleActivo>> ObtenerDetalleActivos()
        {
            try
            {
                List<EDetalleActivo> rptLista = new List<EDetalleActivo>()
                {
                    new EDetalleActivo
                    {
                        IdDetalleActivo = 1,
                        NombreArticulo = "Computadora 001",
                        Marca = "HP",
                        NroSerie = "4545487884",
                        DetalleInfo = "CPU intel core i5 con disco de 500 gb memoria de 8 gb",
                        RutaQR = "",
                        Activo = true
                    },
                    new EDetalleActivo
                    {
                        IdDetalleActivo = 2,
                        NombreArticulo = "Computadora 002",
                        Marca = "HP",
                        NroSerie = "44478855555",
                        DetalleInfo = "CPU intel core i5 con disco de 500 gb memoria de 8 gb",
                        RutaQR = "",
                        Activo = true
                    }
                };

                return new Respuesta<List<EDetalleActivo>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Detalle activos obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EDetalleActivo>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
