namespace CapaEntidad
{
    public class EDetalleActivo
    {
        public int IdDetalleActivo { get; set; }
        public int IdActivo { get; set; }
        public int IdTipoAct { get; set; }
        public string NombreArticulo { get; set; }
        public string Marca { get; set; }
        public string NroSerie { get; set; }
        public string DetalleInfo { get; set; }
        public string RutaQR { get; set; }
        public string CodAlterno { get; set; }
        public bool Activo { get; set; }
        public ETipoActivo RefTipoActivo { get; set; }

        public string ImageQr => string.IsNullOrEmpty(RutaQR)
            ? $"/Imagenes/capturaqr.png"
            : RutaQR;
    }
}
