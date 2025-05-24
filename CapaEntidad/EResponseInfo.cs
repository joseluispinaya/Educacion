namespace CapaEntidad
{
    public class EResponseInfo
    {
        public int IdDetalleActivo { get; set; }
        public string Nombre { get; set; }
        public string Responsable { get; set; }
        public string NombreArticulo { get; set; }
        public string Marca { get; set; }
        public string NroSerie { get; set; }
        public string DetalleInfo { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
        public string ValorActivo => Activo ? "Activo" : "Inactivo";
    }
}
