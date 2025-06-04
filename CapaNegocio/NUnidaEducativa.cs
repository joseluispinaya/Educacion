using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NUnidaEducativa
    {
        #region "PATRON SINGLETON"
        private static NUnidaEducativa daoEmpleado = null;
        private NUnidaEducativa() { }
        public static NUnidaEducativa GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NUnidaEducativa();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarUnidad(EUnidaEducativa oUnidaEducativa)
        {
            return DUnidaEducativa.GetInstance().RegistrarUnidad(oUnidaEducativa);
        }

        public Respuesta<bool> ActualizarUnidad(EUnidaEducativa oUnidaEducativa)
        {
            return DUnidaEducativa.GetInstance().ActualizarUnidad(oUnidaEducativa);
        }

        public Respuesta<List<EUnidaEducativa>> ListaUnidadesEducativas()
        {
            return DUnidaEducativa.GetInstance().ListaUnidadesEducativas();
        }

        public Respuesta<List<EArea>> ListaAreas()
        {
            return DUnidaEducativa.GetInstance().ListaAreas();
        }

    }
}
