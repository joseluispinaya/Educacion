using System;
using System.Collections.Generic;

namespace CapaEntidad
{
    public class EActivo
    {
        public int IdActivo { get; set; }
        public string Codigo { get; set; }
        public int ValorCodigo { get; set; }
        public int IdUnidadEdu { get; set; }
        public string Comentario { get; set; }
        public int CantidadTotal { get; set; }
        public bool Estado { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }

        public List<EDetalleActivo> ListaDetalleActivos { get; set; }
    }
}
