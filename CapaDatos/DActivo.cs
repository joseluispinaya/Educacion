using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using CapaEntidad;
using System.Data;

namespace CapaDatos
{
    public class DActivo
    {
        #region "PATRON SINGLETON"
        private static DActivo daoEmpleado = null;
        private DActivo() { }
        public static DActivo GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new DActivo();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<int> RegistrarActivo(string ActivoXml)
        {
            var respuesta = new Respuesta<int>();

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarActivoNuevo", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Agregar parámetro de entrada
                        cmd.Parameters.AddWithValue("@ActivoXml", ActivoXml);

                        // Agregar parámetro de salida
                        var outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        // Abrir la conexión y ejecutar el comando
                        con.Open();
                        cmd.ExecuteNonQuery();

                        // Obtener el valor del parámetro de salida
                        int resultado = Convert.ToInt32(outputParam.Value);

                        // Configurar respuesta de éxito
                        respuesta.Estado = resultado > 0;
                        respuesta.Valor = resultado.ToString();
                        respuesta.Mensaje = resultado > 0 ? "Registro realizado correctamente." : "Error al registrar, intente más tarde.";
                        respuesta.Data = resultado;
                    }
                }
            }
            catch (SqlException ex)
            {
                respuesta.Estado = false;
                respuesta.Mensaje = $"Ocurrió un error en la base de datos: {ex.Message}";
            }
            catch (Exception ex)
            {
                respuesta.Estado = false;
                respuesta.Mensaje = $"Ocurrió un error: {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<EActivo> ObtenerActivo(int IdActivo)
        {
            try
            {
                EActivo obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_ObtenerActivo", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdActivo", IdActivo);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new EActivo
                                {
                                    IdActivo = Convert.ToInt32(dr["IdActivo"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    RefUnidaEducativa = new EUnidaEducativa
                                    {
                                        Nombre = dr["Nombre"].ToString(),
                                        Responsable = dr["Responsable"].ToString()
                                    },
                                    Comentario = dr["Comentario"].ToString(),
                                    CantidadTotal = Convert.ToInt32(dr["CantidadTotal"]),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = dr["FechaRegistro"].ToString()
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EActivo>
                {
                    Estado = obj != null,  // El operador ternario ya no es necesario aquí, `obj != null` es suficiente
                    Data = obj,
                    Mensaje = obj != null ? "Detalle obtenido exitoso" : "Ocurrio un error"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EActivo>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EActivo>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EDetalleActivo>> ObtenerDetalleActivosIdActivo(int IdActivo)
        {
            try
            {
                List<EDetalleActivo> rptLista = new List<EDetalleActivo>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_ObtenerDetalleActivo", con))
                    {
                        comando.Parameters.AddWithValue("@IdActivo", IdActivo);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EDetalleActivo()
                                {
                                    IdDetalleActivo = Convert.ToInt32(dr["IdDetalleActivo"]),
                                    RefTipoActivo = new ETipoActivo
                                    {
                                        Nombre = dr["Nombre"].ToString()
                                    },
                                    NombreArticulo = dr["NombreArticulo"].ToString(),
                                    Marca = dr["Marca"].ToString(),
                                    NroSerie = dr["NroSerie"].ToString(),
                                    DetalleInfo = dr["DetalleInfo"].ToString(),
                                    RutaQR = dr["RutaQr"].ToString(),
                                    CodAlterno = dr["CodAlterno"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EDetalleActivo>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Detalle Activos obtenidos correctamente"
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
        public Respuesta<List<ETipoActivo>> ListaTipoActivos()
        {
            try
            {
                List<ETipoActivo> rptLista = new List<ETipoActivo>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerTipoActivo", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ETipoActivo()
                                {
                                    IdTipoAct = Convert.ToInt32(dr["IdTipoAct"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ETipoActivo>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Tipos obtenidos correctamente"
                };
            }
            catch (Exception)
            {
                return new Respuesta<List<ETipoActivo>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error",
                    Data = null
                };
            }
        }

        public Respuesta<List<EUnidaEducativa>> ListaUnidadesEducativas()
        {
            try
            {
                List<EUnidaEducativa> rptLista = new List<EUnidaEducativa>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerUnidadesEduca", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EUnidaEducativa()
                                {
                                    IdUnidadEdu = Convert.ToInt32(dr["IdUnidadEdu"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Responsable = dr["Responsable"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    IdArea = Convert.ToInt32(dr["IdArea"]),
                                    RefArea = new EArea() { Descripcion = dr["Descripcion"].ToString() },
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EUnidaEducativa>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Unidades educativas obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUnidaEducativa>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> ActualizarDetalleActivos(EDetalleActivo oDetalleActivo)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ActualizarDetalleActivo", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdDetalleActivo", oDetalleActivo.IdDetalleActivo);
                        cmd.Parameters.AddWithValue("@RutaQr", oDetalleActivo.RutaQR);
                        cmd.Parameters.AddWithValue("@CodAlterno", oDetalleActivo.CodAlterno);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se Actualizo correctamente" : "Error al Actualizar intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> CambiaEstadoDetalleActivo(int IdDetalleActivo, bool Estado)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("sp_CambiarEstadoDetalleAct", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdDetalleActivo", IdDetalleActivo);
                        cmd.Parameters.AddWithValue("@Estado", Estado);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se Actualizo el estado correctamente" : "Error al Actualizar intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EActivo>> ObtenerListaActivos()
        {
            try
            {
                List<EActivo> rptLista = new List<EActivo>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_ObtenerListaActivos", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EActivo()
                                {
                                    IdActivo = Convert.ToInt32(dr["IdActivo"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    IdUnidadEdu = Convert.ToInt32(dr["IdUnidadEdu"]),
                                    RefUnidaEducativa = new EUnidaEducativa
                                    {
                                        Nombre = dr["Nombre"].ToString(),
                                        Responsable = dr["Responsable"].ToString()
                                    },
                                    Comentario = dr["Comentario"].ToString(),
                                    CantidadTotal = Convert.ToInt32(dr["CantidadTotal"]),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = dr["FechaRegistro"].ToString(),
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EActivo>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Activos obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EActivo>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EActivo>> ObtenerActivosFull()
        {
            try
            {
                List<EActivo> rptLista = new List<EActivo>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    // Paso 1: Obtener las categorías
                    using (SqlCommand comando = new SqlCommand("sp_ObtenerListaActivos", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                EActivo activo = new EActivo()
                                {
                                    IdActivo = Convert.ToInt32(dr["IdActivo"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    IdUnidadEdu = Convert.ToInt32(dr["IdUnidadEdu"]),
                                    RefUnidaEducativa = new EUnidaEducativa
                                    {
                                        Nombre = dr["Nombre"].ToString(),
                                        Responsable = dr["Responsable"].ToString()
                                    },
                                    Comentario = dr["Comentario"].ToString(),
                                    CantidadTotal = Convert.ToInt32(dr["CantidadTotal"]),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = dr["FechaRegistro"].ToString(),
                                    ListaDetalleActivos = new List<EDetalleActivo>() // Inicializamos la lista vacía
                                };

                                rptLista.Add(activo);
                            }
                        }
                    }

                    // Paso 2: Obtener los productos para cada categoría
                    foreach (var activo in rptLista)
                    {
                        using (SqlCommand detalleCmd = new SqlCommand("sp_ObtenerDetalleActivo", con))
                        {
                            detalleCmd.CommandType = CommandType.StoredProcedure;
                            detalleCmd.Parameters.AddWithValue("@IdActivo", activo.IdActivo);

                            using (SqlDataReader detalleDr = detalleCmd.ExecuteReader())
                            {
                                while (detalleDr.Read())
                                {
                                    EDetalleActivo detalle = new EDetalleActivo()
                                    {
                                        IdDetalleActivo = Convert.ToInt32(detalleDr["IdDetalleActivo"]),
                                        RefTipoActivo = new ETipoActivo
                                        {
                                            Nombre = detalleDr["Nombre"].ToString()
                                        },
                                        NombreArticulo = detalleDr["NombreArticulo"].ToString(),
                                        Marca = detalleDr["Marca"].ToString(),
                                        NroSerie = detalleDr["NroSerie"].ToString(),
                                        DetalleInfo = detalleDr["DetalleInfo"].ToString(),
                                        RutaQR = detalleDr["RutaQr"].ToString(),
                                        CodAlterno = detalleDr["CodAlterno"].ToString(),
                                        Activo = Convert.ToBoolean(detalleDr["Activo"])
                                    };

                                    activo.ListaDetalleActivos.Add(detalle);
                                }
                            }
                        }
                    }
                }

                // Si llegamos aquí, la operación fue exitosa
                return new Respuesta<List<EActivo>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Activos y detalle obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno en caso de excepción
                return new Respuesta<List<EActivo>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error al obtener los activos: " + ex.Message,
                    Data = null
                };
            }
        }


    }
}
