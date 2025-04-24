using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;

namespace CapaNegocio
{
    public class NUsuario
    {
        #region "PATRON SINGLETON"
        private static NUsuario daoEmpleado = null;
        private NUsuario() { }
        public static NUsuario GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NUsuario();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<List<EUsuario>> ObtenerUsuarios()
        {
            try
            {
                List<EUsuario> rptLista = new List<EUsuario>()
                {
                    new EUsuario
                    {
                        IdUsuario = 1,
                        Nombres = "Juan",
                        Apellidos = "Perez",
                        Correo = "juan.perez@gmail.com",
                        Clave = "123456",
                        Celular = "789456123",
                        Foto = "/Imagenes/img2.jpeg"
                    },
                    new EUsuario
                    {
                        IdUsuario = 2,
                        Nombres = "Maria",
                        Apellidos = "Lopez",
                        Correo = "maria.lopez@gmail.com",
                        Clave = "abcdef",
                        Celular = "789123456",
                        Foto = "/Imagenes/img1.jpeg"
                    },
                    new EUsuario
                    {
                        IdUsuario = 3,
                        Nombres = "Carlos",
                        Apellidos = "Gomez",
                        Correo = "carlos.gomez@gmail.com",
                        Clave = "qwerty",
                        Celular = "789654123",
                        Foto = ""
                    },
                    new EUsuario
                    {
                        IdUsuario = 4,
                        Nombres = "Amador",
                        Apellidos = "Apaza Luna",
                        Correo = "Amador.gomez@gmail.com",
                        Clave = "qwerdty",
                        Celular = "78965123",
                        Foto = ""
                    }
                };

                return new Respuesta<List<EUsuario>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Usuarios obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
