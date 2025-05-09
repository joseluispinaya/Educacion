using System;

namespace CapaEntidad
{
    public class EUnidaEducativa
    {
        public int IdUnidadEdu { get; set; }
        public string Nombre { get; set; }
        public string Responsable { get; set; }
        public string Celular { get; set; }
        public string Direccion { get; set; }
        public int IdArea { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public EArea RefArea { get; set; }
    }
}
