using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DUnidaEducativa
    {
        #region "PATRON SINGLETON"
        private static DUnidaEducativa daoEmpleado = null;
        private DUnidaEducativa() { }
        public static DUnidaEducativa GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new DUnidaEducativa();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarUnidad(EUnidaEducativa oUnidaEducativa)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarUnidadEduca", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", oUnidaEducativa.Nombre);
                        cmd.Parameters.AddWithValue("@Responsable", oUnidaEducativa.Responsable);
                        cmd.Parameters.AddWithValue("@Celular", oUnidaEducativa.Celular);
                        cmd.Parameters.AddWithValue("@Direccion", oUnidaEducativa.Direccion);
                        cmd.Parameters.AddWithValue("@IdArea", oUnidaEducativa.IdArea);

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
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro Nombre"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> ActualizarUnidad(EUnidaEducativa oUnidaEducativa)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ActualizarUnidadEduca", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdUnidadEdu", oUnidaEducativa.IdUnidadEdu);
                        cmd.Parameters.AddWithValue("@Nombre", oUnidaEducativa.Nombre);
                        cmd.Parameters.AddWithValue("@Responsable", oUnidaEducativa.Responsable);
                        cmd.Parameters.AddWithValue("@Celular", oUnidaEducativa.Celular);
                        cmd.Parameters.AddWithValue("@Direccion", oUnidaEducativa.Direccion);
                        cmd.Parameters.AddWithValue("@IdArea", oUnidaEducativa.IdArea);
                        cmd.Parameters.AddWithValue("@Activo", oUnidaEducativa.Activo);

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

        public Respuesta<List<EArea>> ListaAreas()
        {
            try
            {
                List<EArea> rptLista = new List<EArea>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerAreas", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EArea()
                                {
                                    IdArea = Convert.ToInt32(dr["IdArea"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EArea>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Areas obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EArea>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
