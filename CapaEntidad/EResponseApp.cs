using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EResponseApp
    {
        public string FullNombre { get; set; }
        public string Correo { get; set; }
        public string Celular { get; set; }
        public string ImagenUrl { get; set; }
        public bool Activo { get; set; }
        public string Rol { get; set; }

        public string ImageFull => string.IsNullOrEmpty(ImagenUrl)
            ? $"https://i.pinimg.com/564x/9d/6b/9d/9d6b9db2dcb0526a09b89fb35d075c72.jpg"
            : ImagenUrl;
    }
}
