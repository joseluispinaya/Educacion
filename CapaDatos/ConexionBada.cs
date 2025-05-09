using System.Data.SqlClient;

namespace CapaDatos
{
    public class ConexionBada
    {
        #region Singleton
        private static readonly ConexionBada instancia = new ConexionBada();
        private ConexionBada() { }

        public static ConexionBada GetInstance()
        {
            return instancia;
        }
        #endregion

        public string CadenaConexion { get; set; } = "Data Source=.;Initial Catalog=EducacionDB;Integrated Security=True";

        public SqlConnection ConexionDB()
        {
            return new SqlConnection(CadenaConexion);
        }
    }
}
