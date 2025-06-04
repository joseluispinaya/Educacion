using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EUsuario
    {
        public int IdUsuario { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Correo { get; set; }
        public string Clave { get; set; }
        public string Celular { get; set; }
        public string ImagenUrl { get; set; }
        public int IdRol { get; set; }
        public ERol Rol { get; set; }
        public string Token { get; set; }
        public bool Activo { get; set; }
        public bool Verificado { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public string FullName => $"{Nombres} {Apellidos}";
        public string ImageFull => string.IsNullOrEmpty(ImagenUrl)
            ? $"/Imagenes/sinfoto.png"
            : ImagenUrl;
    }
}
